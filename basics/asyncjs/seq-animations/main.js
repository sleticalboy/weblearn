const aliceThumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];
const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards',
};

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

async function startAnimating(element) {
  return element.animate(aliceThumbling, aliceTiming).finished;
}

// 方式一：采用回调地狱实现

// 方式二：
startAnimating(alice1)
  .then(() => startAnimating(alice2))
  .then(() => startAnimating(alice3))
  .catch((error) => console.log(`动画发生错误：${error}`));

// 方式三：async + await
(async function() {
  for (const alice of [alice1, alice2, alice3]) {
    await startAnimating(alice);
  }
  console.log('start all');
}());
