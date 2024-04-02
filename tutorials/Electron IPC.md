[COPYRIGHT © 2024 RIBBON COMMUNICATIONS OPERATING COMPANY, INC. ALL RIGHTS RESERVED]: #

# IPC

When used in [Electron](https://www.electronjs.org/), this SDK must communicate between Electron's [Renderer process](https://www.electronjs.org/docs/latest/glossary#renderer-process) where it runs and the [Main process](https://www.electronjs.org/docs/latest/glossary#main-process).

Electron provides APIs to enable this interprocess communication (aka IPC) and this SDK includes JavaScript modules that implement all IPC communication that it requires. It's recommended that you use the modules provided by this SDK in your app.

If Electron's security features such as [contextIsolation](https://www.electronjs.org/docs/latest/tutorial/security#3-enable-context-isolation) are enabled in your app, they may prevent you from using the modules provided. In that case, the raw code is provided to copy and paste into your app.

## Enabling IPC in the Main process

All that's required in order to enable IPC messaging required by this SDK is to include the following `require` statement anywhere in your Electron main process code:

`require('@rbbn/citrix-webrtc-sdk/preload/main')`

This is required regardless of how IPC is enabled in the Renderer process.

[Code](link TBD)

## Enabling IPC in the Renderer process

Achieving the correct IPC configuration for the renderer differs slightly depending on whether contextIsolation is being used or not.

If contextIsolation is **not** in use, no further changes are required.

### If contextIsolation is in use

If your Electron app is making use of Electron's contextIsolation security feature, then you will already be specifying a preload script in the `new BrowserWindow` options object, something like:

```
// Electron main process

const { BrowserWindow } = require('electron')
const path = require('path')

const mainWindow = new BrowserWindow({
  height: ...,
  width: ...,
  ...
  webPreferences: {
    contextIsolation: true,
    preload: path.join(__dirname, './preload.js'),
    ...
  }
})
```

The easiest way to include this SDK's preload script for the renderer is simply to require it within your preload script:

```
// your preload.js

const { contextBridge, ipcRenderer, ... } = require('electron')

// require this SDK's renderer preload script
require('@rbbn/citrix-webrtc-sdk/preload/renderer')

contextBridge.exposeInMainWorld(...)
```

However, some versions of Electron only allow [very specific things](https://www.electronjs.org/docs/latest/tutorial/sandbox#preload-scripts) to be `require`'d in a preload script, which may prevent you from doing this. Setting either `sandox: false` or `nodeIntegration: true` in the BrowserWindow webPreferences object may workaround this limitation. Both of these settings have their intended uses, and changing their values will have security implications for your app, and so their documentation should be reviewed before making these changes. If you choose not to implement either of these settings, copy and paste the contents of this SDK's [preload/renderer script](link TBD) into your own preload.js.

