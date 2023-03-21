const toastTrigger = document.getElementById('liveToastBtn')
const title = document.querySelector('.title')
// const quan = document.querySelector('[type=text]')

if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    if (quan.value >= 1 && quan.value % 1 === 0) {
      // 輕提示
      popUp('成功添加到購物車，感謝你的選購！', '謝謝！')
      // 更改本地存儲內容
      // 如果本地存儲沒有內容，就添加內容，鍵是cart，值是一個JSon字符串
      // 這個JSon字符串是是透過一個cartList對象轉換過來的
      let cartList = {
        鄉村檸檬乳酪塔: 0,
        精緻手工巧克蛋糕: 0,
        限量莓果乳酪蛋糕: 0,
        法式藍莓蛋糕: 0,
      }
      if (!localStorage.getItem('cart')) {
        // 讓對象的屬性名等於蛋糕的名字
        let key = title.innerHTML
        // 往對象裡面追加屬性名和數量
        cartList[key] = parseInt(quan.value)
        // console.log(cartList)
        JSON.stringify(cartList)
        // console.log(JSON.stringify(cartList))
        // 然後修改本地存儲
        localStorage.setItem('cart', JSON.stringify(cartList))
      } else {
        // 如果本地存儲有內容，把JSON字符串轉化為對象，賦值給carList
        cartList = JSON.parse(localStorage.getItem('cart'))
        // console.log(cartList)
        // 就是要看carList的屬性值，是否有等於title.innerHTML的
        for (let k in cartList) {
          // 如果有carList的屬性值有等於title.innerHTML的
          if (k === title.innerHTML) {
            // carList先更新一下，確保和本地存儲數據一樣
            cartList = JSON.parse(localStorage.getItem('cart'))
            // 那麼該屬性的值就要加上新添加的數量
            cartList[k] += parseInt(quan.value)
            console.log(JSON.stringify(cartList), 'json')
            // 然後修改本地存儲
            localStorage.setItem('cart', JSON.stringify(cartList))
          }
          //    else {
          //     // 如果有carList的屬性值沒有等於title.innerHTML的
          //     // 往對象裡面追加屬性名和數量
          //     cartList[title.innerHTML] = parseInt(quan.value)
          //     // 然後修改本地存儲
          //     localStorage.setItem('cart', JSON.stringify(cartList))
          //   }
        }
      }
    } else if (!quan.value) {
      popUp('請輸入數量！', '不好意思~~~')
    } else {
      popUp('請輸入正確的數量', '對不起，你想買多少片啊？')
    }
  })
}
