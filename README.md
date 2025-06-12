# Asia Yo 賽事爬蟲專案

## 專案說明
這是一個使用現代網頁技術開發的專案。

## 開發環境設置

### 必要條件
- Node.js (建議使用 LTS 版本)
- npm 或 yarn 套件管理器

### 安裝步驟
1. 複製專案
```bash
git clone [專案網址]
cd asia-yo
```

2. 安裝依賴套件
```bash
npm install
# 或
yarn install
```

3. 啟動開發伺服器
```bash
npm run dev
# 或
yarn dev
```

## 專案結構
```
asia-yo/
├── src/          # 原始碼目錄
├── public/       # 靜態資源
├── .prettierrc   # Prettier 設定檔
└── package.json  # 專案依賴與腳本
```

## 程式碼風格
本專案使用 Prettier 進行程式碼格式化，主要設定如下：
- 縮排：2 個空格
- 行尾：LF
- 引號：單引號
- 分號：不使用
- 最大行寬：100 字元

## 開發指南
1. 請確保在提交程式碼前執行格式化：
```bash
npm run format
# 或
yarn format
```

2. 提交前請執行測試：
```bash
npm run test
# 或
yarn test
```


## 檔案說明

### scrape.js
- 功能：爬取 Asia Yo 運動賽事網頁的資料
- 輸出：生成 `activity.csv` 檔案
- 內容：包含賽事名稱和每人最低價格

### csvToJson.js
- 功能：將 CSV 檔案轉換為 JSON 格式
- 輸入：讀取 `activity.csv`
- 輸出：生成 `activity.json` 檔案
- 處理：確保中文正確顯示，並將價格轉換為數字格式

### sendApiRequest.js
- 功能：發送 API 請求
- 輸入：讀取 `activity.json`
- 輸出：將資料發送到指定的 API 端點
- 注意：目前設定為發送到 `'https://api.schedule.asiayo.com/'` 進行測試

### apiServer.js
- 功能：測試用的本地 API 伺服器
- 用途：用於測試資料接收功能
- 運行：在 `http://localhost:3000` 啟動
- 驗證：檢查請求標頭和資料格式

## 使用流程
1. 執行 `scrape.js` 爬取賽事資訊
2. 執行 `csvToJson.js` 將 CSV 轉換為 JSON
3. 執行 `sendApiRequest.js` 發送資料到 API
4. 如需測試，可先啟動 `apiServer.js` 進行本地測試 