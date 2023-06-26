# chatwithdug_backend(kr)

##### [Click here for English version](README_EN.md)

##### [日本語バージョンはこちらをクリックして下さい](README_JP.md)

## - 목차 -

1. 개요
2. 프로젝트목표
3. 구현기능
4. 개선필요내용
   </br>
   </br>

### 1. 개요

- 프로젝트명 : chatwithdug_backend
- URL : https://chatwithdug.netlify.app
- 기간 : 2023.03.01 - 진행 중
- 인원 : 1인
- 기술스택 : </br>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white">
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
  </br>
  </br>

### 2. 프로젝트목표

1. WebSocket을 활용한 채팅 사이트를 구현 할 것
2. 회원관련 기능을 구현 할 것
3. 프론트엔드서버와 연동 가능하도록 구현 할 것
4. 배포하여 유지 보수, 운용 할 것
   </br>
   </br>

### 3. 구현기능 </br>

1. user data의 저장 및 수정
2. nodemailer를 활용 한 인증번호 기능 구현
3. socket.io 라이브러리를 통한 websocket 통신
   </br>
   </br>

### 4. 개선필요내용

- 회원가입 시 인증번호 메일이 스팸처리 되는 원인 파악 후 개선
