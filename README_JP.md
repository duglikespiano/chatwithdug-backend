# chatwithdug_backend(jp)

##### [한국어 버전은 이 곳을 클릭해주세요](README.md)

##### [Click here for English version](README_EN.md)

## - 目次 -

1. 概要
2. Project 目標
3. 具現機能
4. 改善必要内容
   </br>
   </br>

### 1. 概要

- Project タイトル: chatwithdug_backend
- URL : https://chatwithdug.netlify.app
- 期間 : 2023.03.01 - 進行中
- 人員 : 1 人
- 技術スタック : </br>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white">
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
  </br>
  </br>

### 2. Project 目標

1. WebSocket を活用したチャットページの具現する事
2. 会員関連機能を具現する事
3. frontend server との連動出来るように具現する事
4. 配布して維持保守、運用する事
   </br>
   </br>

### 3. 具現機能 </br>

1. ユーザーデータの保管、修正
2. nodemailer 通じた認証番号機能具現
3. socket.io ライブラリを通じた websocket 通信
   </br>
   </br>

### 4. 改善必要内容

- 会員加入の時、認証番号メールがスパム処理される原因把握後改善
