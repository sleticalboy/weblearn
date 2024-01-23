// 向 dom 中追加子元素
function createParagraph(e) {
  console.log(JSON.stringify(e.srcElement));
  const pp = document.createElement('p');
  var text = ''
  if (e.srcElement) {
    text = e.srcElement.innerText
  }
  pp.textContent = `你点击了 '${text}'`;
  document.body.appendChild(pp);
  document.body.appendChild(document.createElement('br'))
}

document.addEventListener('DOMContentLoaded', () => {
  // 选中所有的按钮
  for (const btn of document.querySelectorAll('button')) {
    btn.addEventListener('click', createParagraph);
  }
});