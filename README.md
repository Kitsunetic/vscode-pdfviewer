# pdf

Display pdf in VSCode.

## Fork changes

### Stable reloads during incremental PDF writes

This fork addresses a temporary VS Code freeze that can occur when an open PDF
is repeatedly updated during a LaTeX build. A single compilation may rewrite
the PDF in several chunks, producing a burst of filesystem change events; the
original extension reloaded the viewer for every event, including partially
written files. This fork debounces those events by waiting 300 ms after the
last change before reloading. As a result, each burst of incremental PDF writes
produces one settled reload instead of repeatedly interrupting the viewer
during compilation.

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
