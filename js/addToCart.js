let carList = [
  { id: '鄉村檸檬乳酪塔', quantity: 0, pic: 'cake01.jpg', netprice: 75 },
  { id: '精緻手工巧克蛋糕', quantity: 0, pic: 'cake02.jpg', netprice: 75 },
  { id: '限量莓果乳酪蛋糕', quantity: 0, pic: 'cake03.jpg', netprice: 75 },
  { id: '法式藍莓蛋糕', quantity: 0, pic: 'cake04.jpg', netprice: 75 },
]

const toastTrigger = document.getElementById('liveToastBtn')
const title = document.querySelector('.title')
//   檢查是否有本地存儲cart
if (!localStorage.getItem('cart')) {
  // 沒有本地存儲則把carList存到本地存儲
  localStorage.setItem('cart', JSON.stringify(carList))
} else {
  // 有本地存儲，則更新carList和本地存儲一致
  carList = JSON.parse(localStorage.getItem('cart'))
  console.log(carList, 'hey')
}
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    if (quan.value >= 1 && quan.value % 1 === 0) {
      // 輕提示
      popUp('成功添加到購物車，感謝你的選購！', '謝謝！')
      // 更改本地存儲內容
      // title.innerHTML===蛋糕名字
      // 尋找carList中，id等於蛋糕的名字的項的下標
      let i = carList.findIndex((item) => item.id === title.innerHTML)

      //   讓該項的數量增加
      carList[i].quantity += parseInt(quan.value)
      console.log(carList)
      // 把carList存到本地存儲
      localStorage.setItem('cart', JSON.stringify(carList))
    } else if (!quan.value) {
      popUp('請輸入數量！', '不好意思~~~')
    } else {
      popUp('請輸入正確的數量', '對不起，你想買多少片啊？')
    }
  })
}
