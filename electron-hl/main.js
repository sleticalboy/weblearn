const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const userInfo = require('node:os').userInfo()

// 主窗口
let win

// 创建主窗口
const createWindow = () => {
    win = new BrowserWindow({
        width: 600, height: 400,
        resizable: true,
        minimizable: true,
        maximizable: true,
        show: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // 使用 sandbox: false 选项来针对每个进程禁用渲染器沙盒
            sandbox: false,
            // 在渲染器中启用 nodeIntegration 时，沙盒也会被禁用
            nodeIntegration: true,
        }
    })
    win.loadFile('index.html').then(r => {
        console.log(`window loaded: ${r}`);
    })
    // 打开开发者工具
    // win.webContents.openDevTools()
}

// --no-sandbox 禁用 Chromium 沙盒。 强制渲染器进程和 Chromium 助手进程以非沙盒化运行
// 全局启用沙盒，必须在 ready 之前调用
app.enableSandbox()
app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', openFileHandler)
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    lsHome()
    testDownload()
})

// 当所有窗口关闭时退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 打开文件选择器
async function openFileHandler() {
    const {canceled, filePaths} = await dialog.showOpenDialog(win, {
        title: '选择配置文件 gui-config.json',
        defaultPath: userInfo.homedir,
        filters: [
            {
                extensions: '*.json', name: 'gui-config'
            }
        ],
        properties: ['openFile', 'showHiddenFiles']
    })
    console.log(`open file: ${filePaths}`)
    if (canceled) {
        console.log('choose canceled!')
        return null
    }
    return filePaths[0];
}

// 使用子进程模块
function lsHome() {
    const _cp = require('node:child_process')
    const ls = _cp.exec(`ls ${userInfo.homedir + '/code'} -alh`, (error, stdout, stderr) => {
        console.log(`ls home result: ${stdout.trim()}, err: ${stderr.trim()}`)
    }).on('close', () => {
        console.log(`exit with: ${ls.exitCode}`)
    })
}

function testDownload() {
    const {downloadPac} = require('./src/network')
    downloadPac(false).then(result => {
        console.log(`result is ${result}`)
    }).catch(err => {
        console.log(`err is ${err}`)
    })
}