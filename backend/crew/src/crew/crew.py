from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.knowledge.source.pdf_knowledge_source import PDFKnowledgeSource
from crewai.memory import LongTermMemory
from crewai.memory.storage.ltm_sqlite_storage import LTMSQLiteStorage
from UploadFilesKnowledgeSource.UploadFilesKnowledgeSource import UploadFilesKnowledgeSource
from crewai.knowledge.source.pdf_knowledge_source import PDFKnowledgeSource
from crewai_tools import RagTool

from dotenv import load_dotenv
import os


load_dotenv()

pdf_paths = [os.path.join("/Users/yaraslausedach/Code/crewai_data_chat/backend/knowledge",f ) for f in os.listdir("/Users/yaraslausedach/Code/crewai_data_chat/backend/knowledge")]
rag_tool = RagTool()
for path in pdf_paths:
	rag_tool.add(source=path)

@CrewBase
class Testcrew():
	"""Testcrew crew"""

	agents_config = 'config/agents.yaml'
	tasks_config = 'config/tasks.yaml'
	

	@agent
	def data_extractor(self) -> Agent:
		return Agent(
			config=self.agents_config['data_extractor'],
			max_iter = 5,
			# knowledge_sources = [self.pdf_knowledge]
			tools=[rag_tool]

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
			max_iter= 5,
		)

	@task
	def reporting_task(self) -> Task:
		return Task(
			config=self.tasks_config['summarize_data'],
			max_iter=5,
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
			# knowledge_sources = [self.pdf_knowledge],
			long_term_memory = LongTermMemory(
				storage=LTMSQLiteStorage(
						db_path="./db/long_term_memory_storage.db"
					)
			),


		)

result = Testcrew().crew().kickoff(inputs={'input':'Summarize'})
