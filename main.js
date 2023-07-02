// Modules
const {app, BrowserWindow, webContents} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    x: 100, y: 100,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // Load index.html into the new BrowserWindow
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://httpbin.org/basic-auth/user/passwd')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  let wc = mainWindow.webContents

//  wc.on('did-finish-load', ()=>{
//   console.log('finished loading')
//  })

//  wc.on('dom-ready', ()=>{
//   console.log('DOM ready')
//  })

//  wc.on('new-window', (e, url)=>{
//   e.preventDefault()
//   console.log(`creating a new window for url: ${url}`)
//  })

wc.on('login', (e, request, authInfo, callback) =>{
  console.log('logging in')
  callback('user','passwd')
})

wc.on('did-navigate', (e, url, statusCode, message)=>{

    console.log(`navigated to ${url}`)
    console.log(statusCode, message)
   })
  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
