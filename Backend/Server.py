from quart import Quart, jsonify, request
from quart_cors import cors
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import Request
import google.generativeai as genai
import json
load_dotenv()

app = Quart(__name__)
app = cors(app)

# Configure the Gemini AI
genai.configure(api_key=os.getenv('GOOGLE_AI_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

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

@app.route('/ai-generate', methods=['POST'])
async def handle_ai_generation():
    data = await request.get_json()
    prompt = data.get("prompt")
    
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        # Construct a more specific prompt for generating test case generators
        full_prompt = f"""
        Create a Python function that generates test cases based on the following description:
        {prompt}
        
        The function should:
        1. Be named 'generate_test_cases'
        2. Take appropriate parameters for customization (e.g., number of test cases, range of values)
        
        3. Use Python's random module for generating random values
        4. Include comments explaining the logic
        5. Include a sample test case in the function in comments
        6. If no test cases are required then the code should return generate a single test case
        Provide only the Python code without any additional explanation.
        """

        response = model.generate_content(full_prompt)
        generated_code = response.text

        # Basic validation to ensure we got a Python function
        if "def generate_test_cases" not in generated_code:
            return jsonify({"error": "Failed to generate valid test case function"}), 500

        # Store the generated code in MongoDB
        db_url = os.getenv('DB_URL_FOR_GENERATORS')
        cluster = MongoClient(db_url)
        db = cluster['python_generators']
        collection = db['generators']

        # Get the next available ID
        last_document = collection.find_one(sort=[("_id", -1)])
        new_id = 1 if last_document is None else last_document["_id"] + 1

        # Insert the new generator
        generator_document = {
            "_id": new_id,
            "gen": generated_code,
            "description": prompt
        }
        collection.insert_one(generator_document)

        return jsonify({
            "response": "Test case generator created successfully",
            "generator_id": new_id,
            "generator_code": generated_code
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=9563)
