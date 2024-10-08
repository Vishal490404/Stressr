import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
db_url = os.getenv('DB_URL_FOR_GENERATORS')

cluster = MongoClient(db_url)

# print(cluster)

db = cluster['python_generators']
# print(db)
collection = db['generators']

documents = collection.find_one({"_id" : selection})
print(documents["gen"])

