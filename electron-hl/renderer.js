const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

// 占位符
window.electronApi = undefined;

btn.addEventListener('click', async () => {
    console.log(`electron api: ${window.electronApi}`)
    filePathElement.innerText = await window.electronApi.openFile()
})