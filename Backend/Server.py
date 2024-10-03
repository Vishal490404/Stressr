from quart import Quart, jsonify, request
from quart_cors import cors
import Request

app = Quart(__name__)
app = cors(app)

@app.route('/runtimes', methods=['GET'])
async def handle_runtimes():
    client = Request.PistonClient()
    result = await client.runtimes()
    return jsonify({"response": result})

@app.route('/execute', methods=['POST'])
async def handle_code_execution():
    data = await request.get_json()  
    code = data.get("code")
    print(data)
    if not code:
        return jsonify({"error": "No code provided"}), 400
    
    client = Request.PistonClient()
    language = "cpp" 
    file_to_execute = Request.File(content=code, filename="hello.py")
    files = [file_to_execute]
    output = await client.execute(
        language, files
    )
    
    return jsonify({"response": output})


if __name__ == '__main__':
    app.run(port=9563)
