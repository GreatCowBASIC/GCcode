# Change Log

## 4.2.56 (September 20, 2022)
Updated Wijmo license. No other changes.

## 4.2.55 (June 13, 2022)
Fixed issue with CSV editing where text pasted into a cell was ignored when saving the file.

Fixed issue with CSV editing where changing a value in the rightmost cell could result in extra line breaks and/or misaligned cells when saving the file.

Fixed issue where a line number was displayed instead of the `*` character in the AddNew row.

## 4.2.54 (March 29, 2022)
Fixed problems with CSV editing when the `csv-preview.separator` configuration setting was set to a regular expression instead of a single character.

## 4.2.53 (March 9, 2022)
Updated Wijmo license to remove nag screen.

Editing features for CSV/Excel files are now part of the stable version.

## 4.1.52 Pre-Release (January 12, 2022)
Fixed issue where new rows were not appended correctly if the CSV file did not end with a blank line.

Fixed issue where multilne cells in CSV files were rendered as single lines when a preview or custom editor was first displayed.

## 4.1.51 Pre-Release (January 7, 2022)
Fixed regression where the `Open Preview` command did not work with TSV files.

Added support for editing CSV files: modifying individual cells, deleting rows, and appending new rows.

Added support for editing Excel files: modifying individual cells, inserting rows and columns, and deleting rows and columns.

Upgraded to use Wijmo build 5.20213.824.

## 4.0.50 (January 7, 2022)
Stable version, equivalent to 4.0.45.

## 4.0.45 (November 30, 2021)
Added read-only custom editor support. For Excel files, this is the default, and clicking the name of an Excel file in Explorer view opens the custom editor directly. For CSV files, this is optional, and executing the `Open With` command on the context menu prompts for the built-in or custom editor to be opened. The `Open Preview` command is still supported for both file types.

Added web extension support for CSV and Excel files, which allows the extension to be used in [Visual Studio Code for the Web](https://code.visualstudio.com/docs/editor/vscode-web).

> As a result of the changes needed to support Visual Studio Code for the Web, persistent previews saved with earlier versions of Excel Viewer cannot be restored. When one of these webviews is activated, the extension displays a message to that effect and provides additional instructions.

Fixed issue where the `csv-preview.capitalizeHeaders` configuration setting was ignored.

Added support for the `sep` keyword in CSV files, as recognized by Excel. For example, if the first line contains `sep=|`, then the vertical bar character is used as the separator. If present, the `sep` keyword overrides the `csv-preview.separator` configuration setting, as well as any implied separator character associated with the current language identifier.

Added dependency on VS Code version 1.62.

## 3.0.44 (September 3, 2021)
Fixed issue where Chinese characters were rendered as HTML entity markup in .xlsx files.

Multiline cells are now displayed properly in .xlsx files.

## 3.0.43 (August 20, 2021)
Fixed issue where persistent previews ignored changes to column structure in the underlying CSV file. Formerly, it was necessary to execute the `CSV: Clear Preview State` command to view the changes.

Updated Wijmo license to remove nag screen.

## 3.0.42 (May 25, 2021)
Added support for untrusted workspaces.

Added support for virtual workspaces.

Various dependabot pull requests.

## 3.0.41 (February 2, 2021)
Updated Wijmo license to remove nag screen.

## 3.0.40 (August 19, 2020)
Fixed regression where language ids with implied separator characters (such as TSV) were not supported.

## 3.0.39 (July 20, 2020)
Added dependency on VS Code version 1.47.

## 3.0.38 (July 17, 2020)
Fixed issue where VS Code version 1.47 changed the way webviews are hosted, resulting in a licensing nag screen.

## 3.0.37 (June 25, 2020)
Fixed issue where the `csv-preview.resizeColumns` setting was ignored.

## 3.0.36 (June 22, 2020)
This extension no longer opens an Express (Node.js) web server on localhost. In previous versions, attempting to access localhost could trigger a Windows firewall alert even though all script and stylesheet files were being served from the extension's local directory. All communication between the webview and the extension is now handled by passing messages rather than by posting to localhost.

This extension now supports the WebviewPanelSerializer interface for persisting previews and state data such as sort/filter criteria. In previous versions, CSV/Excel views were not displayed when VS Code was restarted, and it was necessary to reissue the `Open Preview` command.

Switching between tabs now preserves the scroll position and selected cells without reinitializing the preview.

Improved VS Code theme support. Gridlines now use a more subtle color, and the border is highlighted when the extension has focus.

## 2.1.35 (May 29, 2020)
Improved VS Code theme support.

Upgraded to use Wijmo build 5.20201.664.

## 2.1.34 (March 8, 2020)
Use current VS Code theme for styling preview grids (PR from @idanpa). Removed configuration setting `csv-preview.theme`.

## 2.1.33 (February 16, 2020)
Added support for VS Code Remote Development (PR from @chuxel).

## 2.1.32 (April 8, 2019)
Removed `copy-paste` package. No longer necessary, and removing it simplifies webpack bundle.

## 2.1.31 (April 7, 2019)
Fixed regression that caused error: `command 'csv-preview' not found`. (Pull request from @PKief).

## 2.1.30 (April 4, 2019)
Built with webpack bundling to reduce file size and load times.

## 2.1.29 (February 12, 2019)
Fixed bug where the `Open Preview` command was not available for non-workspace files.

Added key bindings for the `Open Preview` command (Windows/Linux: `Ctrl+Shift+V`, Mac: `Cmd+Shift+V`).

The `Open Preview` command now reopens an existing preview for a specific file, if available. Formerly, a duplicate preview was created.

Added documentation to the readme file to clarify the use of regular expression strings in configuration settings.

## 2.1.28 (January 24, 2019)
Changed the configuration option `csv-preview.lineNumbers` from a boolean to an enum:

Value | Description
----- | -----------
`none` | No line numbers are displayed. This is the default.
`ordinal` | Displays consecutive line numbers starting at 1.
`source` | Displays line numbers representing the original position of each data row.

Fixed bug where sort arrows were not displayed in column headers if `csv-preview.capitalizeHeaders` was set to true.

Empty names in the header row of a CSV file are now respected. Formerly, an auto-generated letter would be displayed.

Added `CSV: Refresh` command.

## 2.1.27 (January 23, 2019)
Upgraded to use Wijmo build 5.20183.567. This fixes the issue where the default theme did not have sufficient contrast for disabled filter icons.

Changed the configuration option `csv-preview.formatValues` from a boolean to an enum:

Value | Description
----- | -----------
`always` | All numeric values are formatted according to the `csv-preview.numberFormat` setting. This is the default.
`never` | All values are treated as strings, and no numeric formattng occurs.
`unquoted` | Numeric values are formatted, but only if they are not enclosed in quotes. If a column contains a mixture of quoted and unquoted values, the value in the first data row takes precedence.

> Since this change affects column properties, any persistent data for CSV files saved with earlier versions will be ignored.

Improved the parsing and display of delimited values with embedded newlines. Visible rows with multiline cells are now automatically resized. (Pull request from @fguchelaar).

The `Open Preview` command is now enabled when the language mode is changed to CSV or TSV. Formerly, the availability of this command was linked to the file extension. (Pull request from @ibraimgm).

Line number columns now auto-size to fit their content for CSV/Excel files, regardless of the `csv-preview.resizeColumns` setting.

Suppressed context menu in Excel previews.

## 2.1.26 (August 21, 2018)
Added the configuration option `csv-preview.openStdin` that specifies whether text piped to stdin is automatically opened as a CSV preview (default: false). Formerly, there was no way to turn off this feature, which was added in version 2.1.22.

## 2.1.25 (July 24, 2018)
Fixed issue where CSV files with Windows line endings (CR-LF) sometimes resulted in a blank preview.

Fixed issue where Ctrl+C (or Cmd+C) did not copy text to the clipboard on non-Windows platforms.

Added `Open Preview` command to the editor title context menu for CSV/Excel file types.

## 2.1.24 (June 21, 2018)
Fixed regression where the `CSV: Clear Preview State` command did not work in Excel previews.

## 2.1.23 (June 20, 2018)
Updated growl in package-lock.json.

## 2.1.22 (June 20, 2018)
Upgraded to use Wijmo build 5.20181.462.

The extension now uses the Webview API instead of the TextDocumentContentProvider model. For this reason, Visual Studio Code version 1.23.0 or later is required.

Added the configuration option `csv-preview.formatValues` that specifies whether to format numeric values in CSV files (default: true). If set to true, the option `csv-preview.numberFormat` controls how numeric values are formatted. If set to false, all values are treated as strings, and no numeric formatting occurs.

Added the configuration option `csv-preview.numberFormat` that specifies the .NET-style format string used to format numeric columns in CSV files (default: `g2`). For example, to display numbers with a thousands separator and four decimal places, use the value `n4`. Setting this option to an empty string reverts to the built-in behavior of the underlying FlexGrid control (`n` for integers, `n2` for floating point values).

> Since data types and format strings are persisted along with other column properties, you may need to run the `CSV: Clear Preview State` command to see the effects of changing the `csv-preview.formatValues` and `csv-preview.numberFormat` options.

The extension now respects the `CSV (semicolon)` and `CSV (pipe)` language ids contributed by the Rainbow CSV extension (`mechatroner.rainbow-csv`).

Added custom file extension support for CSV files. Run the built-in command `Change Language Mode` and select the `Configure File Extension` option to create a user setting that maps the current file extension to CSV or TSV. Alternatively, you can select the CSV or TSV language mode directly for the active editor only.

The command `CSV: Clear Preview State` now refreshes the preview immediately. Formerly, it was necessary to reopen the preview for the affected file to see the changes.

Trailing newlines are now ignored in CSV previews.

Command line programs that output CSV data can now be piped to Visual Studio Code, and the extension will automatically open a preview tab on the output. For example:

`ps -fc | awk '$1=$1' OFS=',' | code -`

## 2.0.21 (May 2, 2018)
Upgraded to use Wijmo build 5.20181.436.

Added support for the .tab file extension (like .csv except that a tab delimiter is assumed).

Fixed bug where the original CSV column order was not preserved in all cases.

Fixed bug where multiple CSV columns with the same name were ignored.

Added support for multiple column sorting in CSV previews. Hold down the Shift key while clicking a column header to specify additional sort criteria. Hold down the Ctrl key while clicking a previously sorted column header to remove all sort criteria.

CSV previews now handle numbers correctly when sorting and filtering. Values in numeric columns are now right-aligned.

For Excel files, the horizontal and vertical scroll bar positions are now persisted along with sort/filter criteria (for the selected sheet only). Formerly, only filter criteria were persisted.

Any tables within Excel files are now rendered using the built-in style `TableStyleMedium8` (to avoid conflicts with the setting `csv-preview.theme`).

Since this version contains bug fixes that depend upon revised column structure, any persistent data for CSV/Excel files saved with earlier versions will be ignored.

CSV previews now handle quoted strings as in Microsoft Excel. For example, if `csv-preview.quoteMark` is set to `"` (the default), then the following diagram depicts how quoted strings will be rendered (note that the surrounding quotes are not displayed):

CSV Value | Preview
--------- | -------
`"This word is ""quoted"" in preview."` | This word is "quoted" in preview.

## 2.0.20 (February 25, 2018)
Added the configuration option `csv-preview.lineNumbers` that lets you specify whether to display line numbers for CSV files (default: false).

Added two configuration options that let you exclude comment lines from the CSV preview. Use `csv-preview.commentCharacter` to specify the character used to mark comment lines (default: #). If the option `csv-preview.skipComments` is true (default: false), then lines that begin with the comment character will not be included in the preview. The comment character may be preceded by whitespace in the CSV file. To specify multiple comment characters, use a regular expression character set. For example, to use both % and @ as comment symbols, do this:

`"csv-preview.commentCharacter": "[%@]"`

Alternatively, to use C# or JavaScript style comments (`//`), do this:

`"csv-preview.commentCharacter": "/{2}"`

## 2.0.19 (February 22, 2018)
Improved regular expression parsing for CSV files with Windows line endings (CR/LF).

## 2.0.18 (February 21, 2018)
Fixed the initial scroll bar display for CSV and Excel files.

Improved regular expression parsing for CSV files, particularly for fields that are surrounded by delimiters but span multiple lines. Such fields are displayed on a single line in the preview, but are now parsed correctly.

Relaxed the restriction for CSV files that the first field on each line must be enclosed in quotes if the header row begins with a quote.

For CSV files, the horizontal and vertical scroll bar positions are now persisted along with column widths and sort/filter criteria.

Added support for the .tsv file extension (like .csv except that a tab delimiter is assumed).

For Excel files, the selected sheet index is now persisted along with filter criteria for that sheet only.

Added support for the .xlsm file extension (Excel file with macros, which the extension ignores).

Fixed bug which caused the error message: Cannot read property 'languageId' of undefined.

Upgraded to use Wijmo build 5.20173.409.

## 2.0.17 (January 12, 2018)
Excel preview now uses the ambient font instead of switching to Arial, if present.

Removed references to .xls files in the extension manifest and documentation. Only .xlsx files are supported.

## 2.0.16 (December 18, 2017)
The extension no longer relies upon the Wijmo CDN for external file references. This fixes issues where the extension would not run behind a firewall or proxy server.

When previewing a CSV file, the extension now validates any saved settings (column widths, sort/filter criteria) before applying them. If the number of columns or any individual column binding has changed, then any persistent user data is ignored. This fixes issues where newly added columns were not dislayed unless the `CSV: Clear Preview State` command was first run. This command is still useful for discarding persistent data when the column layout has not changed.

Fixed error: Cannot read property '_freezeHiddenRowCnt' of undefined. 

Upgraded to use Wijmo build 5.20173.380.

## 1.1.15 (May 2, 2017)
Fixed Excel preview bug where the A1 cell was always highlighted.

Upgraded to use Wijmo build 5.20171.282.

## 1.1.14 (April 28, 2017)
Added the configuration option `csv-preview.capitalizeHeaders` that lets you specify whether column headers in CSV files are capitalized (default: true).

Added the configuration option `csv-preview.resizeColumns` that lets you specify which columns (all, first, none) are automatically resized to fit the data for CSV files (default: none).

Added the `CSV: Clear Preview State` command that discards persistent user data for the current file. For CSV files, this includes column widths and sort/filter criteria. For Excel files, this includes filter criteria only. Reopen the preview for the affected file to see the changes.

## 1.1.13 (March 1, 2017)
Fixed CSV regression with quoted values containing the separator character.

## 1.1.12 (March 1, 2017)
Fixed issue with Windows line endings and quoted values where the last column in a CSV file was rendered with quote marks.

Fixed bug where quoted values containing newline characters caused improper rendering of the affected lines. Note that multiline values are now displayed on a single line without line breaks. However, the other columns are now rendered correctly.

Moved version history from `README.md` to `CHANGELOG.md`.

## 1.1.11 (February 9, 2017)
Added a dependency on Visual Studio Code 1.9.1, which fixes issues with blank previews.

Virtual documents now contain well-formed HTML tags.

## 1.1.10 (August 26, 2016)
CSV preview now persists column widths and sort/filter criteria.

Excel preview now supports filtering via its column headers. Filter criteria are persisted, but column widths are not.

Upgraded to use Wijmo build 5.20162.198.

## 1.1.9 (July 25, 2016)
Fixed bug where the CSV preview did not update automatically when the associated text document was saved. For best results, the `files.autoSave` setting should be set to either `off` (the default) or `onFocusChange`.

Fixed bug where the CSV/Excel preview was always displayed in the left editor group, even if the active document was in the center or right group.

All open CSV/Excel previews now update automatically when the configuration settings are saved. Formerly, an explicit `Reload Window` command was required.

## 1.1.8 (July 14, 2016)
This version requires Visual Studio Code 1.3 or greater.

Fixed grid control layout issues that first surfaced in Visual Studio Code 1.3.

Renamed `Preview File` commands to `Open Preview` for consistency with the intrinsic Markdown extension.

CSV preview commands are now available in explorer context menus and editor title menus. This applies to files with .csv extensions only. To preview plain text files with different extensions, open the file in an editor, then execute the `CSV: Open Preview` command from the command palette.

Excel preview commands are now available in explorer context menus and editor title menus. This applies to files with .xls and .xlsx extensions only. Since Visual Studio Code extensions can now contribute menu commands to the standard interface, executing the `Excel: Open Preview` command from the command palette no longer presents a dropdown list of Excel files.

Removed unnecessary vertical scroll bar.

Upgraded to use Wijmo build 5.20162.188.

## 1.0.7 (June 13, 2016)
CSV files with double-byte characters are now handled correctly.

## 1.0.6 (June 7, 2016)
Relaxed the restriction that CSV files must have a .csv extension. The `CSV: Preview File` command now works with any plain text file.

Added the configuration option `csv-preview.quoteMark` that lets you specify the optional character used to surround individual data values in a CSV file (default: double-quote).

Added the configuration option `csv-preview.hasHeaders` that lets you specify whether the first row in a CSV file represents column headers (default: true).

Added enumerated values for the `csv-preview.theme` configuration option.

## 1.0.5 (June 2, 2016)
Fixed local path issues that prevented Excel files from being opened on Windows. If you downloaded an earlier version, please upgrade to version 1.0.5 or later.

@kmp1 added the configuration option `csv-preview.separator` that lets you specify the separator used when reading CSV files (default: comma).
