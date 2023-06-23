# free-omnisharp-vscode

The debugger included in the official C# extension is [proprietary](https://aka.ms/VSCode-DotNet-DbgLicense) and is licensed to only work with Microsoft versions of vscode.
This extension replaces it with [Samsung's MIT-licensed alternative](https://github.com/Samsung/netcoredbg/blob/master/LICENSE).

## Installation

This extension is published at [open-vsx.org](https://open-vsx.org/extension/muhammad-sammy/csharp).

### Build from source

Requirements:

- [nodejs](https://nodejs.org)
- npm (comes with nodejs)

```bash
git clone https://github.com/muhammadsammy/free-omnisharp-vscode.git

cd free-omnisharp-vscode

npm install

npx gulp 'vsix:release:package'

```

then run `Extensions: Install from VSIX` from the command pallete and select the `csharp-VERSION_NUMBER.vsix` file.

# From [OmniSharp/omnisharp-vscode](https://github.com/OmniSharp/omnisharp-vscode) README

## Announcements

### The C# extension no longer ships with an included Mono & MSBuild Tools

.NET Framework builds of OmniSharp no longer ship with Mono or the MSBuild tooling (See announcement [omnisharp-roslyn#2339](https://github.com/OmniSharp/omnisharp-roslyn/issues/2339)). To ensure that the C# extension remains usable out of the box for .NET SDK projects, we have changed the default value of `omnisharp.useModernNet` to `true`.

If you still need Unity or .NET Framework support, you can set `omnisharp.useModernNet` to `false` in your VS Code settings and restart OmniSharp. Please see the [Requirements](https://github.com/OmniSharp/omnisharp-vscode#requirements) section above to ensure necessary tooling is installed.

See issue [#5120](https://github.com/OmniSharp/omnisharp-vscode/issues/5120) for more details.

### Emmet support in Razor files

To enable emmet support, add the following to your settings.json:

```json
"emmet.includeLanguages": {
    "aspnetcorerazor": "html"
}
```

### Semantic Highlighting

The C# semantic highlighting support is in preview. To enable, set `editor.semanticHighlighting.enabled` and `csharp.semanticHighlighting.enabled` to `true` in your settings. Semantic highlighting is only provided for code files that are part of the active project.

To really see the difference, try the new Visual Studio 2019 Light and Dark themes with semantic colors that closely match Visual Studio 2019.

### Development

First install:

- Node.js (8.11.1 or later)
- Npm (5.6.0 or later)

To **run and develop** do the following:

* Run `npm ci`
* Run `npm run compile`
* Open in Visual Studio Code (`code .`)
* _Optional:_ run `npm run watch`, make code changes
* Press <kbd>F5</kbd> to debug

To **test** do the following: `npm run test` or <kbd>F5</kbd> in VS Code with the "Launch Tests" debug configuration.
