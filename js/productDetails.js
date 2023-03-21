const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
const quan = document.querySelector('[type=text]')
const body = document.querySelector('.toast-body')
const title = document.querySelector('.me-auto')

function popUp(content, titleText) {
  title.innerHTML = titleText
  body.innerHTML = content
  const toast = new bootstrap.Toast(toastLiveExample)

  toast.show()
}

if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    if (quan.value >= 1 && quan.value % 1 === 0) {
      // 輕提示
      popUp('成功添加到購物車，感謝你的選購！', '謝謝！')
      // 更改本地存儲內容
    } else if (!quan.value) {
      popUp('請輸入數量！', '不好意思~~~')
    } else {
      popUp('請輸入正確的數量', '對不起，你想買多少片啊？')
    }
  })
}
