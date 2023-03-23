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
axios.defaults.baseURL = 'https://api.kwsgo.com/static'
async function renderDistrict() {
  //  獲取區域信息
  let { data: districtList } = await axios.get('/district.json')

  // 渲染區域列表
  let newDistrictList = districtList.map(
    (item) => `<option value="${item}">${item}</option>`
  )
  district.innerHTML =
    '<option value="">--請選擇--</option>' + newDistrictList.join('')
}

renderDistrict()

// 區域切換功能
district.addEventListener('change', async function (e) {
  let res = {}
  // e.target.value就是選取的省份
  if (e.target.value === '香港') {
    // 發請求獲取subdistrictList
    res = await axios.get(`/hk.json`)
  } else if (e.target.value === '九龍') {
    // 發請求獲取城市列表cityList
    res = await axios.get(`/kl.json`)
  } else if (e.target.value === '新界') {
    // 發請求獲取城市列表cityList
    res = await axios.get(`/nt.json`)
  }
  const { data: subdistrictList } = res
  // 把cityList每一項加工成節點
  const newSubdistrictList = subdistrictList.map(
    (item) => `<option value="${item}">${item}</option>`
  )
  // 渲染城市列表
  document.querySelector('.subdistrict').innerHTML =
    '<option value="">--請選擇--</option>' + newSubdistrictList.join('')
})
