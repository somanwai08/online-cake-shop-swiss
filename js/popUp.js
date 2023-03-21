const toastLiveExample = document.getElementById('liveToast')
const quan = document.querySelector('[type=text]')
const body = document.querySelector('.toast-body')
const modalTitle = document.querySelector('.me-auto')

function popUp(content, titleText) {
  modalTitle.innerHTML = titleText
  body.innerHTML = content
  const toast = new bootstrap.Toast(toastLiveExample)

  toast.show()
}
