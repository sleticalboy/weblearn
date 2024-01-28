const squareNumber = document.querySelector("#number3");
const result2 = document.querySelector(".result2");

// 浏览器兼容性
if (!!window.SharedWorker) {
  const worker = new SharedWorker('./worker.js');
  squareNumber.onchange = () => {
    worker.port.postMessage([squareNumber.value, squareNumber.value]);
    console.log("Message posted to worker at square.js");
  };
  worker.port.onmessage = (msg) => {
    result2.textContent = msg.data;
    console.log("Message received from worker at square.js");
  };
}