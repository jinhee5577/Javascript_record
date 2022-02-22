  //  Closure

      //     Lexical환경                 //     Lexical환경   
      let one;                          //   one: 초기화 X   사용불가
      one = 1;                         //   addOne : funcntion  사용가능  (만약 변수에 할당하는 함수표현식은 저렇게 안된다.)
                                            
//    let 으로 선언된 변수도 호이스팅 된다.
//    저렇게 Lexical환경 으로 올라가지만 초기화가 안되었을뿐이다. 그래서 사용은 못함.

      function addOne(num){                
          console.log(one + num);      
      }

      addOne(5);

//    코드가 let one; 줄로 넘오면        //     Lexical환경 
                                      //  one : undefined 사용가능    이 된다.

      let one;    
      one = 1;                       //  전역 Lexical환경 
                                    //  one : 1 ,  addOne : function
      function addOne(num){                
          console.log(one + num);       
      }

      addOne(5);             //    내부 Lexical환경  num : 5


                                      //   전역 Lexical환경  makeAdder: function  , add2 : function
     function makeAdder(x){          // 2  makeAdder Lexical환경  x : 3 
          return  function (y){     //  1  익명함수 Lexical환경   y : 2
                return x + y;      //  익명함수는 y를 가지고 있고  
           }                      //   상위함수인 makeAdder 의 x 에 정근 가능!.
     }

     const add2 = makeAdder(3);    //  이자리에  function(y){ return 3 + y; } 이 남게된다.                                 
     console.log(add2(2));  // 5

     const add3 = makeAdder(10);       //   Closure : 함수와 렉시컬 환경의 조합.
     console.log(add3(5));  // 15                     함수가 생성될 당시의 외부 변수를 기억.
     console.log(add2(1));  // 4                      생성 이후에도 계속 접근 가능!.
 //  add2 함숨가 생성된 이후에도 상위함수인 makeAdder 의 x 에 접근 가능!.
//   외부 함수의 실행이 끝나서 외부 함수가 소멸된 이후에도 내부 함수가  
//   외부 함수의 변수에 접근 할수있다.

//   add3(5) 와 add2(1) 는 서로 다른 환경을 가지고 있다.


     function makeCounter(){
        let num = 0;   // 은닉화 
        
        return function (){
            return num++;
        }
     }

     let counter = makeCounter();
     console.log(counter());   // 0
     console.log(counter());   // 1
     console.log(counter());   // 2
     console.log(counter());   // 3
 //  내부 함수 에서 외부 함수의 변수 즉 num 에 접근한다. 
//   이렇게 생성된 이후에 계속 기억 하고 있는거다.