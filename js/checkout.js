// 計算總價函數
function getTotalPrice(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].quantity * arr[i].netprice
  }
  return sum
}

// 渲染賬目明細

const ul = document.querySelector('.list-group')

function render() {
  // 獲取本地存儲資料，轉成數組並存入data
  const data = JSON.parse(localStorage.getItem('cart'))
  //   過濾掉data數組中，數量為0的項
  const filteredData = data.filter((item) => item.quantity != 0)
  //   加工data每一個元素，用一個新數組接收
  const newData = filteredData.map(
    (item) => `
  <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 class="my-0">${item.id}</h6>
                </div>
                <span class="text-muted">$${
                  item.netprice * item.quantity
                }</span>
              </li>`
  )
  ul.innerHTML =
    newData.join('') +
    `<li class="list-group-item d-flex justify-content-between">
    <span>總價 </span>
    <strong>$${getTotalPrice(data)}</strong>
  </li>`
}
render()
