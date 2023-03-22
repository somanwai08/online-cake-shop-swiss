// 獲取元素

let tbody = document.querySelector('tbody')
let totalPrice = document.querySelector('.totalPrice')
const checkAllS = document.querySelector('#checkAllS')
let data = JSON.parse(localStorage.getItem('cart'))

// 渲染函數
function render() {
  //  渲染的時候，本地存儲中數量為0的蛋糕不應該被渲染
  // 因此應該用一個新數組，叫做deletedData，來接收數量不為0的蛋糕數據
  const deletedData = data.filter((item) => item.quantity != 0)
  const newData = deletedData.map(
    (item) =>
      `<tr>
    <th scope="row" class="col-md-1 text-center align-middle">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckChecked"
        data-id=${item.id}
        ${item.checked === true ? 'checked' : ''}
      />
    </th>
    <td class="col-md-7">
      <div class="card border-0">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="./images/${item.pic}"
              class="img-fluid"
              alt="..."
            />
          </div>
          <div class="col-md-8 align-items-center d-flex">
            <div class="card-body">
              <h5 class="card-title">${item.id}</h5>
            </div>
          </div>
        </div>
      </div>
    </td>
    <td class="col-md-1 align-middle">
      $<span class="netPrice">75</span>
    </td>
    <td class="col-md-1">
      <div class="d-flex quantity mt-4">
        <input
          class="border add a"
          type="button"
          value="+"
          id=${item.id}
        />
        <input
          class="border text-center quan"
          type="text"
          id="total"
          value=${item.quantity}
          readonly
        />

        <input
          class="border reduce"
          type="button"
          value="-"
          id=${item.id}
          ${item.quantity <= 1 ? 'disabled' : ''}
        />
      </div>
    </td>
    <td class="col-md-1 align-middle subTotal">${
      item.quantity * item.netprice
    }</td>
    <td class="col-md-1 align-middle del" data-id=${item.id}>
      刪除
    </td>
  </tr>`
  )
  tbody.innerHTML = newData.join('')
}

// 計算總價函數
function getTotalPrice(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].quantity * arr[i].netprice
  }
  return sum
}

// 一打開頁面，首先要渲染購物車內容
render()
// 同時要顯示總價
totalPrice.innerHTML = getTotalPrice(data)

tbody.addEventListener('click', function (e) {
  // 加減功能
  if (e.target.tagName === 'INPUT') {
    if (e.target.classList.contains('add')) {
      //e.target.id===蛋糕名稱
      //   找到data中，item.id===e.target.id的那一項的下標
      let i = data.findIndex((item) => item.id === e.target.id)
      // 讓該項的數量自增
      data[i].quantity++
    } else if (e.target.classList.contains('reduce')) {
      // console.log(e.target.id) e.target.id===蛋糕名稱
      //   找到data中，item.id===e.target.id的那一項的下標
      let i = data.findIndex((item) => item.id === e.target.id)
      // 讓該項的數量自減
      data[i].quantity--
    }
  }

  // 右側刪除按鈕功能
  if (e.target.classList.contains('del')) {
    // e.target.dataset 是點中的刪除按鈕對應的蛋糕名稱
    // 如果點擊了某款蛋糕的刪除按鈕，該款蛋糕的數量應該設置為0
    // 找到data中，id等於被刪除蛋糕名稱的項的下標
    let index1 = data.findIndex((item) => item.id === e.target.dataset.id)
    data[index1].quantity = 0
  }

  // 單選功能
  if (e.target.classList.contains('form-check-input')) {
    // e.target.dataset 是點中的checkbox對應的蛋糕名稱
    // 如果點擊了某款蛋糕的單選按鈕，該款蛋糕的checked狀態應該取反
    let index1 = data.findIndex((item) => item.id === e.target.dataset.id)
    data[index1].checked = !data[index1].checked
    let checkedNum = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].checked === true) checkedNum++
    }
    // 如果所有单选项都勾选，全选项也要勾上
    checkAllS.checked = checkedNum === 4
    // 當全選框選上，文字就切換成'取消'
    document.querySelector('.checkAllTitle').innerHTML =
      checkAllS.checked === true ? '取消' : '全選'
  }

  // 更新本地存儲內容
  localStorage.setItem('cart', JSON.stringify(data))
  // 更新總價
  totalPrice.innerHTML = getTotalPrice(data)
  //   重新渲染
  render()
})

// 全選功能----每次進入頁面都要看看是否每項蛋糕都被勾選上
// 若勾選上，就要打鉤
function checkAll() {
  let checkedNum = 0

  for (let i = 0; i < data.length; i++) {
    if (data[i].checked === true) checkedNum++
  }

  checkAllS.checked = checkedNum === 4
  document.querySelector('.checkAllTitle').innerHTML =
    checkedNum === 4 ? '取消' : '全選'
}

checkAll()

// 如果全選按鈕被點擊，全選按鈕狀態取反。此時有兩種可能
//  可能一：全選按鈕false->true，就是checkAllS.checked=true，那麼data裡面每一項對象的checked都改為true
//  可能二：全選按鈕true->false,就是checkAllS.checked=false，那麼data裡面每一個對象的checked都改為false

checkAllS.addEventListener('click', function () {
  if (checkAllS.checked === true) {
    for (let i = 0; i < data.length; i++) {
      data[i].checked = true
    }
    // 當全選框選上，文字就切換成'取消'
    document.querySelector('.checkAllTitle').innerHTML = '取消'
  } else {
    for (let i = 0; i < data.length; i++) {
      data[i].checked = false
    }
    // 當全選框選上，文字就切換成'取消'
    document.querySelector('.checkAllTitle').innerHTML = '全選'
  }
  // 更新本地存儲內容
  localStorage.setItem('cart', JSON.stringify(data))
  render()
})

// 點擊‘刪除選中項目’按鈕功能
document.querySelector('.delSelected').addEventListener('click', function () {
  //  點擊的時候，data中checked是true的對象，數量要變為0
  for (let i = 0; i < data.length; i++) {
    if (data[i].checked === true) data[i].quantity = 0
  }
  // 更新本地存儲內容
  localStorage.setItem('cart', JSON.stringify(data))
  render()
})
