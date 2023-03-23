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

function renderBill() {
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
                  <small class="text-muted">x ${item.quantity}</small>
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
renderBill()

// 渲染區域選擇列表
const district = document.querySelector('.district')
axios.defaults.baseURL = 'http://ajax-api.itheima.net'
async function renderDistrict() {
  //  獲取省份信息
  let {
    data: { data: provinceList },
  } = await axios.get('/api/province')
  // console.log(provinceList)
  // 渲染省列表
  let newProvinceList = provinceList.map(
    (item) => `<option value="${item}">--${item}--</option>`
  )
  district.innerHTML =
    '<option value="">--請選擇--</option>' + newProvinceList.join('')
}

renderDistrict()

// 區域切換功能
district.addEventListener('change', async function (e) {
  // e.target.value就是選取的省份
  // 發請求獲取城市列表cityList
  const {
    data: { data: cityList },
  } = await axios.get('/api/city', {
    params: { pname: e.target.value },
  })

  // 把cityList每一項加工成節點
  const newCityList = cityList.map(
    (item) => `<option value="${item}">${item}</option>`
  )
  // 渲染城市列表
  document.querySelector('.subdistrict').innerHTML =
    '<option value="">--請選擇--</option>' + newCityList.join('')
})
