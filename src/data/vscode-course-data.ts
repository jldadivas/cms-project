export type VSCodeLevel =
  'Beginner' | 'Beginner–Intermediate' | 'Intermediate' | 'Intermediate–Advanced' | 'Advanced'

export interface VSCodeExample {
  title: string
  filename: string
  language: string
  code: string
  explanation: string
  expectedOutput: string
}

export interface VSCodeQuizOption {
  label: string
  correct: boolean
  feedback: string
}

export interface VSCodeQuizQuestion {
  type: 'Multiple choice' | 'True or false' | 'Code reading'
  question: string
  options: VSCodeQuizOption[]
}

export interface VSCodeLesson {
  slug: string
  title: string
  level: VSCodeLevel
  minutes: number
  summary: string
  objectives: string[]
  prerequisites: string[]
  sections: { title: string; body: string; bullets?: string[] }[]
  steps: { title: string; detail: string }[]
  examples: VSCodeExample[]
  diagram: { title: string; nodes: string[] }
  activity: string
  quiz: VSCodeQuizQuestion[]
  docs: { label: string; href: string }[]
}

const docs = {
  website: { label: 'VS Code website', href: 'https://code.visualstudio.com/' },
  documentation: { label: 'VS Code documentation', href: 'https://code.visualstudio.com/docs' },
  marketplace: {
    label: 'VS Code Marketplace',
    href: 'https://marketplace.visualstudio.com/vscode',
  },
  python: { label: 'Python documentation', href: 'https://docs.python.org/3/' },
  flutter: { label: 'Flutter documentation', href: 'https://docs.flutter.dev/' },
  dart: { label: 'Dart documentation', href: 'https://dart.dev/' },
  git: { label: 'Git documentation', href: 'https://git-scm.com/doc' },
  platformio: { label: 'PlatformIO documentation', href: 'https://docs.platformio.org/' },
  raspberryPi: {
    label: 'Raspberry Pi documentation',
    href: 'https://www.raspberrypi.com/documentation/',
  },
  javascript: {
    label: 'MDN web documentation',
    href: 'https://developer.mozilla.org/',
  },
  remoteSsh: {
    label: 'Remote - SSH documentation',
    href: 'https://code.visualstudio.com/docs/remote/ssh',
  },
  debugging: {
    label: 'VS Code debugging',
    href: 'https://code.visualstudio.com/docs/editor/debugging',
  },
}

const question = (
  type: VSCodeQuizQuestion['type'],
  prompt: string,
  correct: string,
  distractors: string[],
  feedback: string,
): VSCodeQuizQuestion => ({
  type,
  question: prompt,
  options: [correct, ...distractors].map((label, index) => ({
    label,
    correct: index === 0,
    feedback: index === 0 ? feedback : `Not quite. ${feedback}`,
  })),
})

export const vscodeLessons: VSCodeLesson[] = [
  {
    slug: 'vscode-introduction',
    title: 'Introduction to Visual Studio Code',
    level: 'Beginner',
    minutes: 25,
    summary:
      'Learn what VS Code does, how extensions add language support, and how it differs from Visual Studio and Android Studio.',
    objectives: [
      'Explain VS Code as a lightweight, extensible source-code editor.',
      'Distinguish VS Code, Visual Studio, and Android Studio.',
      'Identify when extensions and external SDKs are needed.',
    ],
    prerequisites: ['A computer and browser', 'No programming experience required'],
    sections: [
      {
        title: 'What is VS Code?',
        body: 'Visual Studio Code (VS Code) is a lightweight, extensible source-code editor from Microsoft. It runs on Windows, macOS, and Linux. It includes editing, search, source control, an integrated terminal, and a debugger interface. Language services, build tools, runtimes, and device toolchains are supplied by built-in features, extensions, or separately installed SDKs.',
        bullets: [
          'It supports many languages through syntax support, language servers, debuggers, and extensions.',
          'It edits a folder/workspace; your language runtime or SDK still executes and builds the project.',
          'Extensions add capabilities, but installing an extension does not necessarily install the corresponding runtime or compiler.',
        ],
      },
      {
        title: 'VS Code versus Visual Studio and Android Studio',
        body: 'Visual Studio is a larger integrated development environment with deep Microsoft-platform tooling, such as .NET, C++, and Windows workloads. VS Code is a general editor that you assemble with extensions and external tools. Android Studio is Google’s official Android IDE and bundles Android-specific project, SDK, emulator, Compose, Gradle, and profiling workflows. VS Code can edit Android, Flutter, or web projects, but may rely on Android Studio for the Android SDK and emulator.',
      },
      {
        title: 'Strengths, trade-offs, and common uses',
        body: 'VS Code starts quickly, supports a broad ecosystem, and works well for web, Python, Flutter, backend, and remote IoT development. The trade-off is that teams must select and maintain extensions, runtimes, formatters, and SDKs. For large native Android or Visual Studio workloads, the domain-specific IDE can provide more integrated tooling.',
      },
    ],
    steps: [
      {
        title: 'Separate editor from toolchain',
        detail:
          'For a Python project, identify the editor, Python interpreter, packages, and test runner as separate pieces.',
      },
      {
        title: 'Explore language support',
        detail:
          'Open a small source file and inspect syntax coloring, completion, diagnostics, and run/debug actions.',
      },
      {
        title: 'Choose a development environment',
        detail:
          'Compare VS Code with Visual Studio or Android Studio for a project and list the missing SDKs/extensions you would need.',
      },
    ],
    examples: [
      {
        title: 'Editor, extension, and runtime',
        filename: 'How the pieces fit together',
        language: 'text',
        code: 'VS Code editor\n   ├─ Python extension + Pylance → editing and language intelligence\n   ├─ Python interpreter → executes .py files\n   ├─ pip / virtual environment → installs project packages\n   └─ debugger → launches and inspects a Python process',
        explanation:
          'The editor is not the Python interpreter. Extensions connect editor features to language tools, while the runtime and project dependencies must also be installed.',
        expectedOutput:
          'You can identify which component provides editing, execution, dependencies, and debugging.',
      },
    ],
    diagram: {
      title: 'VS Code development stack',
      nodes: [
        'VS Code editor',
        'Language/tool extensions',
        'Runtime and SDK',
        'Build, debug, and run project',
      ],
    },
    activity:
      'Choose one web, Python, or mobile project and draw the editor, extension, runtime, SDK, and device/server roles.',
    quiz: [
      question(
        'Multiple choice',
        'What is VS Code primarily?',
        'A lightweight, extensible source-code editor',
        ['A programming language', 'An Android emulator'],
        'VS Code edits code and integrates with language tools; it does not replace every runtime or SDK.',
      ),
      question(
        'True or false',
        'Installing a VS Code extension always installs its language runtime too.',
        'False',
        ['True', 'Only on Windows'],
        'Many extensions require a separately installed SDK, runtime, or compiler.',
      ),
      question(
        'Code reading',
        'Which tool is the official IDE for native Android development?',
        'Android Studio',
        ['VS Code', 'GitHub'],
        'VS Code can edit Android files, but Android Studio is the official Android IDE.',
      ),
    ],
    docs: [docs.website, docs.documentation, docs.marketplace],
  },
  {
    slug: 'vscode-installation',
    title: 'Installation and Environment Setup',
    level: 'Beginner',
    minutes: 40,
    summary:
      'Install VS Code on Windows, Linux, or macOS, open a project, and verify runtimes and PATH.',
    objectives: [
      'Install VS Code using a current official distribution method.',
      'Open a folder as a workspace and launch the integrated terminal.',
      'Distinguish editor installation from language runtime and SDK installation.',
    ],
    prerequisites: ['A supported Windows, Linux, or macOS computer', 'Internet access'],
    sections: [
      {
        title: 'Install the editor',
        body: 'Download the stable installer/package from code.visualstudio.com. On Windows, use the user or system installer and optionally enable Explorer “Open with Code” and PATH integration. On macOS, move Visual Studio Code to Applications and install the shell command from the Command Palette if needed. On Ubuntu, install the official Microsoft package/repository or the documented Snap package. Package names and requirements can change; consult the official download page.',
        bullets: [
          'Windows: winget install --id Microsoft.VisualStudioCode --exact is an optional Windows Package Manager route.',
          'macOS with Homebrew: brew install --cask visual-studio-code, then use Shell Command: Install code command in PATH if needed.',
          'Ubuntu with Snap: sudo snap install code --classic. For apt, follow Microsoft’s official repository instructions rather than copying a stale key/repository command.',
        ],
      },
      {
        title: 'Open a folder and use PATH',
        body: 'Choose File → Open Folder and select the project root, not just an individual source file. In a terminal, code . opens the current folder when the code command is on PATH. If a shell cannot find code after installation, restart the terminal or enable the installer’s PATH option. On remote machines, install and launch the appropriate VS Code server using the documented Remote Development extension workflow.',
      },
      {
        title: 'Install runtimes and verify requirements',
        body: 'Install project-specific runtimes separately: Node.js for npm projects, Python for Python projects, Flutter SDK for Flutter, JDK/Android SDK for Android tooling, and PlatformIO toolchains for embedded projects. VS Code’s system requirements and supported CPU/OS versions can change; check the official requirements before installing on older hardware.',
      },
      {
        title: 'Troubleshoot setup',
        body: 'If code is not recognized, check PATH and reopen the terminal. If a language command is missing, verify that runtime’s installation and PATH separately. If an extension cannot locate an SDK, inspect its settings and run the SDK’s own doctor/version command. Avoid changing global PATH or environment variables without recording the original values.',
      },
    ],
    steps: [
      {
        title: 'Download VS Code',
        detail:
          'Use the official download page or a trusted OS package manager and choose the stable build for your operating system.',
      },
      {
        title: 'Open a project folder',
        detail:
          'Create a practice folder, open it in VS Code, and trust only folders whose source you understand.',
      },
      {
        title: 'Verify the shell command',
        detail:
          'Open a new PowerShell, Bash, or zsh terminal and run code --version; use code . to open the current directory.',
      },
      {
        title: 'Install one runtime',
        detail:
          'Install Node.js or Python separately and check node --version/npm --version or python --version/pip --version.',
      },
    ],
    examples: [
      {
        title: 'Install and verify on Windows',
        filename: 'PowerShell',
        language: 'powershell',
        code: 'winget install --id Microsoft.VisualStudioCode --exact\ncode --version\nmkdir vscode-practice\ncd vscode-practice\ncode .',
        explanation:
          'Windows Package Manager is optional; the official installer is also available. Open a new terminal after installation so PATH changes are loaded.',
        expectedOutput:
          'VS Code prints its version and opens the vscode-practice folder as a workspace.',
      },
      {
        title: 'Verify common runtimes',
        filename: 'PowerShell / Bash',
        language: 'bash',
        code: 'node --version\nnpm --version\npython --version\npython -m pip --version\ngit --version',
        explanation:
          'Commands are checks, not installers. On some Windows systems use py --version if python is not registered; on macOS/Linux use python3 and python3 -m pip.',
        expectedOutput:
          'Installed tools print version numbers. A “command not found” or “not recognized” message points to a missing runtime or PATH entry.',
      },
    ],
    diagram: {
      title: 'Prepare a project workstation',
      nodes: [
        'Install VS Code',
        'Install project runtime/SDK',
        'Open trusted project folder',
        'Verify commands and extensions',
      ],
    },
    activity:
      'Install VS Code on your OS, open a folder, check the code command and one runtime version, and write down any PATH issue you resolve.',
    quiz: [
      question(
        'Multiple choice',
        'What does code . do when the command is on PATH?',
        'Opens the current folder in VS Code',
        ['Installs Python', 'Creates a GitHub account'],
        'The dot refers to the current directory, which VS Code opens as a workspace.',
      ),
      question(
        'True or false',
        'VS Code installation automatically includes Node.js, Python, Flutter, and Android SDK.',
        'False',
        ['True', 'Only on macOS'],
        'Install language runtimes and SDKs separately unless a specific distribution says otherwise.',
      ),
      question(
        'Code reading',
        'What should you try first if a newly installed code command is not recognized?',
        'Open a new terminal and verify PATH/installer integration',
        ['Delete the project', 'Disable the firewall'],
        'New PATH entries are read by newly opened shells; check the install option and PATH.',
      ),
    ],
    docs: [docs.website, docs.documentation, docs.python, docs.flutter],
  },
  {
    slug: 'vscode-interface',
    title: 'Understanding the VS Code Interface',
    level: 'Beginner',
    minutes: 35,
    summary:
      'Use Explorer, Search, Source Control, Run and Debug, Extensions, the Command Palette, and workspaces.',
    objectives: [
      'Locate the main views and status information in VS Code.',
      'Use Command Palette and keyboard shortcuts to find commands.',
      'Open multi-root workspaces and the integrated terminal.',
    ],
    prerequisites: ['VS Code installed', 'A folder to open as a workspace'],
    sections: [
      {
        title: 'Activity Bar, sidebar, and editor',
        body: 'The Activity Bar switches the side bar among Explorer, Search, Source Control, Run and Debug, and Extensions. Explorer shows files and folders. The editor area hosts tabs and split editors. The Status Bar reports contextual state such as branch, diagnostics, language mode, encoding, and line/column.',
      },
      {
        title: 'Command Palette and terminal',
        body: 'Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (macOS) opens the Command Palette. Use it to find commands and settings without remembering every menu. The integrated terminal runs your chosen shell—PowerShell, Command Prompt, Bash, zsh, or another installed shell—inside the workspace.',
      },
      {
        title: 'Settings, shortcuts, and multi-root workspaces',
        body: 'User settings apply across projects; workspace settings apply to the current project and can be shared carefully. Keyboard shortcuts can be searched and customized. A multi-root .code-workspace file groups related folders such as firmware, API, and mobile client while keeping each project’s files distinct.',
      },
    ],
    steps: [
      {
        title: 'Inspect the views',
        detail:
          'Open Explorer, Search, Source Control, Run and Debug, and Extensions from the Activity Bar.',
      },
      {
        title: 'Use a command',
        detail: 'Open Command Palette and search for “Toggle Terminal” and “Format Document”.',
      },
      {
        title: 'Split the editor',
        detail:
          'Open two source files, split the editor, and use the Status Bar to change language mode or inspect diagnostics.',
      },
      {
        title: 'Create a workspace',
        detail:
          'Use Save Workspace As to create a multi-root workspace for a firmware and backend folder.',
      },
    ],
    examples: [
      {
        title: 'Example multi-root workspace',
        filename: 'sensor-platform.code-workspace',
        language: 'json',
        code: '{\n  "folders": [\n    { "name": "firmware", "path": "../esp32-firmware" },\n    { "name": "backend", "path": "../pi-backend" },\n    { "name": "mobile", "path": "../mobile-app" }\n  ],\n  "settings": {\n    "files.exclude": { "**/__pycache__": true }\n  }\n}',
        explanation:
          'A workspace file groups folders and workspace-specific settings. Keep paths portable where possible and never put credentials or private machine paths in a shared workspace file.',
        expectedOutput: 'Explorer shows three project roots in one VS Code window.',
      },
    ],
    diagram: {
      title: 'Find the right VS Code view',
      nodes: [
        'Activity Bar selects a view',
        'Sidebar explores or searches',
        'Editor changes source',
        'Status Bar and terminal show context',
      ],
    },
    activity:
      'Use the Command Palette to open the terminal, search for a symbol, stage one practice file, and create a two-folder workspace.',
    quiz: [
      question(
        'Multiple choice',
        'Which shortcut opens the Command Palette on Windows/Linux?',
        'Ctrl+Shift+P',
        ['Ctrl+Alt+Delete', 'Alt+F4'],
        'The Command Palette searches and runs VS Code commands.',
      ),
      question(
        'True or false',
        'The integrated terminal is always PowerShell on every operating system.',
        'False',
        ['True', 'Only in workspaces'],
        'The integrated terminal can run the configured shell for the OS, such as Bash or zsh.',
      ),
      question(
        'Code reading',
        'What does a .code-workspace file commonly define?',
        'Workspace folders and workspace settings',
        ['A Python interpreter', 'An APK signing key'],
        'A workspace file groups roots and can store workspace-scoped editor settings.',
      ),
    ],
    docs: [docs.documentation, docs.debugging],
  },
  {
    slug: 'vscode-extensions',
    title: 'Extensions and Marketplace',
    level: 'Beginner–Intermediate',
    minutes: 45,
    summary:
      'Install, configure, update, and manage trusted extensions for Python, Flutter, web, Git, Docker, and embedded work.',
    objectives: [
      'Install, update, disable, and remove an extension.',
      'Choose extensions based on publisher, scope, and project need.',
      'Create workspace recommendations and manage extension conflicts.',
    ],
    prerequisites: ['VS Code installed', 'Internet access to the VS Code Marketplace'],
    sections: [
      {
        title: 'What extensions do',
        body: 'Extensions add language servers, debuggers, themes, formatters, snippets, remote development, and integrations. Open Extensions from the Activity Bar, search the Marketplace, inspect publisher and details, then install. Review permissions and publisher trust before adding code that can run in your workspace.',
      },
      {
        title: 'Useful development extensions',
        body: 'Python and Pylance provide Python editing/intelligence; Dart and Flutter support Dart/Flutter workflows; ESLint and Prettier diagnose/lint and format JavaScript/TypeScript; Live Server serves static web pages for development. GitLens adds Git history views; Docker manages container workflows; REST Client sends saved HTTP requests; C/C++ provides language/debug support; PlatformIO IDE manages embedded projects; Remote - SSH opens remote folders over SSH.',
        bullets: [
          'Install only extensions needed by the current project; overlapping formatters or language servers can conflict.',
          'An extension does not necessarily include its SDK, compiler, emulator, or runtime.',
          'Use .vscode/extensions.json for recommended extensions, not automatic installation or guarantees.',
        ],
      },
      {
        title: 'Manage settings and recommendations',
        body: 'Use the Extensions view to update, disable globally or for a workspace, or uninstall. Extension settings are discoverable in Settings or settings.json. Workspace recommendations help teammates install a suggested tool set. Keep extensions updated, review release notes and publisher information, and use Restricted Mode for untrusted folders.',
      },
    ],
    steps: [
      {
        title: 'Search and evaluate',
        detail:
          'Find a required extension and inspect its publisher, supported version, documentation, and permissions before installing.',
      },
      {
        title: 'Install one language tool',
        detail:
          'Install the official Python or Dart extension and configure it to use an already installed interpreter/SDK.',
      },
      {
        title: 'Manage the extension',
        detail:
          'Update it, disable it for the workspace, re-enable it, and inspect its Settings page.',
      },
      {
        title: 'Recommend workspace tools',
        detail:
          'Create .vscode/extensions.json with only the extensions the project actually needs.',
      },
    ],
    examples: [
      {
        title: 'Workspace extension recommendations',
        filename: '.vscode/extensions.json',
        language: 'json',
        code: '{\n  "recommendations": [\n    "ms-python.python",\n    "ms-python.vscode-pylance",\n    "esbenp.prettier-vscode"\n  ]\n}',
        explanation:
          'Recommendations help collaborators find useful tools. They are not a security guarantee or a substitute for documenting the project runtime and formatter commands.',
        expectedOutput:
          'VS Code offers the listed extensions to workspace collaborators who have not installed them.',
      },
    ],
    diagram: {
      title: 'Extension workflow',
      nodes: [
        'Identify project need',
        'Review Marketplace publisher/details',
        'Install and configure',
        'Test and share recommendations',
      ],
    },
    activity:
      'Add Python and Pylance to a Python workspace, verify the selected interpreter, then disable Pylance for that workspace and restore it.',
    quiz: [
      question(
        'Multiple choice',
        'What should you check before installing an extension?',
        'Publisher, purpose, documentation, and trust',
        ['Only its icon color', 'Whether it replaces Git'],
        'Extensions run code and may access project files; review trust and relevance.',
      ),
      question(
        'True or false',
        'A workspace extension recommendation guarantees that the extension is safe.',
        'False',
        ['True', 'Only for Python'],
        'Recommendations are convenience metadata, not a safety certification.',
      ),
      question(
        'Code reading',
        'What does .vscode/extensions.json contain?',
        'Workspace extension recommendations',
        ['Production passwords', 'Android SDK platforms'],
        'The file suggests extensions to collaborators; it should not contain secrets.',
      ),
    ],
    docs: [docs.marketplace, docs.documentation, docs.python, docs.flutter, docs.platformio],
  },
  {
    slug: 'vscode-terminal',
    title: 'Terminal and Command Line',
    level: 'Beginner',
    minutes: 45,
    summary:
      'Use the integrated shell to navigate files, install dependencies, run servers and scripts, and interpret errors.',
    objectives: [
      'Navigate a project using PowerShell or Bash commands.',
      'Run npm, pip, Python scripts, and development servers.',
      'Recognize command-not-found, path, and dependency errors.',
    ],
    prerequisites: ['VS Code installed', 'A runtime for the commands you plan to use'],
    sections: [
      {
        title: 'Terminal and shell basics',
        body: 'A terminal hosts a shell that interprets commands. VS Code can open PowerShell, Command Prompt, Bash, zsh, or another installed shell. Commands and path separators differ: PowerShell accepts Windows paths; Bash commonly uses forward slashes. Use pwd/Get-Location, cd/Set-Location, and ls/Get-ChildItem to inspect your current folder.',
      },
      {
        title: 'Dependencies and scripts',
        body: 'npm installs JavaScript packages and runs project scripts. pip installs Python packages into the selected environment; use a virtual environment to isolate them. Run scripts from the correct project directory and read the first meaningful error rather than repeatedly rerunning commands without addressing it.',
      },
      {
        title: 'Safe command habits',
        body: 'Verify your current directory before running commands that modify files. Read install scripts and shell commands before executing them. Do not paste credentials into terminal history or commit generated secrets. Stop a foreground development server with Ctrl+C in its terminal.',
      },
    ],
    steps: [
      {
        title: 'Open a terminal',
        detail:
          'Use Terminal → New Terminal or Ctrl+` and confirm the working directory is the project root.',
      },
      {
        title: 'Navigate and inspect',
        detail:
          'Use Get-Location/Get-ChildItem in PowerShell or pwd/ls in Bash, then move into a practice directory.',
      },
      {
        title: 'Create a Python environment',
        detail:
          'Run python -m venv .venv, activate it using the command for your shell, and install a package with python -m pip.',
      },
      {
        title: 'Run a web project',
        detail:
          'Run npm install only when the project manifest/lockfile exists, then use the documented npm run dev command.',
      },
    ],
    examples: [
      {
        title: 'Python virtual environment on Windows PowerShell',
        filename: 'Integrated PowerShell terminal',
        language: 'powershell',
        code: 'py -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install --upgrade pip\npython -m pip install fastapi uvicorn\npython app.py',
        explanation:
          'If PowerShell blocks activation, follow Microsoft’s execution policy guidance for your account or use the venv interpreter directly; do not lower machine-wide security settings blindly. For an ASGI app, run the project’s documented uvicorn command instead of python app.py when appropriate.',
        expectedOutput:
          'The prompt shows the active environment and packages install into .venv rather than the system Python.',
      },
      {
        title: 'Run a Node development server',
        filename: 'Integrated terminal',
        language: 'bash',
        code: 'node --version\nnpm --version\nnpm install\nnpm run dev',
        explanation:
          'Run these commands from the directory containing package.json. Follow the project’s package manager and lockfile (npm, pnpm, or yarn); do not mix package managers for one project.',
        expectedOutput:
          'The framework prints a local development URL and remains running until you stop it with Ctrl+C.',
      },
    ],
    diagram: {
      title: 'Command-line project loop',
      nodes: [
        'Open project terminal',
        'Activate runtime/environment',
        'Install declared dependencies',
        'Run and inspect output',
      ],
    },
    activity:
      'Create a virtual environment, install one package, run a Python script, intentionally trigger a missing-module error, and explain how you fixed it.',
    quiz: [
      question(
        'Multiple choice',
        'Where should npm install normally be run?',
        'The project folder containing package.json',
        ['A random home directory', 'Inside Logcat'],
        'npm uses the project manifest and lockfile to install declared dependencies.',
      ),
      question(
        'True or false',
        'A Python virtual environment helps isolate project dependencies.',
        'True',
        ['False', 'Only on Linux'],
        'A virtual environment separates a project’s Python packages from other environments.',
      ),
      question(
        'Code reading',
        'How do you stop a foreground dev server in the terminal?',
        'Press Ctrl+C in the terminal running it',
        ['Close the project file', 'Run pip uninstall'],
        'Ctrl+C sends an interrupt to the foreground process in typical shells.',
      ),
    ],
    docs: [docs.documentation, docs.python, docs.website],
  },
  {
    slug: 'vscode-web-development',
    title: 'Web Development Using VS Code',
    level: 'Beginner–Intermediate',
    minutes: 65,
    summary:
      'Build HTML, CSS, JavaScript, and TypeScript projects and run static, React, Next.js, and API-connected apps.',
    objectives: [
      'Structure a semantic HTML page and responsive CSS.',
      'Write JavaScript/TypeScript and use a project development server.',
      'Understand Live Server versus framework-specific React and Next.js workflows.',
    ],
    prerequisites: ['VS Code and Node.js for npm/React examples', 'Basic computer file navigation'],
    sections: [
      {
        title: 'HTML, CSS, and JavaScript',
        body: 'HTML describes semantic content, CSS styles responsive layouts, and JavaScript adds behavior. Use Live Server for a simple static page preview; it is not the production server for React or Next.js applications. For a framework, use its package.json scripts and follow its current documentation.',
      },
      {
        title: 'TypeScript and framework projects',
        body: 'TypeScript adds static checks to JavaScript and is compiled by the project toolchain. React components combine UI and state; Next.js adds file-based routing and server/client rendering conventions. Use project-provided linting, formatting, and build commands rather than assuming every framework works the same way.',
      },
      {
        title: 'Responsive UI and API integration',
        body: 'Use flexible CSS, semantic controls, keyboard support, and a mobile viewport for testing. Fetch API data through a small service, validate status and response data, and represent loading, empty, and error states separately. Browser requests may be restricted by CORS; configure the backend rather than disabling browser security.',
      },
    ],
    steps: [
      {
        title: 'Create a static page',
        detail:
          'Add index.html, styles.css, and app.js; link assets with relative paths inside the workspace.',
      },
      {
        title: 'Preview correctly',
        detail:
          'Use Live Server for static HTML or the framework’s npm run dev script for React/Next.js.',
      },
      {
        title: 'Add typed code',
        detail:
          'Initialize or open a TypeScript project, inspect tsconfig, and rely on the project compiler and linter.',
      },
      {
        title: 'Connect an API',
        detail:
          'Call a development API, validate the response, and display loading, success, empty, and error states.',
      },
    ],
    examples: [
      {
        title: 'Semantic HTML and responsive CSS',
        filename: 'index.html and styles.css',
        language: 'html',
        code: '<main class="dashboard">\n  <h1>Sensor dashboard</h1>\n  <article aria-labelledby="light-title">\n    <h2 id="light-title">Light</h2>\n    <p><strong id="lux">245</strong> lux</p>\n  </article>\n</main>\n\n<style>\n.dashboard { max-width: 48rem; margin: auto; padding: 1rem; }\narticle { border-radius: 1rem; padding: 1rem; }\n@media (max-width: 30rem) { .dashboard { padding: .75rem; } }\n</style>',
        explanation:
          'Use a real .css file in a normal site; the inline style is included here to make the responsive rule visible in one example. Semantic headings and article labels make the page easier to navigate.',
        expectedOutput:
          'A labeled sensor card fits narrow screens and remains readable without fixed page width.',
      },
      {
        title: 'Fetch typed API data with error state',
        filename: 'src/services/readings.ts',
        language: 'typescript',
        code: 'type Reading = { light_lux: number | null }\n\nexport async function fetchCurrent(): Promise<Reading | null> {\n  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/readings/current`)\n  if (!response.ok) throw new Error(`Request failed: ${response.status}`)\n  const body: unknown = await response.json()\n  if (typeof body !== "object" || body === null || !("reading" in body)) {\n    throw new Error("Invalid API response")\n  }\n  return (body as { reading: Reading | null }).reading\n}',
        explanation:
          'This example uses a Vite-style environment variable; use your framework’s documented public configuration key and never expose backend secrets. Validate untrusted JSON more deeply in production, and show errors in the UI.',
        expectedOutput:
          'The service returns a reading or null and throws explicit HTTP/network/schema errors for the caller to handle.',
      },
      {
        title: 'JavaScript event handling',
        filename: 'app.js',
        language: 'javascript',
        code: 'const refreshButton = document.querySelector("#refresh")\nrefreshButton?.addEventListener("click", async () => {\n  const status = document.querySelector("#status")\n  status.textContent = "Loading…"\n  try {\n    const response = await fetch("/api/readings/current")\n    if (!response.ok) throw new Error(`HTTP ${response.status}`)\n    status.textContent = "Reading updated"\n  } catch (error) {\n    status.textContent = "Could not load reading; try again"\n    console.error("Refresh failed", error)\n  }\n})',
        explanation:
          'The optional chaining handles a missing button element. In a framework app, keep UI updates in framework state rather than mutating DOM nodes directly.',
        expectedOutput:
          'Clicking refresh updates status and distinguishes a failed request from a successful HTTP response.',
      },
    ],
    diagram: {
      title: 'VS Code web development loop',
      nodes: [
        'Edit HTML/CSS/JS/TypeScript',
        'Formatter and linter check code',
        'Static or framework server runs',
        'Browser renders UI and API state',
      ],
    },
    activity:
      'Build a responsive sensor page with a refresh action and explicit loading, missing-data, and backend-offline states.',
    quiz: [
      question(
        'Multiple choice',
        'Which tool should run a Next.js project?',
        'The project’s documented npm run dev script',
        ['Live Server for every page', 'The Python debugger'],
        'Framework scripts start the framework-aware development server.',
      ),
      question(
        'True or false',
        'A TypeScript type annotation validates JSON received from an API at runtime.',
        'False',
        ['True', 'Only with fetch'],
        'Types are erased at runtime; validate untrusted API data explicitly.',
      ),
      question(
        'Code reading',
        'Why check response.ok after fetch?',
        'HTTP error statuses do not automatically reject the fetch promise',
        ['To install ESLint', 'To enable CSS'],
        'fetch resolves for HTTP 4xx/5xx; the application must inspect the status.',
      ),
    ],
    docs: [docs.javascript, docs.documentation, docs.marketplace],
  },
  {
    slug: 'vscode-python-backend',
    title: 'Python and Backend Development',
    level: 'Intermediate',
    minutes: 65,
    summary:
      'Configure Python and Pylance, create virtual environments, debug Python, and build FastAPI or Flask APIs.',
    objectives: [
      'Select a Python interpreter and isolate dependencies in a virtual environment.',
      'Run and debug Python code with breakpoints.',
      'Create a basic FastAPI endpoint and understand database/API boundaries.',
    ],
    prerequisites: ['VS Code installed', 'Python 3 installed separately'],
    sections: [
      {
        title: 'Python extension and environments',
        body: 'Install Microsoft’s Python extension; Pylance supplies language intelligence and type analysis. Choose the project interpreter using Python: Select Interpreter. Create .venv in the workspace and install packages with python -m pip so the active interpreter is explicit. Never commit the environment directory or secret-bearing .env files.',
      },
      {
        title: 'Run and debug Python',
        body: 'Run a script in the terminal or use the Python extension’s Run/Debug action. Set breakpoints, inspect variables, and create launch configurations for repeatable arguments or environment settings. Keep secrets in local environment configuration that is excluded from version control.',
      },
      {
        title: 'Build a backend API',
        body: 'FastAPI defines typed HTTP endpoints and OpenAPI docs; Flask is a lightweight alternative. Use Pydantic/request models, database sessions, explicit errors, and a separate service layer as the application grows. SQLite is useful for local development; protect production data with authentication, authorization, backups, and migrations.',
      },
    ],
    steps: [
      {
        title: 'Create a Python project',
        detail:
          'Open the backend folder, create .venv, select its interpreter, and install dependencies from the project manifest.',
      },
      {
        title: 'Run a FastAPI app',
        detail:
          'Install fastapi and uvicorn in the environment and run the documented uvicorn module command from the project root.',
      },
      {
        title: 'Set a breakpoint',
        detail:
          'Create a launch configuration for the app, pause inside a route, and inspect validated request values.',
      },
      {
        title: 'Add persistence carefully',
        detail:
          'Use SQLite for local records, parameterized ORM/SQL operations, and server-side credentials only.',
      },
    ],
    examples: [
      {
        title: 'FastAPI sensor health and current route',
        filename: 'app/main.py',
        language: 'python',
        code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/api/health")\ndef health() -> dict[str, str]:\n    return {"status": "ok"}\n\n@app.get("/api/readings/current")\ndef current_reading() -> dict[str, object]:\n    return {"reading": None}',
        explanation:
          'Install FastAPI and an ASGI server in a virtual environment, then run uvicorn app.main:app --reload. This starter returns no reading; replace it with a validated repository query and appropriate error behavior.',
        expectedOutput:
          'GET /api/health returns a JSON status and GET /api/readings/current returns a reading envelope.',
      },
      {
        title: 'Debug launch configuration',
        filename: '.vscode/launch.json',
        language: 'json',
        code: '{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "name": "FastAPI (uvicorn)",\n      "type": "debugpy",\n      "request": "launch",\n      "module": "uvicorn",\n      "args": ["app.main:app", "--reload"],\n      "jinja": true\n    }\n  ]\n}',
        explanation:
          'The Python Debugger extension provides debugpy support. Match the module path to your package and remove --reload if a multiprocess reloader interferes with debugging.',
        expectedOutput:
          'F5 starts the ASGI app under the debugger and breakpoints in app/main.py can be inspected.',
      },
    ],
    diagram: {
      title: 'Python backend workflow',
      nodes: [
        'Select project interpreter',
        'Install isolated packages',
        'Run/debug FastAPI or Flask',
        'Repository reads/writes database',
      ],
    },
    activity:
      'Build a FastAPI health route and a typed sensor response model; debug a request and handle an empty database result explicitly.',
    quiz: [
      question(
        'Multiple choice',
        'How should project packages normally be isolated?',
        'Use a project virtual environment',
        ['Install every package globally', 'Put packages in VS Code settings'],
        'A virtual environment keeps project dependencies separate and reproducible.',
      ),
      question(
        'True or false',
        'Pylance is a Python runtime that executes scripts.',
        'False',
        ['True', 'Only in FastAPI'],
        'Pylance provides language intelligence; Python itself executes the code.',
      ),
      question(
        'Code reading',
        'What does uvicorn app.main:app identify?',
        'The module and ASGI application object to run',
        ['An Android SDK', 'A Git branch'],
        'Uvicorn imports the module and serves the named ASGI app.',
      ),
    ],
    docs: [docs.python, docs.documentation, docs.debugging],
  },
  {
    slug: 'vscode-flutter-dart',
    title: 'Flutter and Dart Development',
    level: 'Intermediate',
    minutes: 55,
    summary:
      'Install Flutter, configure Dart/Flutter extensions, create apps, run devices, debug, and build APKs.',
    objectives: [
      'Install and validate the Flutter SDK using flutter doctor.',
      'Create and navigate a Flutter project in VS Code.',
      'Run and debug an app on an emulator or physical Android device.',
    ],
    prerequisites: [
      'VS Code and Flutter SDK',
      'Android Studio/Android SDK for Android device builds',
    ],
    sections: [
      {
        title: 'Install SDKs and extensions',
        body: 'Install the Flutter SDK and add its bin directory to PATH; Flutter includes Dart. Install the Dart and Flutter extensions from the verified Marketplace publishers. Android builds also need Android SDK tooling and an emulator or USB-debugging phone; Android Studio is commonly used to manage those tools even when VS Code is the editor.',
      },
      {
        title: 'Create, run, and debug',
        body: 'Run flutter doctor and address the Android toolchain checks. Use Flutter: New Project or flutter create, select a device, then run/debug. Hot reload updates many UI changes while preserving state. Use the Flutter inspector and debugger to inspect widget layout and state.',
      },
      {
        title: 'Build an Android APK',
        body: 'Run flutter build apk for a release APK or use flavor-specific options for multi-environment projects. A production release must be configured and signed securely. The Flutter SDK and Android SDK perform the build; the VS Code extension provides editor integration.',
      },
    ],
    steps: [
      {
        title: 'Verify Flutter toolchain',
        detail:
          'Run flutter doctor and resolve SDK/device issues before troubleshooting VS Code itself.',
      },
      {
        title: 'Create a project',
        detail: 'Run flutter create sensor_dashboard or use the Flutter: New Project command.',
      },
      {
        title: 'Run on an Android device',
        detail:
          'Start an emulator or connect an authorized phone and select it from the VS Code device picker.',
      },
      {
        title: 'Debug and build',
        detail:
          'Set a breakpoint, inspect widget state, then run flutter build apk from the project root.',
      },
    ],
    examples: [
      {
        title: 'Minimal Flutter sensor screen',
        filename: 'lib/main.dart',
        language: 'dart',
        code: "import 'package:flutter/material.dart';\n\nvoid main() => runApp(const SensorApp());\n\nclass SensorApp extends StatelessWidget {\n  const SensorApp({super.key});\n\n  @override\n  Widget build(BuildContext context) => MaterialApp(\n        home: Scaffold(\n          appBar: AppBar(title: const Text('Sensor Monitor')),\n          body: const Center(child: Text('Connect to your Raspberry Pi API')),\n        ),\n      );\n}",
        explanation:
          'The Flutter extension provides editor and debugger support; the Flutter SDK compiles and runs the app. A real API screen should include loading, empty, data, and error states.',
        expectedOutput: 'An Android emulator displays a Sensor Monitor page.',
      },
      {
        title: 'Flutter setup and build commands',
        filename: 'Integrated terminal',
        language: 'bash',
        code: 'flutter doctor\nflutter create sensor_dashboard\ncd sensor_dashboard\nflutter devices\nflutter run\nflutter build apk',
        explanation:
          'Run flutter doctor first, then verify the Android toolchain. The release build’s signing and version settings must be configured before distribution.',
        expectedOutput:
          'The app launches on the selected device and a release APK is generated under build/app/outputs/flutter-apk/.',
      },
    ],
    diagram: {
      title: 'Flutter development with VS Code',
      nodes: [
        'Flutter and Dart extensions',
        'Flutter SDK creates app',
        'Android SDK supplies device/build tools',
        'Debug, hot reload, and package APK',
      ],
    },
    activity:
      'Create a Flutter sensor landing page with two widget states, run it on an emulator, set a breakpoint, and build a test APK.',
    quiz: [
      question(
        'Multiple choice',
        'Which command checks the Flutter development toolchain?',
        'flutter doctor',
        ['npm install', 'adb delete'],
        'flutter doctor reports missing Flutter, Android, and device requirements.',
      ),
      question(
        'True or false',
        'Installing the Flutter extension alone installs the Flutter SDK.',
        'False',
        ['True', 'Only on Android'],
        'Install Flutter SDK separately and configure its bin directory.',
      ),
      question(
        'Code reading',
        'Where does Flutter place Android APK build outputs?',
        'build/app/outputs/flutter-apk/',
        ['.vscode/extensions.json', 'node_modules/.cache'],
        'Flutter APK outputs are generated within the project build directory.',
      ),
    ],
    docs: [docs.flutter, docs.dart, docs.documentation],
  },
  {
    slug: 'vscode-ionic-capacitor',
    title: 'Ionic and Capacitor Development',
    level: 'Intermediate',
    minutes: 60,
    summary:
      'Create Ionic apps, add Capacitor, sync Android, open Android Studio, and debug native device builds.',
    objectives: [
      'Create an Ionic project with Node.js and the Ionic CLI.',
      'Understand Capacitor web build, native platform, and sync workflow.',
      'Run an Android build while using VS Code for web source editing.',
    ],
    prerequisites: ['Node.js/npm', 'VS Code', 'Android Studio and Android SDK for Android builds'],
    sections: [
      {
        title: 'Ionic and Capacitor roles',
        body: 'Ionic provides web UI components and framework integrations. Capacitor packages a built web app into native projects and bridges native APIs. VS Code edits the Ionic source; Node/npm, Ionic CLI, Capacitor CLI, Android SDK, and Android Studio provide the actual development/build tools.',
      },
      {
        title: 'Create and add Android',
        body: 'Scaffold an Ionic React or Angular app using the current Ionic CLI. Install Capacitor core and CLI, initialize configuration with a reverse-domain app ID and correct webDir, then install @capacitor/android and run npx cap add android once. Build the web app before npx cap sync android; open the generated project in Android Studio.',
      },
      {
        title: 'Debug and access APIs',
        body: 'Use the browser dev server for web debugging and Android Studio/Logcat for native runtime issues. Physical devices need reachable backend addresses rather than localhost. Add official Capacitor plugins and follow current permission requirements; do not assume the website can be packaged if its framework requires a server runtime.',
      },
    ],
    steps: [
      {
        title: 'Install Node and Ionic CLI',
        detail:
          'Check node --version and npm --version, then install or use the Ionic CLI following its current documentation.',
      },
      {
        title: 'Create a starter app',
        detail:
          'Create an Ionic React or Angular project and run it in a browser before adding native platforms.',
      },
      {
        title: 'Add Capacitor Android',
        detail:
          'Install Capacitor packages, initialize appId/appName/webDir, install Android support, and add the platform once.',
      },
      {
        title: 'Build, sync, and debug',
        detail:
          'Build the web app, run npx cap sync android, open Android Studio, and inspect native errors with Logcat.',
      },
    ],
    examples: [
      {
        title: 'Ionic and Capacitor Android commands',
        filename: 'Integrated terminal',
        language: 'bash',
        code: 'npm install @capacitor/core\nnpm install -D @capacitor/cli\nnpx cap init\nnpm install @capacitor/android\nnpx cap add android\nnpm run build\nnpx cap sync android\nnpx cap open android',
        explanation:
          'Run commands from the Ionic project root. Provide a reverse-domain app ID during init, make webDir match the framework build output, add Android once, then rebuild and sync after web/plugin changes.',
        expectedOutput:
          'The android/ project opens in Android Studio with the latest built web assets and native plugin setup.',
      },
      {
        title: 'Ionic React API request',
        filename: 'src/services/readings.ts',
        language: 'typescript',
        code: 'export async function currentReading(apiBaseUrl: string) {\n  const response = await fetch(`${apiBaseUrl}/api/readings/current`)\n  if (!response.ok) throw new Error(`API returned ${response.status}`)\n  const body: unknown = await response.json()\n  if (typeof body !== "object" || body === null || !("reading" in body)) {\n    throw new Error("Invalid response")\n  }\n  return body.reading\n}',
        explanation:
          'Pass an environment-specific public API URL. For a physical phone use the Pi/computer LAN IP; do not ship localhost or server credentials. Validate response fields in production.',
        expectedOutput:
          'The service returns the API reading envelope or throws an explicit request/shape error.',
      },
    ],
    diagram: {
      title: 'Ionic web app to Android project',
      nodes: [
        'Edit Ionic source in VS Code',
        'Build web assets',
        'Capacitor syncs Android platform',
        'Android Studio runs and debugs app',
      ],
    },
    activity:
      'Create an Ionic starter, add Capacitor Android, sync a build, and document which issue you would inspect in the browser versus Logcat.',
    quiz: [
      question(
        'Multiple choice',
        'What should usually happen before npx cap sync android?',
        'Build the Ionic web application',
        ['Delete package.json', 'Install Python globally'],
        'Capacitor sync copies the current web build into the native platform project.',
      ),
      question(
        'True or false',
        'Ionic UI components and Capacitor native packaging are the same tool.',
        'False',
        ['True', 'Only for Android'],
        'Ionic supplies UI; Capacitor supplies native project/runtime integration.',
      ),
      question(
        'Code reading',
        'What must capacitor.config.ts webDir identify?',
        'The built web assets directory',
        ['The Android SDK home', 'A GitHub branch'],
        'Capacitor needs the directory containing the built app and index.html.',
      ),
    ],
    docs: [docs.documentation, docs.website, docs.marketplace],
  },
  {
    slug: 'vscode-backend-development',
    title: 'Backend Development and Databases',
    level: 'Intermediate',
    minutes: 65,
    summary:
      'Use VS Code for REST APIs, Node.js or FastAPI, SQLite/MongoDB, tests, and local API debugging.',
    objectives: [
      'Run a local backend with its declared runtime and dependencies.',
      'Build and test REST endpoints with useful error handling.',
      'Connect SQLite or MongoDB without exposing credentials.',
    ],
    prerequisites: [
      'Basic JavaScript or Python',
      'Node.js or Python installed for the chosen stack',
    ],
    sections: [
      {
        title: 'Backend project workflow',
        body: 'Open the backend root, install from its lockfile or requirements, configure environment variables locally, run migrations if needed, and start the development server. VS Code provides editing and debugging; Node/Python and the framework execute the service. Keep secret files out of Git and do not commit database credentials.',
      },
      {
        title: 'REST API and data stores',
        body: 'Design resource routes and validate request/response data. Use parameterized queries or an ORM with SQLite for local storage; use MongoDB drivers and access control when a document database is required. Handle authentication, authorization, database failures, and CORS intentionally. Browser clients need a server CORS policy; native clients have different browser restrictions.',
      },
      {
        title: 'Test and debug endpoints',
        body: 'Use the debugger for breakpoints and a REST Client extension or curl for requests. Write tests for success, empty, invalid, unauthorized, and database failure cases. Bind a development server to the network only when local-device access is needed and restrict firewall access to trusted networks.',
      },
    ],
    steps: [
      {
        title: 'Inspect project manifests',
        detail:
          'Read package.json or requirements.txt and use the project’s documented package manager.',
      },
      {
        title: 'Configure local environment',
        detail:
          'Copy a safe example env file if provided, add secrets only to ignored local files, and verify required variables.',
      },
      {
        title: 'Run and query the API',
        detail:
          'Start the server and send a GET request with REST Client or curl; inspect status and response shape.',
      },
      {
        title: 'Test persistence',
        detail:
          'Save and retrieve a reading using parameterized SQL or the project’s ORM and verify database errors are visible.',
      },
    ],
    examples: [
      {
        title: 'FastAPI endpoint with SQLite parameter binding',
        filename: 'app/main.py',
        language: 'python',
        code: 'import sqlite3\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\ndef current_reading():\n    with sqlite3.connect("readings.db") as connection:\n        connection.row_factory = sqlite3.Row\n        row = connection.execute(\n            "SELECT timestamp, light_lux FROM readings ORDER BY timestamp DESC LIMIT ?",\n            (1,),\n        ).fetchone()\n    return dict(row) if row else None\n\n@app.get("/api/readings/current")\ndef read_current():\n    return {"reading": current_reading()}',
        explanation:
          'The query binds the limit rather than interpolating SQL. Production code should use a managed connection/session dependency, explicit schemas, migrations, and appropriate error handling.',
        expectedOutput:
          'GET /api/readings/current returns the newest row or a reading:null envelope when the database is empty.',
      },
      {
        title: 'REST Client request',
        filename: 'api-tests.http',
        language: 'http',
        code: '### Check API health\nGET http://127.0.0.1:8000/api/health\nAccept: application/json\n\n### Read current sensor values\nGET http://127.0.0.1:8000/api/readings/current\nAccept: application/json',
        explanation:
          'Install the REST Client extension and click Send Request above a request. Replace the host when testing from a different device; never put bearer tokens in a committed request file.',
        expectedOutput:
          'The extension displays status, response headers, and JSON response for each request.',
      },
    ],
    diagram: {
      title: 'Local backend development',
      nodes: [
        'VS Code edits backend',
        'Runtime runs API and tests',
        'API validates and stores data',
        'Mobile/web client calls REST routes',
      ],
    },
    activity:
      'Create a health route and current-reading endpoint backed by SQLite; test normal, empty, and database-error responses.',
    quiz: [
      question(
        'Multiple choice',
        'How should SQL values from requests be included in a query?',
        'Use parameterized queries or a safe ORM API',
        ['Concatenate raw user text', 'Put values in a source comment'],
        'Bound parameters help avoid injection and quoting errors.',
      ),
      question(
        'True or false',
        'A .env file containing credentials should normally be committed to Git.',
        'False',
        ['True', 'Only if VS Code hides it'],
        'Keep secrets in ignored local/CI secret stores; share a secret-free example template.',
      ),
      question(
        'Code reading',
        'What should an API return when there are no sensor records?',
        'An explicit empty/null state matching its response contract',
        ['A fabricated reading of zero', 'A successful response with hidden errors'],
        'Empty data differs from an actual zero measurement and should be represented accurately.',
      ),
    ],
    docs: [docs.python, docs.documentation, docs.javascript],
  },
  {
    slug: 'vscode-git-github',
    title: 'Git and GitHub Integration',
    level: 'Beginner–Intermediate',
    minutes: 55,
    summary:
      'Track changes with Git, use VS Code Source Control, create branches, resolve conflicts, and collaborate through GitHub.',
    objectives: [
      'Initialize or clone a Git repository and inspect changes.',
      'Commit focused changes, create branches, and synchronize with a remote.',
      'Resolve merge conflicts and collaborate through pull requests.',
    ],
    prerequisites: [
      'Git installed',
      'A local practice folder',
      'GitHub account only for remote collaboration',
    ],
    sections: [
      {
        title: 'Git versus GitHub',
        body: 'Git is a distributed version control system that records project history locally. GitHub is a hosted service for repositories, issues, and pull requests. VS Code Source Control provides a UI for common Git operations, while the terminal exposes the same Git commands.',
      },
      {
        title: 'Everyday collaboration workflow',
        body: 'Clone a repository or initialize one, review status/diffs, stage related changes, and create a meaningful commit. Use feature branches and pull requests to review changes before merging. Pull or rebase with care when histories diverge; resolve conflicts by understanding both changes rather than choosing a side blindly.',
      },
      {
        title: 'Secrets and repository hygiene',
        body: 'Use .gitignore for build outputs, local environments, and secret files. Review staged diffs before commit. If a credential is committed, removing the file from the latest commit is not enough; rotate the credential and follow the hosting provider’s history remediation guidance.',
      },
    ],
    steps: [
      {
        title: 'Initialize and inspect',
        detail:
          'Run git init in a practice project and use Source Control to inspect untracked files.',
      },
      {
        title: 'Stage a focused change',
        detail: 'Review the diff, stage only intended files, and create a descriptive commit.',
      },
      {
        title: 'Create a feature branch',
        detail: 'Use Source Control or git switch -c to isolate a small change.',
      },
      {
        title: 'Share and review',
        detail:
          'Connect a remote, push the branch, and open a pull request for discussion and review.',
      },
    ],
    examples: [
      {
        title: 'Basic Git branch workflow',
        filename: 'Integrated terminal',
        language: 'bash',
        code: 'git status\ngit switch -c docs/vscode-setup\ngit add README.md\ngit diff --cached\ngit commit -m "docs: add VS Code setup"\ngit push -u origin docs/vscode-setup',
        explanation:
          'Review the staged diff before committing. Push requires a configured remote and authentication. Do not stage local secrets or generated environments.',
        expectedOutput:
          'A focused commit is created on a feature branch and pushed to the configured remote.',
      },
      {
        title: 'Ignore local secrets and environments',
        filename: '.gitignore',
        language: 'gitignore',
        code: '.env\n.env.*\n!.env.example\n.venv/\n__pycache__/\nnode_modules/\n.vscode/settings.json',
        explanation:
          'Ignore patterns should match the project’s needs. Workspace extension recommendations can remain shareable; machine-specific settings and secret files should not be committed.',
        expectedOutput:
          'Git excludes local secrets, virtual environments, caches, and installed packages from new commits.',
      },
    ],
    diagram: {
      title: 'GitHub collaboration loop',
      nodes: [
        'Create branch',
        'Review and commit diff',
        'Push branch and open pull request',
        'Review, resolve, and merge',
      ],
    },
    activity:
      'Create a branch, make a small source change, inspect and commit it, then resolve a practice merge conflict in a disposable repository.',
    quiz: [
      question(
        'Multiple choice',
        'What is Git?',
        'A distributed version control system',
        ['A VS Code theme', 'A Python package manager'],
        'Git tracks source history and branches locally and across remotes.',
      ),
      question(
        'True or false',
        'GitHub and Git are the same product.',
        'False',
        ['True', 'Only for private repositories'],
        'Git is the version control tool; GitHub hosts Git repositories and collaboration features.',
      ),
      question(
        'Code reading',
        'What does git diff --cached show?',
        'Changes staged for the next commit',
        ['All remote GitHub issues', 'Installed VS Code extensions'],
        'The cached/index diff shows what is staged to commit.',
      ),
    ],
    docs: [docs.git, docs.documentation, docs.marketplace],
  },
  {
    slug: 'vscode-esp32-platformio',
    title: 'ESP32 Development with PlatformIO',
    level: 'Advanced',
    minutes: 65,
    summary:
      'Set up PlatformIO, select an ESP32 board and COM port, compile/upload C++, monitor serial output, and read sensors.',
    objectives: [
      'Create a PlatformIO project and select the correct board/environment.',
      'Compile and upload firmware through a USB serial port.',
      'Use Serial Monitor and sensor drivers safely.',
    ],
    prerequisites: [
      'VS Code and PlatformIO IDE extension',
      'ESP32 board and data-capable USB cable',
      'Optional ToF/BH1750/soil sensors',
    ],
    sections: [
      {
        title: 'PlatformIO setup and board selection',
        body: 'Install PlatformIO IDE from the official Marketplace publisher and allow it to initialize its toolchain. Create a project using the exact board model and Arduino framework or ESP-IDF required by the firmware. Dependencies are declared in platformio.ini; do not choose a similar-looking board without checking its MCU, flash, and pin mapping.',
      },
      {
        title: 'Compile, upload, and monitor',
        body: 'Connect a data-capable USB cable, select the correct COM/serial port, build, upload, and open Serial Monitor at the firmware baud rate. Close other serial tools before upload. On Windows, install a USB-UART driver only from the board/chip vendor when needed. A wrong port, boot mode, driver, cable, or board setting can cause upload errors.',
      },
      {
        title: 'Read sensors and publish telemetry',
        body: 'Use each sensor’s documented library and wiring. ToF and BH1750 sensors commonly use I²C; capacitive soil sensors may use an ADC pin. Calibrate moisture against dry/wet samples and apply ESP32 ADC constraints. Validate readings, timestamp samples, connect Wi-Fi securely, and publish MQTT using authentication/TLS appropriate for deployment.',
      },
    ],
    steps: [
      {
        title: 'Install PlatformIO',
        detail:
          'Install the official PlatformIO IDE extension and restart/allow its toolchain setup to finish.',
      },
      {
        title: 'Create the exact board project',
        detail:
          'Select the board model and Arduino or ESP-IDF framework, then inspect platformio.ini.',
      },
      {
        title: 'Build and upload',
        detail:
          'Connect the ESP32, select its serial port, build firmware, upload, and open Serial Monitor.',
      },
      {
        title: 'Read one sensor',
        detail:
          'Add the correct sensor library and wiring, check the bus/address, and print validated values with units.',
      },
    ],
    examples: [
      {
        title: 'PlatformIO project configuration',
        filename: 'platformio.ini',
        language: 'ini',
        code: '[env:esp32dev]\nplatform = espressif32\nboard = esp32dev\nframework = arduino\nmonitor_speed = 115200\nlib_deps =\n  claws/BH1750',
        explanation:
          'Replace esp32dev with the exact board ID from PlatformIO’s board registry. Add ToF and other libraries by their maintained package names and verify sensor address/pin documentation.',
        expectedOutput:
          'PlatformIO resolves the board toolchain and BH1750 dependency for the selected environment.',
      },
      {
        title: 'Arduino sensor loop skeleton',
        filename: 'src/main.cpp',
        language: 'cpp',
        code: '#include <Arduino.h>\n#include <Wire.h>\n\nconstexpr int SOIL_PIN = 34;\n\nvoid setup() {\n  Serial.begin(115200);\n  Wire.begin();\n  analogReadResolution(12);\n}\n\nvoid loop() {\n  const int soilRaw = analogRead(SOIL_PIN);\n  Serial.printf("soil_raw=%d\\n", soilRaw);\n  delay(1000);\n}',
        explanation:
          'GPIO 34 is an ADC-capable input on many classic ESP32 boards but check your exact board pinout. Add sensor initialization, calibration, non-blocking timing, and safe Wi-Fi/MQTT handling for production.',
        expectedOutput:
          'Serial Monitor prints soil ADC samples once per second; a calibrated percentage requires measured dry/wet references.',
      },
    ],
    diagram: {
      title: 'ESP32 firmware workflow',
      nodes: [
        'Edit C++ and platformio.ini',
        'PlatformIO builds toolchain',
        'Upload through USB COM port',
        'Serial Monitor validates sensor data',
      ],
    },
    activity:
      'Build and upload a PlatformIO sketch, confirm the serial port, print soil_raw, and document how you would add ToF and BH1750 readings.',
    quiz: [
      question(
        'Multiple choice',
        'Where is a PlatformIO project’s board and dependency setup declared?',
        'platformio.ini',
        ['package.json only', 'AndroidManifest.xml'],
        'platformio.ini selects board/framework and can declare library dependencies.',
      ),
      question(
        'True or false',
        'Every ESP32 board uses the same pin mapping and USB serial driver.',
        'False',
        ['True', 'Only with Arduino'],
        'Board variants differ; check the exact board documentation and USB-UART chip.',
      ),
      question(
        'Code reading',
        'What should you verify if upload fails with a serial port error?',
        'USB cable, driver, selected port, board, and boot mode',
        ['CSS media query', 'GitHub profile'],
        'Serial hardware and board configuration are common causes of upload failure.',
      ),
    ],
    docs: [docs.platformio, docs.marketplace, docs.documentation],
  },
  {
    slug: 'vscode-raspberry-pi-remote',
    title: 'Raspberry Pi Remote Development',
    level: 'Advanced',
    minutes: 65,
    summary:
      'Connect to Raspberry Pi OS over SSH, use Remote - SSH, run Python/FastAPI, MQTT, and SQLite remotely.',
    objectives: [
      'Prepare a Raspberry Pi with SSH and a reachable network address.',
      'Open and edit Pi files through Remote - SSH.',
      'Run a Python virtual environment and backend service safely.',
    ],
    prerequisites: [
      'Raspberry Pi running Raspberry Pi OS',
      'Network access and SSH credentials',
      'VS Code and Remote - SSH extension',
    ],
    sections: [
      {
        title: 'Enable SSH and connect',
        body: 'Enable SSH using Raspberry Pi OS configuration tools or a managed imaging workflow, keep the system updated, and use key-based authentication where possible. Install Remote - SSH from Microsoft’s Marketplace publisher, add a host entry to ~/.ssh/config, and connect from VS Code. Verify the device identity and never bypass host-key warnings without investigation.',
      },
      {
        title: 'Remote Python and FastAPI',
        body: 'Once connected, VS Code’s remote window operates on the Pi. Open the backend folder on the remote device, select its Python interpreter, create a virtual environment, install dependencies, and debug there. For services that need to survive terminal closure or reboot, configure an appropriate systemd service rather than leaving a development server running in a terminal.',
      },
      {
        title: 'MQTT and SQLite',
        body: 'Install and configure Mosquitto and SQLite on the Pi using Raspberry Pi OS package guidance. Restrict broker listeners and credentials to the intended network. Keep the database local to the backend and expose only authenticated API routes. Back up data and protect the Pi with updates and firewall policy.',
      },
    ],
    steps: [
      {
        title: 'Prepare the Pi',
        detail:
          'Update Raspberry Pi OS, enable SSH, identify the host address, and create a non-default user with strong credentials.',
      },
      {
        title: 'Configure SSH client',
        detail:
          'Create a ~/.ssh/config host alias with the Pi address and user; prefer an SSH key with appropriate file permissions.',
      },
      {
        title: 'Connect using Remote - SSH',
        detail:
          'Install the Remote - SSH extension, connect to the host alias, verify the remote indicator, and open the backend folder.',
      },
      {
        title: 'Run and debug services',
        detail:
          'Create a remote Python venv, install FastAPI/Uvicorn, run the API for development, and inspect logs before configuring a managed service.',
      },
    ],
    examples: [
      {
        title: 'SSH host configuration',
        filename: '~/.ssh/config',
        language: 'ssh-config',
        code: 'Host sensor-pi\n  HostName 192.168.1.40\n  User iotdev\n  IdentityFile ~/.ssh/id_ed25519\n  IdentitiesOnly yes',
        explanation:
          'Replace the sample address and user with values for your Pi. Protect the private key, verify the host fingerprint on first connect, and restrict SSH to trusted networks.',
        expectedOutput:
          'Remote - SSH can connect using the sensor-pi alias and the selected private key.',
      },
      {
        title: 'Prepare FastAPI environment on the Pi',
        filename: 'Remote integrated terminal',
        language: 'bash',
        code: 'sudo apt update\nsudo apt install -y python3-venv python3-pip\nmkdir -p ~/sensor-api\ncd ~/sensor-api\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install fastapi uvicorn\npython -m uvicorn app.main:app --host 0.0.0.0 --port 8000',
        explanation:
          'Binding to 0.0.0.0 allows LAN interfaces to accept traffic; restrict the port with host/router firewall rules and use authentication/TLS beyond a trusted development LAN. Run only a development service this way; production needs a managed deployment and security review.',
        expectedOutput:
          'The development API listens on port 8000 on Pi interfaces and is reachable from allowed LAN devices.',
      },
    ],
    diagram: {
      title: 'Remote Pi development',
      nodes: [
        'Laptop VS Code + SSH key',
        'Remote - SSH secure session',
        'Edit/run code on Raspberry Pi',
        'FastAPI, MQTT, and SQLite stay on Pi',
      ],
    },
    activity:
      'Connect to a Pi using Remote - SSH, create a remote virtual environment, run a FastAPI health route, and confirm firewall scope before testing from another device.',
    quiz: [
      question(
        'Multiple choice',
        'Where does code execute when connected using Remote - SSH?',
        'On the Raspberry Pi remote host',
        ['Only in the local browser', 'On GitHub Actions'],
        'Remote - SSH opens remote files and runs tools on the remote machine.',
      ),
      question(
        'True or false',
        'A development server bound to 0.0.0.0 should always be exposed to the public internet.',
        'False',
        ['True', 'Only with SQLite'],
        'Bind scope and firewall rules must limit access; production needs appropriate security.',
      ),
      question(
        'Code reading',
        'What does source .venv/bin/activate do on Linux?',
        'Activates the virtual environment in the current shell',
        ['Starts Mosquitto', 'Enables Android debugging'],
        'The activation script adjusts the shell environment to use the project venv.',
      ),
    ],
    docs: [docs.remoteSsh, docs.raspberryPi, docs.python],
  },
  {
    slug: 'vscode-debugging',
    title: 'Debugging and Troubleshooting',
    level: 'Intermediate',
    minutes: 55,
    summary:
      'Set breakpoints, inspect variables, configure launch targets, and diagnose web, Python, Flutter, and API issues.',
    objectives: [
      'Use breakpoints, stepping, Watch, Call Stack, and Debug Console.',
      'Create an appropriate launch configuration for a project.',
      'Separate editor, extension, runtime, build, and network failures.',
    ],
    prerequisites: [
      'A runnable sample project',
      'Relevant language extension and runtime installed',
    ],
    sections: [
      {
        title: 'Debugger fundamentals',
        body: 'A breakpoint pauses execution at a location. Step over runs the current line, step into follows a function call, and step out returns to the caller. Variables/Watch show current values; Call Stack shows the path to the pause; Debug Console evaluates expressions in the paused context. Remove or condition breakpoints after use.',
      },
      {
        title: 'Launch configurations',
        body: 'A .vscode/launch.json describes debugger type and how to start or attach to a process. Select the matching extension/debug adapter and project entry point. Frameworks may provide generated configurations. Do not store credentials in launch.json; use ignored local environment settings or a secret manager.',
      },
      {
        title: 'Diagnose the failing layer',
        body: 'Read the first useful terminal/build error and identify its layer: editor diagnostics, extension, runtime, dependency, compiler, device, server, or network. For APIs, check address reachability, status, response format, TLS, and CORS for browser clients. For Flutter, run flutter doctor; for Android, inspect Gradle output and Logcat; for embedded uploads, check board and COM port.',
      },
    ],
    steps: [
      {
        title: 'Reproduce one issue',
        detail: 'Record steps and expected versus actual behavior before changing code.',
      },
      {
        title: 'Add a breakpoint',
        detail: 'Pause at the failing boundary and inspect input, state, and call stack.',
      },
      {
        title: 'Check the right output',
        detail:
          'Use Problems for diagnostics, terminal/build output for tool errors, and runtime logs for execution failures.',
      },
      {
        title: 'Verify the fix',
        detail:
          'Run the smallest relevant test, then repeat the original failure scenario and remove temporary logs.',
      },
    ],
    examples: [
      {
        title: 'Debug a Node.js script',
        filename: '.vscode/launch.json',
        language: 'json',
        code: '{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "name": "Debug current Node file",\n      "type": "node",\n      "request": "launch",\n      "program": "${file}",\n      "console": "integratedTerminal"\n    }\n  ]\n}',
        explanation:
          'This launches the currently active file with Node.js. Install Node and use a supported VS Code Node debugger; framework apps may need their package script or attach configuration instead.',
        expectedOutput:
          'F5 starts the script, pauses on a breakpoint, and exposes variables in Run and Debug.',
      },
      {
        title: 'Debug decision checklist',
        filename: 'Troubleshooting notes',
        language: 'text',
        code: '1. Reproduce and record exact error\n2. Identify layer: editor / extension / runtime / build / device / API\n3. Inspect first actionable error and relevant logs\n4. Check versions, paths, permissions, and configuration\n5. Change one cause; rerun the failing test',
        explanation:
          'A short reproducible loop avoids random configuration changes and helps distinguish a broken editor from a missing SDK or application bug.',
        expectedOutput: 'A repeatable diagnosis with a verified fix and a minimal regression test.',
      },
    ],
    diagram: {
      title: 'Debugging loop',
      nodes: [
        'Reproduce failure',
        'Pause and inspect state',
        'Fix the responsible layer',
        'Retest original scenario',
      ],
    },
    activity:
      'Add a breakpoint to a Python or JavaScript function, inspect a variable, fix a deliberate bug, and verify behavior with a test.',
    quiz: [
      question(
        'Multiple choice',
        'What does a breakpoint do?',
        'Pauses execution so program state can be inspected',
        ['Deletes a source file', 'Installs an extension'],
        'Breakpoints let a debugger pause at a selected location.',
      ),
      question(
        'True or false',
        'Every API 404 is caused by a VS Code extension.',
        'False',
        ['True', 'Only with Flutter'],
        'A 404 is an HTTP server response; verify route, host, and server behavior.',
      ),
      question(
        'Code reading',
        'Which debugger panel shows the active function call path?',
        'Call Stack',
        ['Extensions', 'Explorer'],
        'Call Stack lists frames leading to the paused execution point.',
      ),
    ],
    docs: [docs.debugging, docs.documentation, docs.python],
  },
  {
    slug: 'complete-iot-workflow',
    title: 'Complete IoT Development Workflow',
    level: 'Advanced',
    minutes: 90,
    summary:
      'Use VS Code across ESP32 firmware, Raspberry Pi MQTT/FastAPI/SQLite, mobile client, tests, and GitHub.',
    objectives: [
      'Plan a repository and development workflow spanning firmware, backend, and mobile.',
      'Trace sensor telemetry into a database and REST API.',
      'Debug and test failure states across the full IoT pipeline.',
    ],
    prerequisites: [
      'Completion of Git, backend, ESP32, and Raspberry Pi lessons',
      'Optional ESP32, Raspberry Pi, MQTT broker, and sensor hardware',
      'Flutter or Ionic mobile client and its platform SDKs',
    ],
    sections: [
      {
        title: 'Repository and architecture',
        body: 'A monorepo may contain firmware/, pi-backend/, mobile-app/, and docs/. Keep toolchains isolated per folder and document commands. Data flows from ToF/BH1750/soil sensors to ESP32 firmware, MQTT broker on Raspberry Pi, a subscriber that validates and stores SQLite records, FastAPI routes, and finally the mobile app. The VS Code workspace groups these folders; it does not replace their build systems.',
        bullets: [
          'Use PlatformIO for firmware, Python venv for backend, and Flutter or Node/Ionic tooling for the client.',
          'Keep secrets in ignored local files or managed secret stores; publish sanitized example configuration.',
          'Use Git branches, focused commits, tests, and code review for each system layer.',
        ],
      },
      {
        title: 'Implement and observe the path',
        body: 'Start with one sensor and one validated MQTT message. Add a backend subscriber, schema, SQLite write, and health/current/history routes. Connect the mobile app to a reachable backend URL and display timestamped values, missing data, stale status, and retry. Add a heartbeat if the UI must know ESP32 online state; a connected MQTT broker alone does not prove a device is sending.',
      },
      {
        title: 'Debug failures by boundary',
        body: 'Serial Monitor checks sensor/firmware output; MQTT subscriber logs validate topic and payload; FastAPI docs and REST Client verify HTTP routes; SQLite queries confirm persistence; mobile debugger checks parsing and rendering. Stop API, broker, and ESP32 separately to test distinct outage states. The current example API exposes REST; WebSockets require a separately implemented server route.',
      },
    ],
    steps: [
      {
        title: 'Create workspace and Git repository',
        detail:
          'Group firmware, backend, mobile, and documentation folders and add safe ignores and setup instructions.',
      },
      {
        title: 'Publish validated sensor messages',
        detail:
          'Read ToF distance, BH1750 lux, and calibrated soil moisture, then publish timestamped JSON to an authorized MQTT topic.',
      },
      {
        title: 'Bridge MQTT to FastAPI and SQLite',
        detail:
          'Validate payloads, persist sensor records, expose health/current/history REST routes, and test empty/error states.',
      },
      {
        title: 'Connect the mobile app',
        detail:
          'Use Retrofit or Fetch with the Pi’s reachable address, render units and freshness, and cache history if appropriate.',
      },
      {
        title: 'Test and debug disconnected layers',
        detail:
          'Stop each service independently, inspect the correct VS Code/serial/log window, and verify recoverable UI states.',
      },
    ],
    examples: [
      {
        title: 'Example telemetry payload',
        filename: 'MQTT JSON message',
        language: 'json',
        code: '{\n  "timestamp": "2026-11-10T12:00:00Z",\n  "tof_distance_mm": 315,\n  "light_lux": 245.5,\n  "soil_raw": 1820,\n  "soil_moisture_percent": 46.2,\n  "rssi": -58\n}',
        explanation:
          'The values are illustrative. Define units, timestamp format, optional/null field behavior, versioning, and device identity in a documented schema. Authenticate publishers and validate all messages before storage.',
        expectedOutput:
          'A subscriber receives one structured measurement that can be validated and persisted.',
      },
      {
        title: 'Backend stores a validated sample',
        filename: 'app/storage.py',
        language: 'python',
        code: 'def save_reading(connection, payload: dict) -> None:\n    connection.execute(\n        """INSERT INTO readings\n        (timestamp, tof_distance_mm, light_lux, soil_raw,\n         soil_moisture_percent, rssi)\n        VALUES (?, ?, ?, ?, ?, ?)""",\n        (payload["timestamp"], payload.get("tof_distance_mm"),\n         payload.get("light_lux"), payload.get("soil_raw"),\n         payload.get("soil_moisture_percent"), payload.get("rssi")),\n    )\n    connection.commit()',
        explanation:
          'Validate the payload schema and authorize the device before this storage function. SQLite placeholders bind values safely; never build SQL by interpolating MQTT input.',
        expectedOutput: 'A valid sensor payload is inserted as one SQLite history row.',
      },
      {
        title: 'C++ MQTT publish structure',
        filename: 'firmware/src/main.cpp',
        language: 'cpp',
        code: 'StaticJsonDocument<256> reading;\nreading["timestamp"] = isoTimestamp;\nreading["tof_distance_mm"] = distanceMm;\nreading["light_lux"] = lightLux;\nreading["soil_raw"] = soilRaw;\nreading["soil_moisture_percent"] = moisturePercent;\nreading["rssi"] = WiFi.RSSI();\n\nchar payload[256];\nconst size_t bytes = serializeJson(reading, payload, sizeof(payload));\nif (bytes > 0 && mqttClient.connected()) {\n  mqttClient.publish("sensors/esp32/reading", payload, bytes);\n}',
        explanation:
          'This assumes ArduinoJson, Wi-Fi, MQTT client, and validated sensor values are already initialized. Add reconnect/backoff, message-size checks, unique device identity, and TLS/authentication before deployment.',
        expectedOutput:
          'When Wi-Fi and broker are available, the ESP32 publishes a JSON measurement with all documented sensor fields.',
      },
    ],
    diagram: {
      title: 'Full VS Code IoT workflow',
      nodes: [
        'ESP32 sensors + MQTT publish',
        'Raspberry Pi subscriber + SQLite',
        'FastAPI REST API',
        'Mobile dashboard + GitHub-tested workflow',
      ],
    },
    activity:
      'Build or diagram the full pipeline. Verify one reading at serial, MQTT, SQLite, FastAPI, and mobile layers, then demonstrate recovery after API, broker, and device outages.',
    quiz: [
      question(
        'Multiple choice',
        'What is the main data path for this IoT application?',
        'ESP32 → MQTT/Pi → FastAPI/SQLite → mobile app',
        ['VS Code → GitHub → sensor pin', 'Android emulator → ADC directly'],
        'The Pi backend bridges device telemetry to the mobile-facing API.',
      ),
      question(
        'True or false',
        'A connected MQTT broker always means the ESP32 is online and publishing fresh data.',
        'False',
        ['True', 'Only with SQLite'],
        'Track device heartbeat or message freshness separately from broker connectivity.',
      ),
      question(
        'Code reading',
        'Why use SQL placeholders for MQTT-derived values?',
        'To bind data safely rather than concatenate input into SQL',
        ['To increase Wi-Fi range', 'To sign an APK'],
        'Parameterized SQL prevents unsafe input construction and quoting errors.',
      ),
    ],
    docs: [
      docs.platformio,
      docs.raspberryPi,
      docs.python,
      docs.flutter,
      docs.dart,
      docs.documentation,
    ],
  },
]

export const vscodeLessonSlugs = [
  ...vscodeLessons.map((lesson) => lesson.slug),
  'vscode-final-assessment',
]

export const vscodeFinalAssessment: VSCodeQuizQuestion[] = [
  question(
    'Multiple choice',
    'What does VS Code primarily provide?',
    'An extensible source-code editor',
    ['Every language runtime', 'A database server'],
    'Install language runtimes and SDKs separately as needed.',
  ),
  question(
    'Multiple choice',
    'Which view is used to debug a running process?',
    'Run and Debug',
    ['Explorer only', 'Marketplace'],
    'Run and Debug manages breakpoints and debugger state.',
  ),
  question(
    'True or false',
    'A workspace recommendation proves an extension is safe.',
    'False',
    ['True', 'Only for Python'],
    'Review extension publishers and trust; recommendations are not safety guarantees.',
  ),
  question(
    'True or false',
    'A physical phone should call the Pi backend using the phone’s localhost address.',
    'False',
    ['True', 'Only over Wi-Fi'],
    'Use the Pi’s reachable network address; localhost on a phone refers to the phone.',
  ),
  question(
    'Code reading',
    'Which command starts a project virtual environment on Linux?',
    'source .venv/bin/activate',
    ['git push', 'flutter doctor'],
    'Activating the environment selects its Python interpreter and packages in the shell.',
  ),
  question(
    'Code reading',
    'Why should MQTT-derived values use SQL placeholders?',
    'To bind values safely into a query',
    ['To format Kotlin code', 'To open a serial port'],
    'Bind parameters rather than concatenating untrusted payload values into SQL.',
  ),
]
