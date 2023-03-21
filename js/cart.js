// 獲取元素

let tbody = document.querySelector('tbody')
// let totalPrice = document.querySelector('.totalPrice')

let data = JSON.parse(localStorage.getItem('cart'))

// 渲染函數
function render() {
  const newData = data.map(
    (item) =>
      `<tr>
    <th scope="row" class="col-md-1 text-center align-middle">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckChecked"
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
    <td class="col-md-1 align-middle subTotal">75</td>
    <td class="col-md-1 align-middle del" data-id=${item.id}>
      刪除
    </td>
  </tr>`
  )
  tbody.innerHTML = newData.join('')
}

render()

tbody.addEventListener('click', function (e) {
  if (e.target.tagName === 'INPUT') {
    if (e.target.classList.contains('add')) {
      //e.target.id===蛋糕名稱
      //   找到data中，item.id===e.target.id的那一項的下標
      let i = data.findIndex((item) => item.id === e.target.id)
      // 讓該項的數量自增
      data[i].quantity++
      // 更新本地存儲內容
      localStorage.setItem('cart', JSON.stringify(data))
      //   重新渲染
      render()
    } else if (e.target.classList.contains('reduce')) {
      // console.log(e.target.id) e.target.id===蛋糕名稱
      //   找到data中，item.id===e.target.id的那一項的下標
      let i = data.findIndex((item) => item.id === e.target.id)
      // 讓該項的數量自減
      data[i].quantity--
      // 更新本地存儲內容
      localStorage.setItem('cart', JSON.stringify(data))
      //   重新渲染
      render()
    }
  }
})