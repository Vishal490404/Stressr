from dataclasses import dataclass
from typing import Any


@dataclass
class RunStage:
    stdout: str
    stderr: str
    output: str
    code: int
    signal: Any


@dataclass
class CompileStage:
    stdout: str
    stderr: str
    output: str
    code: int
    signal: Any

class Output:
    def __init__(self, json_response: dict):
        self.raw_json = json_response

        self.language = json_response.get("language","unknown")
        self.version = json_response.get("version","unknown")

        self.run_stage = None
        self.compile_stage = None

        runstage = json_response.get("run")
        if runstage:
            self.run_stage = RunStage(
                stdout=runstage.get("stdout",""),
                stderr=runstage.get("stderr",""),
                output=runstage.get("output",""),
                code=runstage.get("code",0),
                signal=runstage.get("signal",None),
            )

        compilestage = json_response.get("compile")
        if compilestage:
            self.compile_stage = CompileStage(
                stdout=compilestage.get("stdout",""),
                stderr=compilestage.get("stderr",""),
                output=compilestage.get("output",""),
                code=compilestage.get("code",0),
                signal=compilestage.get("signal",None),
            )
    def to_dict(self):
        return {
            "language": self.language,
            "version": self.version,
            "run_stage": {
                "stdout": self.run_stage.stdout if self.run_stage else None,
                "stderr": self.run_stage.stderr if self.run_stage else None,
                "output": self.run_stage.output if self.run_stage else None,
                "code": self.run_stage.code if self.run_stage else None,
                "signal": self.run_stage.signal if self.run_stage else None,
            },
            "compile_stage": {
                "stdout": self.compile_stage.stdout if self.compile_stage else None,
                "stderr": self.compile_stage.stderr if self.compile_stage else None,
                "output": self.compile_stage.output if self.compile_stage else None,
                "code": self.compile_stage.code if self.compile_stage else None,
                "signal": self.compile_stage.signal if self.compile_stage else None,
            }
        }

    def __repr__(self):
        return f"{self.langauge} {self.version} {self.run_stage.output}"

    def __str__(self):
        return self.run_stage.output

    @property
    def success(self) -> bool:
        if not self.run_stage:
            return False
        return bool(self.run_stage.stdout)


class Runtime:
    def __init__(self, *, language, aliases, version, runtime):
        self.language = language
        self.aliases = aliases if aliases else []
        self.version = version
        self.runtime = runtime
    
    def __str__(self) -> str:
        return self.runtime or self.language

    def __repr__(self) -> str:
        return f"{self.language}-{self.version}"

    def to_dict(self):
        return {
            "language": self.language,
            "aliases": self.aliases,
            "version": self.version,
            "runtime": self.runtime
        }
