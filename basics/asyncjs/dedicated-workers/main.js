// 主线程

// Workers 和主代码运行在完全分离的环境中，只有通过相互发送消息来进行交互。
// 特别是，这意味着 workers 不能访问 DOM（窗口、文档、页面元素等等）。

// worker 有三种：专用 worker、共享 worker、service worker

// 创建专用 worker，当 worker 被创建时，generate.js 将被执行
// 需要在服务器上运行，否则会报错，详见：
// https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server
const worker = new Worker('./generate.js');

// 向 worker 发送消息
// worker.postMessage({command: 'hello'});

// 接收 worker 发送过来的消息
worker.addEventListener('message', (message) => {
  // 更新 UI
  console.log(`thread message ${JSON.stringify(message.data)} -> ${typeof message.data}`);

  if (typeof message.data === 'object') {
    const output = document.getElementById('output');
    output.textContent = `生成了 ${message.data.length} 个质数`
    const detail = document.getElementById('user-input');
    detail.textContent = JSON.stringify(message.data);
  }
});

document.getElementById('btn_test').addEventListener('click', () => {
  // 向 worker 发送消息
  worker.postMessage({thread: 'main', command: 'hello'});
});

const quota = document.getElementById('quota');

document.getElementById('generate').addEventListener('click', () => {
  worker.postMessage({
    command: 'generate', quota: quota.value,
  });
});