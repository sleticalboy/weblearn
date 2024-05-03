/** 下载 pac 文件 */
async function downloadPac(force = false) {
    // 不挂代理的情况下下载不到这个文件
    // 重新实现：更新 git 项目、执行脚本
    const testDir = '/home/binlee/code/weblearn/electron-hl/testdata'
    const pacPath = testDir + '/pac.txt'
    const _fs = require('fs-extra')
    if (force || !_fs.pathExistsSync(pacPath)) {
        console.log('start download pac.txt to ' + pacPath)
        const _url = 'https://raw.githubusercontent.com/shadowsocksrr/pac.txt/pac/pac.txt'
        return new Promise((resolve, reject) => {
            const {net} = require('electron')
            net.fetch(_url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`)
                    }
                    return response.text()
                }).then(buf => _fs.writeFile(pacPath, buf))
                .then(_ => resolve(pacPath))
                .catch(err => {
                    // 发生错误， 重试
                    console.error(err)
                    console.error(`download via http failed: ${err}`)
                    const _path = require('path')
                    const _scriptDir = _path.join(testDir, 'gfwlist')
                    const _cp = require('child_process')
                    if (!_fs.pathExistsSync(_scriptDir)) {
                        // clone 工程
                        const _cmd = `cd ${testDir} && git clone --depth=1 git@github.com:gfwlist/gfwlist.git`
                        _cp.exec(_cmd, (error, stdout, stderr) => {
                            if (error) {
                                reject(error)
                            }
                            console.log(`git clone result: ${stdout.trim()}, err: ${stderr.trim()}`)
                        })
                        _cp.spawn('').on('close', (code, signal) => {
                        })
                    }
                    const _cmd = `cd ${_scriptDir} && bash update_pac.sh && cp pac.txt ${pacPath}`
                    _cp.exec(_cmd, (error, stdout, stderr) => {
                        if (error) {
                            reject(error)
                        }
                        console.log(`update pac result: ${stdout.trim()}, err: ${stderr.trim()}`)
                    })
                })
        })
    }
    // 读取 pac 文件内容
    return Promise.resolve(pacPath)
}

module.exports = {downloadPac}