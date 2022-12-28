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

If you still need Unity or .NET Framework support, you can set `omnisharp.useModernNet` to `false` in your VS Code settings and restart OmniSharp.

See issue [#5120](https://github.com/OmniSharp/omnisharp-vscode/issues/5120) for more details.

## What's new in 1.25.0
* Make SDK build of OmniSharp the default ([#5120](https://github.com/OmniSharp/omnisharp-vscode/issues/5120), PR: [#5176](https://github.com/OmniSharp/omnisharp-vscode/pull/5176))
* Add auto complete name to class, interface, enum, struct etc. snippets (PR: [#5198](https://github.com/OmniSharp/omnisharp-vscode/pull/5198))
* Add a fallback for ps in remoteProcessPickerScript ([#4096](https://github.com/OmniSharp/omnisharp-vscode/issues/4096), PR: [#5207](https://github.com/OmniSharp/omnisharp-vscode/pull/5207))
* Clear nullability warnings in server/omnisharp.ts (PR: [#5199](https://github.com/OmniSharp/omnisharp-vscode/pull/5199))
* Fix nullability for autoStart preferredPath (PR: [#5192](https://github.com/OmniSharp/omnisharp-vscode/pull/5192))
* coreclr debug configuration should support input variables for envFile ([#5102](https://github.com/OmniSharp/omnisharp-vscode/issues/5102), PR: [#5189](https://github.com/OmniSharp/omnisharp-vscode/pull/5189))
* Fix small spelling mistake (PR: [#5215](https://github.com/OmniSharp/omnisharp-vscode/pull/5215))
* Low-hanging nullable fruit (PR: [#5186](https://github.com/OmniSharp/omnisharp-vscode/pull/5186))
* Fire a buffer update instead of filechanged when active editor changes  ([#5216](https://github.com/OmniSharp/omnisharp-vscode/issues/5216), PR: [#5218](https://github.com/OmniSharp/omnisharp-vscode/pull/5218))
* Add support for InlayHint.TextEdits (PR: [#5177](https://github.com/OmniSharp/omnisharp-vscode/pull/5177))
* Fix .net6 OmniSharp acquisition on Linux arm64 (PR: [#5172](https://github.com/OmniSharp/omnisharp-vscode/pull/5172))
* Remove project.json reference in debugger.md (PR: [#5210](https://github.com/OmniSharp/omnisharp-vscode/pull/5210))
* Update debugger to 1.24.5 (PR: [#5211](https://github.com/OmniSharp/omnisharp-vscode/pull/5211))
  * Fixes [#5083](https://github.com/OmniSharp/omnisharp-vscode/issues/5083)
* Update OmniSharp to 1.39.0 (PR: [#5219](https://github.com/OmniSharp/omnisharp-vscode/pull/5219))
  * Update Roslyn to 4.3.0-2.22267.5 (PR: [omnisharp-roslyn#2401](https://github.com/OmniSharp/omnisharp-roslyn/pull/2401))
  * Fixed run script for Mono ([#5181](https://github.com/OmniSharp/omnisharp-vscode/issues/5181), [#5179](https://github.com/OmniSharp/omnisharp-vscode/issues/5179), PR: [omnisharp-roslyn##2398](https://github.com/OmniSharp/omnisharp-roslyn/pull/2398))
  * Fall back to /usr/lib/os-release if /etc/os-release doesn't exist (PR: [omnisharp-roslyn##2380](https://github.com/OmniSharp/omnisharp-roslyn/pull/2380))
  * Added support for linux-musl-x64 and linux-musl-arm64 ([omnisharp-roslyn##2366](https://github.com/OmniSharp/omnisharp-roslyn/issues/2366), PR: [omnisharp-roslyn##2395](https://github.com/OmniSharp/omnisharp-roslyn/pull/2395))
  * Enable GoToDefinition for symbols in metadata documents ([#4818](https://github.com/OmniSharp/omnisharp-vscode/issues/4818), PR: [omnisharp-roslyn##2390](https://github.com/OmniSharp/omnisharp-roslyn/pull/2390))
  * Use human readable doc in lsp's signature help ([omnisharp-roslyn##2372](https://github.com/OmniSharp/omnisharp-roslyn/issues/2372), PR: [omnisharp-roslyn##2392](https://github.com/OmniSharp/omnisharp-roslyn/pull/2392))
  * Add TextEdits support to InlayHints (PR: [omnisharp-roslyn##2385](https://github.com/OmniSharp/omnisharp-roslyn/pull/2385))
  * Fix Equals of AutoCompleteResponse and simplify some code (PR: [omnisharp-roslyn##2362](https://github.com/OmniSharp/omnisharp-roslyn/pull/2362))
  * Support O# running on .NET 7 SDKs (PR: [omnisharp-roslyn##2377](https://github.com/OmniSharp/omnisharp-roslyn/pull/2377))
  * Provide constructor accepting hostServices (PR: [omnisharp-roslyn##2373](https://github.com/OmniSharp/omnisharp-roslyn/pull/2373))
  * Typo fix ([omnisharp-roslyn##2374](https://github.com/OmniSharp/omnisharp-roslyn/pull/2374))
  * Update to latest .NET SDKs (PR: [omnisharp-roslyn##2378](https://github.com/OmniSharp/omnisharp-roslyn/pull/2378))
  * Remove MSBuild and Mono from release packages ([omnisharp-roslyn##2339](https://github.com/OmniSharp/omnisharp-roslyn/issues/2339), PR: [omnisharp-roslyn##2360](https://github.com/OmniSharp/omnisharp-roslyn/pull/2360))

## What's new in 1.24.4
* Remove inlayHints from diff view (PR: [#5151](https://github.com/OmniSharp/omnisharp-vscode/pull/5151))
* Quote arguments containing spaces when launching OmniSharp ([#5150](https://github.com/OmniSharp/omnisharp-vscode/issues/5150), PR: [#5154](https://github.com/OmniSharp/omnisharp-vscode/pull/5154))

## What's new in 1.24.3
* Fix OmniSharp not found issue on Mono ([#5140](https://github.com/OmniSharp/omnisharp-vscode/issues/5140), PR: [#5141](https://github.com/OmniSharp/omnisharp-vscode/pull/5141))

### Note about using .NET Core 3.1.4xx SDKs

The .NET 3.1.4xx SDKs require version 16.7 of MSBuild.

For MacOS and Linux users who have Mono installed, this means you will need to set `omnisharp.useGlobalMono` to `never` until a version of Mono ships with MSBuild 16.7.

You can also use the .NET 6 build of OmniSharp which runs on the .NET 6 SDK. See instructions above.

### Note about using .NET 5 SDKs

The .NET 5 SDK requires version 16.8 of MSBuild.

For Windows users who have Visual Studio installed, this means you will need to be on the latest Visual Studio 16.8 Preview.

For MacOS and Linux users who have Mono installed, this means you will need to set `omnisharp.useGlobalMono` to `never` until a version of Mono ships with MSBuild 16.8.

You can also use the .NET 6 build of OmniSharp which runs on the .NET 6 SDK. See instructions above.

### Note about using .NET 6 SDKs

The .NET 6 SDK requires version 16.10 of MSBuild.

For Windows users who have Visual Studio installed, this means you will need to have Visual Studio 16.11 or newer installed.

For MacOS and Linux users who have Mono installed, this means you will need to set `omnisharp.useGlobalMono` to `never` until a version of Mono ships with MSBuild 16.10.

You can also use the .NET 6 build of OmniSharp which runs on the .NET 6 SDK. See instructions above.

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
