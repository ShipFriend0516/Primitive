# 프리미티브
![프리미티브 인트로](https://github.com/ShipFriend0516/Primitive/assets/98446924/2ba611ba-6238-4dde-915b-3e3eaceffa02)



## 🌿 제작 목적
프리미티브 동아리의 홍보 목적으로 제작 시작, 후 프로젝트 공유 플랫폼으로 추가 기획

## 🙊 사용 기술
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

> 마이그레이션 전

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

> 마이그레이션 후

webpack에서 vite로, js에서 ts로 마이그레이션했다. 빌드 속도가 확실히 빨라진게 체감된다.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
---
### Intersection Observer API 사용
소개 탭 부드러운 애니메이션을 적용하기 위해 사용

### lodash 성능 최적화
모바일 반응성 웹으로 만들기 위해서 사용, 창 사이즈를 변경하면 1px 변경될 때마다 핸들함수가 실행되는데, 너무 비효율적이고 메모리 낭비가 된다.
lodash 라이브러리의 throttle() 기능과 debounce() 기능을 활용하면 최적화 가능.

debounce()는 시간 내 함수가 여러번 호출되더라도 마지막 한번만 실행하는 함수

### 프로젝트 업로드 및 조회 기능
- 프로젝트 업로드와 세부 설명 작성하는 에디터를 통해 세부 소개 작성 가능
- Firebase의 Storage 기능으로 이미지 업로드 및 조회 기능 구현으로 프로젝트 썸네일 및 프로필 사진 등의 기능 구현
  
![스크린샷 2024-06-19 오후 6 47 13](https://github.com/ShipFriend0516/Primitive/assets/98446924/530ff01b-03cd-4657-89e5-f2544509e6c6)


### 어드민 인증 기반 회원가입 구현
동아리원임을 인증하기 위해서 어드민 인증 기반 회원가입을 구현

[Firebase로 어드민 인증 기반 회원가입 구현하기](https://velog.io/@shipfriend/Firebase%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%96%B4%EB%93%9C%EB%AF%BC-%EC%88%98%EB%9D%BD-%EA%B8%B0%EB%B0%98-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

![image](https://github.com/ShipFriend0516/Primitive/assets/98446924/b42006f6-9bca-4a12-90a7-b84884888e8c)



## 🪨 배포

![Screenshot 2024-05-29 at 18 51 26](https://github.com/ShipFriend0516/Primitive/assets/98446924/ac18bd96-8511-4c93-ade1-581717e54520)

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) 

Primitive 공식 홈페이지 [배포 페이지](https://primitive.kr/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d7958ca0-2f8e-4eb9-9fd8-f6ec1368bcd5/deploy-status)](https://app.netlify.com/sites/primitive-knu/deploys)
![Static Badge](https://img.shields.io/github/languages/top/ShipFriend0516/Primitive)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/ShipFriend0516/Primitive)

