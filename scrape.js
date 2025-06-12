const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

async function scrapeAsiaYo() {
  try {
    // 獲取網頁內容
    const response = await axios.get('https://asiayo.com/zh-tw/package/sport-activities/', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })
    const $ = cheerio.load(response.data)

    // 創建CSV內容，加入 BOM 標記以支援中文
    let csvContent = '\ufeff賽事名稱\t每人最低價\n'

    // 查找所有賽事資訊
    $('[data-sentry-element="ContentWrapper"]').each((i, element) => {
      // 取得標題並移除日期部分
      const fullTitle = $(element).find('[data-sentry-element="Title"]').text().trim()
      // 使用更靈活的正則表達式移除日期部分
      let title = fullTitle
      // 移除所有日期格式（YYYY/MM/DD、MM/DD/YYYY、MM/DD/YY）
      title = title.replace(/\s*\d{4}\/\d{1,2}\/\d{1,2}\s*/g, '')

      // 嘗試找到價格元素
      const priceElement = $(element)
        .find('div')
        .filter((_, el) => {
          const text = $(el).text().trim()
          return text.includes('NT$')
        })

      const priceText = priceElement.text().trim()

      // 提取價格中的數字
      const priceMatch = priceText.match(/NT\$([\d,]+)/)
      if (priceMatch && title) {
        const numericPrice = priceMatch[1].replace(/,/g, '')
        csvContent += `${title}\t${numericPrice}\n`
      }
    })

    // 寫入檔案，使用 UTF-8 編碼
    fs.writeFileSync('activity.csv', csvContent, { encoding: 'utf8' })
    console.log('資料已成功儲存到 activity.csv')
  } catch (error) {
    console.error('發生錯誤:', error)
  }
}

scrapeAsiaYo()
