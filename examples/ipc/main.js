const { BrowserWindow, ipcMain } = require('electron')
const Registry = require('winreg') // winreg must be added as a dependency

/**
 * in a real app IPC_MESSAGE constants should be stored in a common location
 * that both main and renderer have access to
 */

/**
 * add a unique prefix to ensure IPC messages defined here do not conflict
 * with others added by the app
 */
const PREFIX = 'rbbnCitrixWebrtc-'

const IPC_MESSAGES = {
  GET_REDIRECTION_VALUE: `${PREFIX}getRedirectionValue`,
  GET_WINDOW_HANDLE: `${PREFIX}getWindowHandle`
}

ipcMain.handle(
  IPC_MESSAGES.GET_REDIRECTION_VALUE,
  () =>
    new Promise(resolve => {
      Registry({
        hive: Registry.HKCU,
        key: '\\SOFTWARE\\Citrix\\HDXMediaStream'
      }).values((error, items) => {
        let result = ''

        if (!error && Array.isArray(items)) {
          const regEntry = items.find(item => item.name === 'MSTeamsRedirSupport') || {}
          if ('value' in regEntry) result = Number(regEntry.value)
        }

        resolve(result)
      })
    })
)

ipcMain.handle(IPC_MESSAGES.GET_WINDOW_HANDLE, ({ sender }) =>
  BrowserWindow.fromWebContents(sender).getNativeWindowHandle().hexSlice()
)
