addEventListener('connect', (e) => {
  const port = e.ports[0];
  port.addEventListener('message', (msg) => {
    console.log(`Receive message: ${JSON.stringify(msg.data, null, 2)}`);
    const result = `结果: ${msg.data[0] * msg.data[1]}`;
    port.postMessage(result);
  });
  // 如果通过 addEventListener 的方式，则需要调用 start 方法，否则不用
  port.start();
});