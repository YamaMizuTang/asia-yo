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




## 程式碼風格
本專案使用 Prettier 進行程式碼格式化，主要設定如下：
- 縮排：2 個空格
- 行尾：LF
- 引號：單引號
- 分號：不使用
- 最大行寬：100 字元




## 檔案說明

### scrape.js
- 功能：爬取 Asia Yo 運動賽事網頁的資料
- 輸出：生成 `activity.csv` 檔案
- 內容：包含賽事名稱和每人最低價格
- 備註：因為我的電腦為 Windows 系統，為了正常顯示中文因此加入 BOM 標記。此外，以正則表達式去除賽事名稱中日期的部分。



### csvToJson.js
- 功能：將 CSV 檔案轉換為 JSON 格式
- 輸入：讀取 `activity.csv`
- 輸出：生成 `activity.json` 檔案
- 處理：確保中文正確顯示，並將價格轉換為數字格式
- 備註：因 CSV 資料儲存時加入 BOM，因此轉成 JSON 時有特別處理。

### sendApiRequest.js
- 功能：發送 API 請求
- 輸入：讀取 `activity.json`
- 輸出：將資料發送到指定的 API 端點
- 注意：測試時可使用 `testUrl = 'http://localhost:3000'`

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
