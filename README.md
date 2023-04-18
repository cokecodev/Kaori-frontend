# KAROI Frontend

![](https://img.shields.io/badge/version-0.1.0-blue)
[![](https://img.shields.io/badge/API%20Documentation-Yes-brightgreen)](https://wise-vision-78f.notion.site/Kaori-API-9d7f7e8a6caa447298bc33a8f676b306)
[![](https://img.shields.io/badge/User%20Story-Yes-brightgreen)](https://wise-vision-78f.notion.site/Kaori-User-story-f0635b095f6c4e2b8cae52d104b81e13)

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
- [db structure | DrawSQL](https://drawsql.app/teams/kaori/diagrams/kaori)
- [User Story | Notion](https://wise-vision-78f.notion.site/Kaori-User-story-f0635b095f6c4e2b8cae52d104b81e13)
- [API Documentation | Notion](https://wise-vision-78f.notion.site/Kaori-API-9d7f7e8a6caa447298bc33a8f676b306)

## 主要功能

- 會員系統
    - 登入、註冊、登出
- 留言系統
    - 會員：新增、編輯、刪除
    - 管理員：可強制隱藏會員的留言
- 投票系統
    - 會員：每款香水皆可多次投票 ( 每人每款只能投一筆，但投票內容不限次數修改 )
- 香水資料系統
    - 香水基本資料 
        - 包含：香材列表、品牌、調性、調香師
    - 眾人投票結果
        - 包含：持香時間、擴散性、性別氛圍、材料的味道突出度及推薦的使用時機
    - 相關評論
- 搜尋系統
    - 可以根據香水名稱、品牌名稱、調香師搜尋香水列表
    - 品牌及調香師頁面可以找到旗下所屬的香水列表

## 👀 [**Demo**](https://kaori-frontend.netlify.app/)

> 管理員測試帳號：admin / 密碼：admin

> 為維持良好的 Demo 體驗，請不要刪除不是自己新增的資料，謝謝!

### 搜尋系統
- 任何的網頁使用者都可以針對**香水名稱、調香師名稱、品牌名稱**來搜尋，若找不到符合的品項，會跳出提醒。

    ![](https://imgur.com/12Ojskg.gif)

    ![](https://imgur.com/v7mUNyU.gif)

- 可以從品牌或調香師頁面找到所屬的香水列表

    ![](https://imgur.com/RriCcRD.gif)

    ![](https://imgur.com/nXvNUik.gif)
---

### 投票系統
- 會員登入後，可以為每款香水投票 ( 每人每款只能投一筆，但可多次修改投票內容 )

    ![](https://imgur.com/aTnJsfn.gif)

- 如果投票項目不完整的話，會跳出提醒

    ![](https://imgur.com/sjc7aLD.gif)

---

### 留言系統
- 會員登入後，能夠留言，加入每款香水專屬的討論。

    ![](https://imgur.com/FbvE8g8.gif)

- 發現有錯字或亂說話不小心炎上了嗎 ? 別擔心 ! 登入後，作者**修改、刪除留言**都不是甚麼大問題 !

    ![](https://imgur.com/i10ovPJ.gif)

    ![](https://imgur.com/JSr9UQr.gif)

- 網站管理員有權限可以**強制隱藏用戶的評論**，以防出現不當言論。

    ![](https://i.imgur.com/E5YYmvK.gif)

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

## 資料來源 Resource
- [ 香水資訊網站 Fragrantica](https://www.fragrantica.com/)

## 聲明
 本網站僅作為個人練習用，註冊時請勿使用真實資料。另本網站所包含之圖片及內容僅做練習使用，不做任何商業用途。
