from io import TextIOWrapper
from typing import Optional, List, Set
from Exceptions import InvalidLanguage
import Http_Handler
from Models import Output, Runtime
import json

class File:
    def __init__(self, content, filename="") -> None:
        self.filename = filename
        if isinstance(content, TextIOWrapper):
            self.content = content.read()
        else:
            self.content = content

class PistonClient:
    ENDPOINTS = ("runtimes", "execute", "packages")
    BASE_URL = "https://emkc.org/api/v2/piston/"
    
    def __init__(self, api_key: Optional[str] = None,base_url: Optional[str] = None):
        self.base_url = base_url or 'https://emkc.org/api/v2/piston/'
        self._http_session = Http_Handler.HTTP(self.base_url, api_key,)
        self._runtimes: Optional[list[Runtime]] = None

    async def close_session(self) -> None:
        await self._http_session.close()

    async def runtimes(self) -> List[Runtime]:
        runtimes = await self._http_session.get_response("get", "runtimes/")
        runtime_list = []
        for runtime in runtimes:
            runtime_list.append(
                Runtime(
                    language=runtime.get("language"),
                    aliases=runtime.get("aliases"),
                    version=runtime.get("version"),
                    runtime=runtime.get("runtime"),
                ).to_dict()
            )
        self._runtimes = runtime_list
        return runtime_list
    
    async def execute(
            self,
            language: str,
            files: List[File],
            version: Optional[str] = '*',
            stdin: Optional[str] = "",
            args: Optional[list] = [],
            compile_timeout: Optional[int] = 10000,
            run_timeout: Optional[int] = 3000,
            compile_memory_limit: Optional[int] = -1,
            run_memory_limit: Optional[int] = -1,
    ) -> Output:
        payload = {
            "language": language,
            "version": version,
            "stdin": stdin,
            "args": args,
            "compile_timeout": compile_timeout,
            "run_timeout": run_timeout,
            "compile_memory_limit": compile_memory_limit,
            "run_memory_limit": run_memory_limit,
        }

        filesjson = []
        for file in files:
            filesjson.append({"name": file.filename, "content": file.content})

        payload["files"] = filesjson
        # q = json.dumps(payload)
        # print(q)
        output = await self._http_session.get_response(
            "post", "execute/", data=json.dumps(payload)
        )
        # print(output)
        # return Output(output).to_dict()
        return output
    async def get_runtimes(self, language: str) -> List[Runtime]:
        runtimes = self._runtimes or await self.runtimes()
        self._runtimes = runtimes
        p_runtimes = []
        for runtime in runtimes:
            if runtime.language == language or language in runtime.aliases:
                p_runtimes.append(runtime)

        if p_runtimes:
            return p_runtimes

        raise InvalidLanguage(f"Language {language} not found")

    async def languages(self) -> Set[str]:
        runtimes = self._runtimes or await self.runtimes()
        self._runtimes = runtimes
        language_set = set()
        for runtime in runtimes:
            language_set.add(runtime.language)

        return language_set



