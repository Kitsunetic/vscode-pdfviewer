# pdf

Display pdf in VSCode.

## Fork changes

### Stable reloads during incremental PDF writes

When a PDF is rewritten in several chunks (for example, during a LaTeX build),
this fork waits 300 ms after the last file-change event before reloading the
viewer. This coalesces bursts of filesystem notifications into one reload and
prevents the viewer from repeatedly reloading partially written PDFs.

Download a `.vsix` from this fork's [Releases](https://github.com/Kitsunetic/vscode-pdfviewer/releases)
and install it in VS Code with **Extensions: Install from VSIX...**. It keeps
the original extension identifier so it replaces the marketplace version.

![screenshot](https://user-images.githubusercontent.com/3643499/84454816-98fcd600-ac96-11ea-822c-3ae1e1599a13.gif)

## Contribute

### Upgrade PDF.js

1. Download latest [Prebuilt(older browsers)](https://mozilla.github.io/pdf.js/getting_started/#download).
1. Extract the ZIP file.
1. Overwrite ./lib/* by extracted directories.
   - If lib/web/viewer.html has changes, apply these changes to HTML template at pdfPreview.ts.
1. To not use sample pdf.
  - Remove sample pdf called `compressed.tracemonkey-pldi-09.pdf`.
  - Remove code about using sample pdf from lib/web/viewer.js.
    ```js
    defaultUrl: {
      value: "", // "compressed.tracemonkey-pldi-09.pdf"
      kind: OptionKind.VIEWER
    },
    ```

## Change log
See [CHANGELOG.md](CHANGELOG.md).

## License
Please see [LICENSE](./LICENSE)
