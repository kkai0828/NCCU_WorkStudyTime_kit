// 配置部分
let currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() // 本月（0 是 1 月）

// 產生本月所有工作日
function getWorkdays(year, month) {
  const workdays = []
  let date = new Date(year, month, 1)

  // 若需要調整總時數，可在此處修改 workdays.length <= {總時數/4}
  // 例如總時數為 80 小時，則 workdays.length <= 20
  while (date.getMonth() === month || workdays.length <= 20) {
    const day = date.getDay() // 0 是週日, 6 是週六
    if (day !== 0 && day !== 6) {
      workdays.push(new Date(date)) // 儲存每個工作日
    }
    date.setDate(date.getDate() + 1)
  }

  return workdays
}

// 將日期轉換為正確的選擇項（對應的日數）
function getDateOption(day) {
  return `#WorkDDDDL > option:nth-child(${day})` // 預設 options 是從 `1` 開始對應
}

const workdays = getWorkdays(year, month)

// 強制點擊指定的元素（用來觸發事件）
function forceClickElement(element) {
  if (element) {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
    element.dispatchEvent(event) // 強制觸發點擊
  } else {
    console.error('Element not found for clicking')
  }
}

// 強制觸發變更事件
function forceChangeEvent(element) {
  if (element) {
    const event = new Event('change', { bubbles: true })
    element.dispatchEvent(event) // 強制觸發 change 事件
  } else {
    console.error('Element not found for triggering change event')
  }
}

// 新增工讀時數邏輯
function addWorkTime() {
  let index = 0

  function processNext() {
    if (index >= workdays.length) {
      console.log('所有工讀日期已新增完成！')
      return
    }

    // 步驟 1: 點擊新增工讀時數按鈕
    const addButton = Array.from(document.querySelectorAll('a')).find(
      (button) => button.textContent.trim() === '新增工讀時數'
    )

    if (addButton) {
      setTimeout(() => {
        forceClickElement(addButton) // 點擊新增按鈕
      }, 1000)
    } else {
      console.error("無法找到 '新增工讀時數' 按鈕！")
      return
    }

    // 步驟 2: 修改工讀日期
    const workDate = workdays[index]
    const day = workDate.getDate() // 取得當日數字
    const workDateInputOption = getDateOption(day) // 獲取對應的選項

    const workDateSelect = document.getElementById('WorkDDDDL')
    if (workDateSelect) {
      setTimeout(() => {
        const workDateInput = document.querySelector(workDateInputOption)
        if (workDateInput) {
          // 確保選擇了正確日期並觸發變更事件
          workDateInput.selected = true // 選擇對應的日期選項
          forceChangeEvent(workDateInput)
          console.log(`選擇了工讀日期: ${workDate.toISOString().split('T')[0]}`)
        } else {
          console.error("無法找到 '工讀日期' 的對應選項！")
          return
        }
      }, 1500)
    }

    // 步驟 3: 修改工讀迄時
    const endTimeSelect = document.getElementById('WorkEndHHDDL')
    if (endTimeSelect) {
      setTimeout(() => {
        const endTimeOption = document.querySelector(
          '#WorkEndHHDDL > option:nth-child(13)'
        ) // 找到 "12" 這個選項
        if (endTimeOption) {
          endTimeOption.selected = true
          forceChangeEvent(endTimeOption) // 觸發改變事件
          console.log('設定工讀迄時為 12:00')
        } else {
          console.error("無法找到 '工讀迄時' 的選項！")
          return
        }
      }, 1500)
    }

    // 步驟 4: 點擊「新增」按鈕提交
    const submitButton = document.querySelector(
      'input[type="button"][value="新增"]'
    )
    if (submitButton) {
      setTimeout(() => {
        forceClickElement(submitButton) // 點擊新增
        console.log(`新增完成：${workDate.toISOString().split('T')[0]}`)
      }, 2000) // 延遲確保資料已提交
    } else {
      console.error("無法找到 '新增' 按鈕！")
      return
    }

    index++

    // 等待適當的時間再處理下一個工讀日期
    setTimeout(processNext, 3000) // 每3秒操作一次
  }

  processNext() // 開始處理工讀日期
}

// 開始新增工讀時間
addWorkTime()
