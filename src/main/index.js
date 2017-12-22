'use strict'

import { app, BrowserWindow, Menu, ipcMain } from 'electron'

const path = require('path')
const settings = require('electron-settings')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  let windowConfig = {}

  if (settings.has('windowState')) {
    windowConfig = Object.assign({}, windowConfig, settings.get('windowState'))
  } else {
    settings.set('windowState', {
      height: 800,
      width: 600,
      useContentSize: true,
      show: false,
      minWidth: 800,
      minHeight: 600,
      maxHeight: 800,
      maxWidth: 600,
      x: undefined,
      y: undefined
    })
  }

  windowConfig.icon = path.join(__dirname, '/assets/256x256.png')
  windowConfig.frame = false
  windowConfig.resizable = false
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow(windowConfig)

  mainWindow.loadURL(winURL)
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(createMenuOnMac())
  } else {
    mainWindow.setMenu(null)
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.on('resize', () => saveWindowState(mainWindow))
  mainWindow.on('move', () => saveWindowState(mainWindow))
  mainWindow.on('close', () => saveWindowState(mainWindow))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function saveWindowState (mainWindow) {
  const currState = settings.get('windowState')
  const bounds = mainWindow.getBounds()
  settings.set('windowState', Object.assign({}, currState, bounds))
}

function createMenuOnMac () {
  return Menu.buildFromTemplate([
    {
      label: app.getName(),
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'},
        {role: 'quit'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'}
      ]
    }
  ])
}

ipcMain.on('min', e => mainWindow.minimize())
ipcMain.on('max', e => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})
ipcMain.on('close', e => mainWindow.close())

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
