from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.knowledge.source.pdf_knowledge_source import PDFKnowledgeSource
from crewai.memory import LongTermMemory
from crewai.memory.storage.ltm_sqlite_storage import LTMSQLiteStorage
from UploadFilesKnowledgeSource.UploadFilesKnowledgeSource import UploadFilesKnowledgeSource
from crewai_tools import PDFSearchTool
from dotenv import load_dotenv

load_dotenv()

@CrewBase
class Testcrew():
	"""Testcrew crew"""

	pdf_source = UploadFilesKnowledgeSource()
	agents_config = 'config/agents.yaml'
	tasks_config = 'config/tasks.yaml'

	@agent
	def data_extractor(self) -> Agent:
		return Agent(
			config=self.agents_config['data_extractor'],
			max_iter = 5,
			knowledge_sources = [self.pdf_source]
		)

	@agent
	def data_summarizer(self) -> Agent:
		return Agent(
			config=self.agents_config['data_summarizer'],
		)
	
	@task
	def research_task(self) -> Task:
		return Task(
			config=self.tasks_config['retrieve_data'],
		)

	@task
	def reporting_task(self) -> Task:
		return Task(
			config=self.tasks_config['summarize_data'],
		)
	
	@crew
	def crew(self) -> Crew:
		"""Creates the Testcrew crew"""

		return Crew(
			agents=self.agents,
			tasks=self.tasks,
			process=Process.sequential,
			verbose=True,
			memory=False,
			knowledge_sources = [self.pdf_source],
			# long_term_memory = LongTermMemory(
			# 	storage=LTMSQLiteStorage(
			# 			db_path="./db/long_term_memory_storage.db"
			# 		)
			# ),


		)


result = Testcrew().crew().kickoff(inputs={'input':'What is RAW?'})

print(result)