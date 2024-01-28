const first = document.querySelector("#number1");
const second = document.querySelector("#number2");
const result1 = document.querySelector(".result1");

console.log(`shared worker -> ${window.SharedWorker}`);

if (window.SharedWorker) {
  const worker = new SharedWorker('./worker.js');

  console.log(`worker port -> ${worker.port}`);

  first.onchange = () => {
    worker.port.postMessage([first.value, second.value]);
    console.log("Message posted to worker at multiply.js first");
  };
  second.onchange = () => {
    worker.port.postMessage([first.value, second.value]);
    console.log("Message posted to worker at multiply.js second");
  };

  worker.port.onmessage = (msg) => {
    result1.textContent = msg.data;
    console.log("Message received from worker at multiply.js");
    console.log(msg.lastEventId);
  };

  // 如果通过 addEventListener 的方式，则需要调用 start 方法，否则不用
  worker.port.start();
}