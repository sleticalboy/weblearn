// worker 线程

// 接收主线程发来的消息
addEventListener('message', async (message) => {
  // 根据消息类型进行处理
  console.log(`main message ${JSON.stringify(message.data)}`);

  if (message.data.command === 'generate') {
    const primes = generatePrimes(message.data.quota);
    postMessage(primes);
    return;
  }

  // 延时向主线程发送消息
  // 方式一：
  // setTimeout(() => {
  //   postMessage(Object.assign({}, message.data, { 'thread': 'worker' }));
  // }, 1500);
  // 方式二：
  // new Promise(resolve => setTimeout(resolve, 500)).then(() => {
  //   // 浅拷贝：.../Object.assign()
  //   // 深拷贝：JSON.parse(JSON.stringify(message.data))
  //   postMessage(Object.assign({}, message.data, { 'thread': 'worker' }));
  // });
  // 方式三：
  await sleep(500);
  postMessage(Object.assign({}, message.data, { 'thread': 'worker' }));
  await sleep(1500);
  postMessage(100);
});

async function sleep(delay) {
  return new Promise(r => setTimeout(r, delay));
}

// 生成质数
function generatePrimes(quota) {
  function _test(n) {
    for (let c = 2; c <= Math.sqrt(n); ++c) {
      if (n % c === 0) {
        return false;
      }
    }
    return true;
  }
  const primes = [];
  const max = 1000000;
  while (primes.length < quota) {
    const tmp = Math.floor(Math.random() * (max + 1));
    if (_test(tmp)) {
      primes.push(tmp);
    }
  }
  return primes;
}