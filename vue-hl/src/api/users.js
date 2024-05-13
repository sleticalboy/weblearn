const mockSettings = {
    data: {
        user: 'admin',
        role: 'admin',
        // date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }); // 2023/2/16 上午8:25:05
        login_time: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
        settings: [
            {
                key: 'profile',
                desc: '用户中心',
            },
            {
                key: 'settings',
                desc: '设置',
            },
            {
                key: 'theme',
                desc: '主题',
            },
        ]
    }
}

const mock = true

function login(params) {
    return new Promise((resolve, reject) => {
        fetch('/api/v1/user/login').then(r => {
            console.log(`login() ${r.statusText} ${r.status}`)
            return r.json()
        }).then(r => resolve(r)).catch(reason => {
            if (params.username === 'admin' && params.password === '123456') {
                return resolve({})
            }
            reject(reason)
        })
    })
}

function logout() {
    return new Promise((resolve) => {
        fetch('/api/v1/user/logout', {method: 'DELETE'}).then(r => {
            console.log(`logout() ${r.statusText} ${r.status}`)
            if (r.ok) {
                resolve('ok')
            } else {
                resolve(r.statusText)
            }
        })
    })
}

function settings() {
    return new Promise((resolve, reject) => {
        fetch('/api/v1/user/settings').then(r => {
            console.log(`settings() ${r.statusText} ${r.status}`)
            return r.json()
        }).then(r => resolve(r)).catch(reason => {
            console.log(`settings() mock: ${mock}, reason: ${reason}`)
            if (mock) {
                resolve(mockSettings)
            } else {
                reject(reason)
            }
        })
    })
}

export {
    login,
    logout,
    settings,
};