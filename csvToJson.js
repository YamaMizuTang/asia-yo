const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')

function csvToJson(csvPath) {
  try {
    // 讀取 CSV 檔案並確保正確處理 BOM
    const buffer = fs.readFileSync(csvPath)
    // 使用 iconv-lite 轉換編碼
    const content = iconv.decode(buffer, 'utf8')

    // 將 CSV 轉換為陣列
    const lines = content.split('\n')

    
    // 初始化 JSON 陣列
    const result = []

    // 處理每一行資料
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i]
      if (currentLine.trim() === '') continue // 跳過空行

      const values = currentLine.split('\t')

      // 建立物件
      const obj = {
        name: values[0].trim(), // 賽事名稱
        price: parseInt(values[1].trim()), // 每人最低價轉換為數字
      }

      result.push(obj)
    }

    // 確保中文正確顯示
    const jsonString = JSON.stringify(result, null, 2)

    // 寫入 JSON 檔案，使用 BOM 標記以支援中文
    const jsonPath = path.join(path.dirname(csvPath), 'activity.json')
    const jsonBuffer = Buffer.from('\ufeff' + jsonString)
    fs.writeFileSync(jsonPath, jsonBuffer, 'utf8')
    console.log(`已成功轉換並保存到 ${jsonPath}`)

    return result
  } catch (error) {
    console.error('轉換過程中發生錯誤:', error)
    throw error
  }
}

// 執行轉換
const csvPath = 'activity.csv'
const result = csvToJson(csvPath)
console.log('轉換完成，結果預覽：')
console.log(result.slice(0, 2)) // 顯示前兩個項目作為預覽
