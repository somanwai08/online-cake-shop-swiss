// 獲取元素
// let quantity = document.querySelectorAll('.quan')
let add = document.querySelectorAll('.add')
let reduce = document.querySelectorAll('.reduce')
let subTotal = document.querySelectorAll('.subTotal')
let span = document.querySelectorAll('span')
let netPrice = document.querySelectorAll('.netPrice')
let del = document.querySelectorAll('.del')
let tr = document.querySelectorAll('tbody tr')
let tbody = document.querySelector('tbody') //
let totalPrice = document.querySelector('.totalPrice')

let data = [
  { id: '鄉村檸檬乳酪塔', quantity: 1, pic: 'cake01.jpg' },
  { id: '精緻手工巧克蛋糕', quantity: 2, pic: 'cake02.jpg' },
]
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
        checked
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
      console.log(e.target.id) //e.target.id===蛋糕名稱
      //   找到data中，item.id===e.target.id的那一項的下標
      let i = data.findIndex((item) => item.id === e.target.id)
      // 讓該項的數量自增
      data[i].quantity++
      //   重新渲染
      render()
    } else if (e.target.classList.contains('reduce')) {
      console.log('hi')
      console.log(e.target.id) //e.target.id===蛋糕名稱
      //   找到data中，item.id===e.target.id的那一項的下標
      let i = data.findIndex((item) => item.id === e.target.id)
      // 讓該項的數量自減
      data[i].quantity--
      //   重新渲染
      render()
    }
  }
})

console.log(data.i)
