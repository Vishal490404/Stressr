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
    c: '#include <stdio.h>\nint main() {\n    printf("Stressr");\n    return 0;\n}',
    cpp: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Stressr" << endl;\n    return 0;\n}',
    java: 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Stressr");\n    }\n}',
    typescript: 'const message: string = "Stressr";\nconsole.log(message);',
    javascript: 'const message = "Stressr";\nconsole.log(message);',
    go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Stressr")\n}',
    bash: 'echo "Stressr"',
};
