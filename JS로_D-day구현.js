// [JavaScript] D-day 계산.
// 저의 React - Hansan홍보웹페이지 프로젝트 에서 D-day날짜 계산을 구현하기위해 작성했던 코드를 옮겨와 기록했습니다.

let haveDday = () => { 
    let Dday = document.querySelector('.dday');
    let openDay = new Date('2022-07-27T00:00:00+0900');   // 영하 한산 개봉날짜.
    let now = new Date();   // 현재날짜
    let dateGap = openDay.getTime() - now.getTime();
    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.


    // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
    // 밀리초 값이기 때문에 1000을 곱한다. 
    // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
    // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
    let day = Math.floor(dateGap / (1000*60*60*24));   
    let hours = Math.floor((dateGap % (1000*60*60*24)) / (1000*60*60));   // 하루단위로 나누고 나온 나머지는 시,분,초가 나온다.
    let minutes = Math.floor((dateGap % (1000*60*60)) / (1000*60));   // 마찬가지로 시간단위로 나누고 나온 나머지는 분,초가 나온다.
    let seconds = Math.floor(dateGap % (1000*60) / 1000);   // 분단위로 나누고 나온 나머지는 초 가 나온다.
    
    Dday.innerHTML = `${day}<span>일</span> ${hours}<span>시간</span> : ${minutes}<span>분</span> : ${seconds}<span>초</span> 남았습니다.`;
  };

  let countTime = () => {  // countTime함수 생성해서
      setInterval(haveDday, 1000);    // setInterval 메서드에서 haveDday함수를 1초(1000밀리초)마다 실행(호출)한다.
  };


  useEffect(() => {  
     countTime();
     // 이렇게 useEffect 안에서 countTime()함수를 load되고 딱한번만 호출하게되면, 
     // 함수내부의 setInterval 메서드가 1초마다 D-day함수를 실행하고, 계산해준다!.
  }, []);  
