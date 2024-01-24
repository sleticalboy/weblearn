let targetNum;
let guessNum;
let lastNum;
let againBtn = null;
let counter = 1;

const input = document.querySelector('#guess');
const prev = document.querySelector('#prev');
const judge = document.querySelector('#judge');
const prompt = document.querySelector('#prompt');
document.querySelector('#submit').addEventListener('click', comapre);

function prepare(reset = false) {
  prev.innerText = '';
  judge.innerText = '';
  guessNum = NaN;
  targetNum = Math.floor(Math.random() * 100) + 1;
  console.log('target num is: ', targetNum);
  if (reset === true) {
    // 重置游戏
    againBtn = document.createElement('button');
    againBtn.textContent = '重新开始';
    againBtn.addEventListener('click', () => prepare());
    document.body.appendChild(againBtn)
  } else {
    prompt.innerText = ''
    if (againBtn) {
      againBtn.parentNode.removeChild(againBtn);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => prepare());

function update(less) {
  if (prev.innerText === '') {
    prev.innerText = `上一个数字： ${lastNum}`;
  } else {
    prev.innerText += ', ' + lastNum;
  }
  prompt.style.backgroundColor = 'red';
  if (less) {
    prompt.innerText = '太小了';
  } else {
    prompt.innerText = '太大了';
  }
}

function comapre() {
  if (counter > 10) {
    prompt.innerText = '超过 10 次，失败！';
    prompt.style.backgroundColor = 'red';
    prepare(true);
    return;
  }
  guessNum = Number(input.value)
  console.log('guess num is: ', guessNum);
  input.value = ''
  lastNum = guessNum;
  counter += 1;
  if (guessNum === targetNum) {
    // 猜对了
    prompt.innerText = '恭喜你，猜对了！';
    prompt.style.backgroundColor = 'green';
    prepare(true);
  } else {
    update(guessNum < targetNum)
  }
}