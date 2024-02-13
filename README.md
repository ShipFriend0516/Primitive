# 프리미티브
![프리미티브 인트로](https://github.com/ShipFriend0516/Primitive/assets/98446924/2ba611ba-6238-4dde-915b-3e3eaceffa02)



## 🌿 제작 목적
프리미티브 동아리의 홍보 목적으로 제작, 많관부~ 👀

## 🙊 사용 기술
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
> Intersection Observer API 사용
>
소개 탭 부드러운 애니메이션을 적용하기 위해 사용

> lodash 성능 최적화
> 
모바일 반응성 웹으로 만들기 위해서 사용, 창 사이즈를 변경하면 1px 변경될 때마다 핸들함수가 실행되는데, 너무 비효율적이고 메모리 낭비가 된다.
lodash 라이브러리의 throttle() 기능과 debounce() 기능을 활용하면 최적화 가능.

debounce()는 시간 내 함수가 여러번 호출되더라도 마지막 한번만 실행하는 함수

```jsx
 useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
      setIsMobile(windowWidth <= 768 ? true : false);
    }, 100);
    console.count();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

```


## 🪨 배포
![image](https://github.com/ShipFriend0516/Primitive/assets/98446924/3b2cbf9b-77ee-4421-8323-a7ab40f0e528)

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) 

Primitive 공식 홈페이지 [배포 페이지](https://primitive-knu.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/d7958ca0-2f8e-4eb9-9fd8-f6ec1368bcd5/deploy-status)](https://app.netlify.com/sites/primitive-knu/deploys)
![Static Badge](https://img.shields.io/github/languages/top/ShipFriend0516/Primitive)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/ShipFriend0516/Primitive)

