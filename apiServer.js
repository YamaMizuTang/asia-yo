const express = require('express')
const cors = require('cors')
const app = express()

// 啟用 CORS
app.use(cors())
// 解析 JSON 請求體
app.use(express.json())

// API 端點
app.post('/', (req, res) => {
  try {
    console.log('收到請求:', req.body)

    // 驗證 headers
    if (req.headers.channel !== 'CP' || req.headers.user !== 'rpa') {
      return res.status(401).json({
        success: false,
        message: 'Invalid headers',
      })
    }

    // 檢查請求體格式
    if (!Array.isArray(req.body)) {
      res.status(400).json({
        status: {
          code: 400,
          msg: 'Invalid payload format',
        },
        data: {
          errors: 'The request body must be an array',
        },
      })
    }

    // 驗證每個項目都有 name 和 price
    const hasInvalidData = req.body.some((item) => !item.name || typeof item.price !== 'number')

    if (hasInvalidData) {
      res.status(500).json({
        status: {
          code: 500,
          msg: 'Validation failed.',
        },
        data: {
          errors: 'price: The price must be numeric',
        },
      })
    }

    // 返回成功響應
    res.json({
      success: true,
      message: 'Data received successfully',
      receivedCount: req.body.length,
    })
  } catch (error) {
    console.error('API 錯誤:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// 啟動伺服器
const PORT = 3000
app.listen(PORT, () => {
  console.log(`API 伺服器正在運行於 http://localhost:${PORT}`)
})
