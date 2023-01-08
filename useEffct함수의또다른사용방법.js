//  react 프로젝트 개발중, 버튼 클릭시 실행할 함수안에서 또다른 함수를 호출해야하는 상황이 생겼다.
//  이경우는 A함수에서 modifyTab 스테이트가 true로 변경이되면, B함수에서 modifyTab가 
//  true일때 다른 액션이 실행되도록 하는게 목적이였다.


//  아래 예시1 코드

let [modifyTab, SETmodifyTab] = useState(false);

const A함수 = () => {  // 버틀 클릭시 실행할 함수
   SETmodifyTab(true);
   B함수();
};

const B함수 = () => {
   if(modifyTab){
      '다른거실행.'
   }      
};


// 하지만 state변경함수가 비동기라 늦게변경이 되어서 modifyTab이 아직 false라 실행이 안되었다.
// B함수에서 modifyTab이 true가 되길 기다려서 변경되면 '다른거실행'이 동작하게 할려면 다른 어떤방법이 있을지 고민하다가, 
// useEffect훅을 이용한 방법을 알게되었다.
// 나는 B함수가 A클릭함수 안에서 호출되야 했기에 useEffect() 안에서 B함수를 호출해줄 생각을 미처 하지 못했다.


// 해결 된 코드

let [modifyTab2, SETmodifyTab2] = useState(false);

const A함수2 = () => {
   SETmodifyTab2(true);
   '다른코드들'
};

const B함수2 = () => {
   '다른액션 실행.'
}     


useEffect(() => {
   if(modifyTab2){
   	  B함수2();
   } else {  'false  일경우 다른 액션.'  }	
}, [modifyTab2])


// 이런방법으로 코드를 useEffect()안으로 옮기면, 의존성배열에 들어간 modifyTab 스테이트가 변경될때마다, 
// useEffect의 콜백함수가 실행하게 되어 원하는 계획데로 B함수를 실행시킬수 있었다!.
// 생각의 전환으로 한수 배울수 있었다