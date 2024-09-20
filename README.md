# Glia
![Group 874](https://github.com/user-attachments/assets/a5fba4ed-b71e-466c-89bc-0b71f778faa1)

프로젝트 Gila는 '길라잡이'의 앞 두 글자를 따와 만든 여행자와 현지인 간의 매칭 서비스입니다. 당신은 우리 동네의 베테랑 길라(가이드)가 되어 지역의 매력을 소개할 수 있고, 다른 지역의 길라와 함께 그 지역을 경험할 수도 있습니다. 단순한 여행을 넘어, 연결을 통한 뜻밖의 경험을 선사합니다. 우리는 이 소중한 연결을 '매듭'으로 표현합니다. 당신의 매듭은 무한히 늘어날 수 있습니다.

Gila와 함께 새로운 사람들과의 만남을 통해 잊지 못할 추억을 만들어 보세요.

## 개발 기간
  전체 개발 기간 : 2024-07-03 ~ <br>
  기획 : 2024-07-03 ~ 2024-07.22 <br>
  기능 구현 : 2024-07.23 ~ <br>


## 컨셉 기획

기존의 여행 서비스는 가이드와 여행객을 이어줬다면 저희는 여행이라는 범위에서 확장한 인연에 초점을 뒀습니다. 그래서 본격적인 컨셉과 기획을 하기 전, 구글 폼을 통해 사전 조사를 진행했습니다.
[구글 폼 사전 조사 결과](https://docs.google.com/spreadsheets/d/1IXKUo7oUxSdh4QjMnNmHzH8rDEEsa5b2IS2qCQjnpyk/edit?usp=sharing)

설문을 진행한 결과 예상 사용자가 저희가 구상하는 서비스를 사용할 가능성에 대한 설문에도 긍정적인 결과를 받았습니다.
설문 조사를 토대로 팀이 설정한 목표는 아래와 같습니다.
> 1. 20대가 사용할만한 서비스
> 2. 인연을 맺고 싶은 사용자에게 약속기능 제공
> 3. 만남이 부담스러운 사용자를 위한 질문 답변 기능 제공

설정한 목표와 서비스 컨셉을 고려해 서비스 이름과 로고를 제작했습니다.

![Group 874](https://github.com/user-attachments/assets/5bd04abd-8055-42fd-bf06-5afa76d7d28f)

서비스 이름 `Gila`는 '길라잡이'라는 단어에서 가져온 저희만의 이름으로 여러 인연들을 이어주는 길라잡이가 되고자하는 목표를 담고 있습니다.

![Group 869 복사본](https://github.com/user-attachments/assets/2e077fef-79ad-4a91-87da-d0166b8839b4)

매듭 모양의 로고는 게임 '데스 스트랜딩'에서 등장하는 'knot'라는 개념에서 시작했습니다. 게임내에서는 도시를 'knot'라는 이름으로 쓰면서 유저간 소통을 중요시합니다.
`Gila`는 인연을 이어주는 길라잡이의 역할뿐만 아니라 매듭을 맺고, 맺어주는 역할을 하고자 로고를 매듭으로 선정했습니다.


## 레이아웃 기획

컨셉과 목표에 맞는 기능을 구현하고 배치하는 레이아웃 기획과정을 거쳤습니다. `tldraw`라는 켄버스 사이트를 통해 레이아웃을 도식화해서 구상했습니다.
<img width="1363" alt="스크린샷 2024-08-09 오전 11 38 10" src="https://github.com/user-attachments/assets/2ae97801-c9c1-4e5e-9212-55cd92776fca">

렌딩페이지와 토픽 선택 페이지, 서비스의 메인 페이지 입니다. 다른 사용자들과 약속을 잡을 수 있는 활동 리스트 페이지와 사용자들에게 질문하고 답변하는 페이지입니다.

<img width="856" alt="스크린샷 2024-08-09 오전 11 40 12" src="https://github.com/user-attachments/assets/875a4cb2-633d-492d-8a78-825eac2aee9e">

상세 페이지과 사용자의 프로필 페이지, 프로필 편집페이지 입니다.

<img width="1073" alt="스크린샷 2024-08-09 오전 11 42 15" src="https://github.com/user-attachments/assets/cd811042-d0e2-4f5b-92bb-f602314d344d">

모든 활동을 관리하는 대시보드 페이지입니다.

## 기술스택

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"><img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"><img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"><img src="https://img.shields.io/badge/shadcnui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"><img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"><img src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"><img src="https://img.shields.io/badge/datefns-770C56?style=for-the-badge&logo=datefns&logoColor=white"><img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
![authjs](https://github.com/user-attachments/assets/328da2a3-af68-46f5-810a-527718f9dcb9)
![upload](https://github.com/user-attachments/assets/b37355f6-b9bf-4e4d-ae31-1a74d740d3d4)

## 기능 설명

- 활동 등록, 수정, 삭제, 찜, 공유

- 질문 등록, 수정, 삭제

- 질문 답변 등록, 수정, 삭제

- 활동 신청, 취소 / 신청 수락, 거절

- 웹소켓 활용 실시간 채팅

- 접속 위치와 가까운 활동 추천, 슬라이드

- 활동 신청, 신청 수락 시 메일 발송

- 리스트(활동, 질문) 정렬(최신순, 관련도순, 조회순, 즐겨찾기순, 특정 위치)

## 팀원 소개

## Team
|<img src="https://avatars.githubusercontent.com/u/137033202?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/113277713?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/118117392?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/159929147?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/150333046?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|:-:|
|팀장: 박상준<br/>[@sj0724](https://github.com/sj0724)|팀원: 권주현<br/>[@kuum97](https://github.com/kuum97)|팀원: 박성재<br/>[@Batrnan](https://github.com/Batrnan)|팀원: 이주안<br/>[@juan0444](https://github.com/juan0444)|팀원: 홍진호<br/>[@jinho0941](https://github.com/jinho0941)|

- 박상준: product managing, 질문 페이지, 대시보드 - 받은 신청, 토픽 페이지, 가까운 지역 활동 추천, 채팅
- 권주현: product managing, 활동 페이지, 대시보드 - 활동/보낸 신청
- 박성재: design, 대시보드 페이지, 대시보드 - 질문
- 이주안: design, 프로필 페이지, 대시보드 - 찜
- 홍진호: back-end, 인증 페이지, 대시보드 - 리뷰

## 코드 실행 가이드

node.js v20.0.0을 사용하고 있습니다. `nvm use`를 사용해서 node 버전을 세팅해주세요.<br/>
`npx prisma generate`를 사용해 prisma schema table을 생성해주세요.<br/>
`npm run build`를 사용해 코드를 실행해주시면 됩니다.<br/>

>환경변수(.env) 안내<br/>
>```
>NEXT_PUBLIC_BASE_URL=""
>NEXT_PUBLIC_KAKAO_API_KEY=""
>UPLOADTHING_APP_ID=""
>UPLOADTHING_SECRET=""
>DATABASE_URL=""
>AUTH_SECRET=""
>NEXT_PUBLIC_ABLY_KEY=""
>NEXT_PUBLIC_EMAIL_ADDRESS=""
>NEXT_PUBLIC_EMAIL_KEY=""
>```
