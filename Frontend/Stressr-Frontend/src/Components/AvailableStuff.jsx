export const LANGUAGES = [
    'Python',
    'C',
    'CPP',
    'Java',
    'Typescript',
    'Javascript',
    'Go',
    'Bash'
]


export const languageTemplates = {
    python: 'print("Stressr")',
    c: '#include <stdio.h>\nint main() {\n    return 0;\n}',
    cpp: '#include <iostream>\nint main() {\n    return 0;\n}',
    java: 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    typescript: 'const message: string = "Hello, World!";\nconsole.log(message);',
    javascript: 'const message = "Hello, World!";\nconsole.log(message);',
    go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    bash: 'echo "Hello, World!"',
};
