const fs = require('fs')
const axios = require('axios')
const testUrl = 'http://localhost:3000' //和apiServer.js搭配用的測試url

async function sendScheduleRequest() {
  try {
    // 讀取 JSON 檔案並處理 BOM
    const content = fs.readFileSync('activity.json', 'utf8')
    const payload = JSON.parse(content.replace(/^\ufeff/, ''))

    // API 端點和配置
    const url = 'https://api.schedule.asiayo.com/'
    const headers = {
      channel: 'CP',
      user: 'rpa',
      'Content-Type': 'application/json',
    }

    // 發送 POST 請求
    const response = await axios.post(url, payload, { headers })

    // 處理響應
    console.log('API 請求成功！')
    console.log('響應狀態碼:', response.status)
    console.log('響應數據:', response.data)

    return response.data
  } catch (error) {
    console.error('API 請求失敗:', error.response ? error.response.data.data : error.message)
  }
}

// 執行請求
sendScheduleRequest()
