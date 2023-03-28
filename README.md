# KAROI Frontend
> KAORI，讓香氣陪伴你的每一個重要時刻


## 專案介紹
嗨，歡迎來到 Kaori！我們是一個熱愛香水的互動平台，旨在分享最新的香水消息和知識。希望透過科學化的討論方式，分析每一款香水的組成元素及表現，幫助大家迅速掌握自己喜愛的味道與材料之間的關聯。

同時設有討論區，滿足大家想和同好討論、分享體驗的願望。我們希望能夠提供最完善的香水資訊與討論場域，協助大家找到最適合的香水、展現各自獨特的風格。

前端採用 React 開發，並部署在 Netlify。

後端採用 Express、Sequelize 開發，部署在 heroku，並使用 clearDB 支援 MySQL 資料庫。

## 🏠 Pages
- 👀 [**Demo**](https://kaori-frontend.netlify.app/)
- [**Kaori Frontend repository**](https://github.com/cokecodev/Kaori-frontend)
- [**Kaori Backend repository**](https://github.com/cokecodev/Kaori-backend)
- User story | Notion
- [API Documentation | Notion](https://wise-vision-78f.notion.site/Kaori-API-9d7f7e8a6caa447298bc33a8f676b306)

## Demo


## 使用技術及第三方套件
- create react app → 建立專案環境
- redux toolkit → 協助生成 redux 設定檔
- react → 前端框架 ( function component + hooks )
- react router dom
- styled components
- axios → 發送 Request
- react toastify → 生成提醒元件
- react animals  → 生成 avatar
- react spinners → 製作 loading 動畫

## 如何在本地端執行
1. 本地需要有 git, node 環境
2. 將本頁的內容 clone 到本地端
3. 執行 `npm install` 安裝此專案所需之套件
4. 執行 `npm start` 跑起來

- 執行 `npm build` →
在 build 資料夾中建立此專案的 production 版本
- 註：更多功能請參考 [Create react app 的文件](https://create-react-app.dev/docs/available-scripts)

## 資料夾結構  

```
📦src
 ┣ 📂components
 ┃ ┣ 📂App
 ┃ ┣ 📂Banner
 ┃ ┣ 📂BlockPartition       # perfume page - 分割區塊用
 ┃ ┣ 📂BrandInfoCard
 ┃ ┣ 📂Comments             # comment 相關
 ┃ ┣ 📂CreatorInfoCard
 ┃ ┣ 📂EditComment          # 編輯評論區塊
 ┃ ┣ 📂ErrorMessage         # 錯誤訊息區塊
 ┃ ┣ 📂Footer
 ┃ ┣ 📂Header
 ┃ ┣ 📂HomePageCardSection  # 香水列表區塊
 ┃ ┣ 📂Loading
 ┃ ┣ 📂Login
 ┃ ┣ 📂NoPerfumeMessage
 ┃ ┣ 📂PageDescribeTitle
 ┃ ┣ 📂PerfumeMain          # perfume 相關
 ┃ ┣ 📂Photo
 ┃ ┣ 📂Register
 ┃ ┣ 📂Vote
 ┃ ┗ 📜general.js
 ┣ 📂constants              # 各類常數
 ┃ ┣ 📜perfumeSetting.js    # 轉換各種後端資料的設定檔
 ┃ ┣ 📜style.js
 ┃ ┗ 📜toastConfig.js       # toastify 設定檔
 ┣ 📂features
 ┃ ┣ 📜fetchStatusReducer.js
 ┃ ┣ 📜searchReducer.js
 ┃ ┗ 📜userReducer.js
 ┣ 📂hooks                  # custom hooks
 ┣ 📂pages
 ┃ ┣ 📂BrandListPage
 ┃ ┣ 📂BrandPage
 ┃ ┣ 📂CreatorListPage
 ┃ ┣ 📂CreatorPage
 ┃ ┣ 📂HomePage
 ┃ ┣ 📂LoginPage
 ┃ ┣ 📂LoginPage
 ┃ ┣ 📂Page404
 ┃ ┣ 📂PerfumeListPage
 ┃ ┣ 📂PerfumePage
 ┃ ┣ 📂RegisterPage
 ┃ ┣ 📂HomePage
 ┣ 📜WebAPI.js
 ┣ 📜index.js
 ┣ 📜index.css
 ┣ 📜store.js
 ┗ 📜utils.js
```
