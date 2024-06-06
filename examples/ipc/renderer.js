const { contextBridge, ipcRenderer } = require('electron')

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

contextBridge.exposeInMainWorld('rbbn', {
  getRedirectionValue: () => ipcRenderer.invoke(IPC_MESSAGES.GET_REDIRECTION_VALUE),
  getWindowHandle: () => ipcRenderer.invoke(IPC_MESSAGES.GET_WINDOW_HANDLE)
})
