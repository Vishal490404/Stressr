import asyncio
from Request import *

async def main():
    client = PistonClient()
    language = "python"
    code = "for i in range(1,5):\n print(i)"
    file_to_execute = File(content=code, filename="hello.py" )
    files = [file_to_execute]

    runtimes = await client.runtimes()
    print(runtimes)
    output = await client.execute(
        language, files
    )
    print(output)

    await client.close_session()

if __name__ == "__main__":
    asyncio.run(main())
