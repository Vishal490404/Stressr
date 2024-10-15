from quart import Quart, jsonify, request
from quart_cors import cors
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import Request

load_dotenv()

app = Quart(__name__)
app = cors(app)

def return_Gen(generator_id: int):
    db_url = os.getenv('DB_URL_FOR_GENERATORS')
    cluster = MongoClient(db_url)
    db = cluster['python_generators']
    collection = db['generators']
    generator_document = collection.find_one({"_id" : generator_id})
    if not generator_document:
        return None
    return generator_document
# print(collection.find_one({"_id" : 1}))
@app.route('/runtimes', methods=['GET'])
async def handle_runtimes():
    client = Request.PistonClient()
    result = await client.runtimes()
    return jsonify({"response": result})

@app.route('/execute', methods=['POST'])
async def handle_code_execution():
    data = await request.get_json()
    code = data.get("code")
    language = data.get("language")
    
    if not code:
        return jsonify({"error": "No code provided"}), 400
    client = Request.PistonClient()
    file_to_execute = Request.File(content=code, filename=f"Main")
    output = await client.execute(language, [file_to_execute])
    return jsonify({"response": output})

@app.route('/find', methods=['POST'])
async def handle_multiple_code_executions():
    data = await request.get_json()
    test_generation_option = data.get("test_generation_option")
    code1_payload = data.get("code1_payload")
    code2_payload = data.get("code2_payload")
    code1 = code1_payload.get("code")
    code2 = code2_payload.get("code")
    language1 = code1_payload.get("language")
    language2 = code2_payload.get("language")
    generator_id = test_generation_option.get("generator_id")
    generator_params = test_generation_option.get("params")

    generator_document = return_Gen(generator_id)
    # print(generator_document)
    if not generator_document:
        return jsonify({"error" : "No generator found!"})
    generator_code = generator_document["gen"]
    generator_lang = 'python'

    client = Request.PistonClient()
    for _ in range(10):
        file_generator = Request.File(content=generator_code, filename="Main")
        generator_output = await client.execute(generator_lang, [file_generator], stdin=generator_params)

        if generator_output.get("run", {}).get("stdout") is None:
            return jsonify({"error": "Test generator execution failed"}), 500
        
        generated_test_cases = generator_output["run"]["stdout"]
        differences = []

        for code, language,code_number in [(code1, language1,"code1"), (code2, language2,"code2")]:
            file_to_execute = Request.File(content=code, filename=f"Main")
            code_output = await client.execute(language, [file_to_execute], stdin=generated_test_cases)
            
            if code_output.get("run", {}).get("stdout") is None:
                return jsonify({"error": f"Execution failed for {code_number}"}), 500
            
            if code_number == "code1":
                output1 = code_output["run"]["stdout"]
            else:
                output2 = code_output["run"]["stdout"]

        if output1 != output2:
            differences.append({
                "test_case": generated_test_cases,
                "output_code1": output1,
                "output_code2": output2
            })

    return jsonify({"differences": differences})

if __name__ == '__main__':
    app.run(port=9563)
