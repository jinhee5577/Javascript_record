//  1. toString()
//  2. String()
//  3. Template String (템플릿 문자열)


toString();

const str1 = 34564;
      str1 = str1.toString();   //  '34564'
const str2 = (123).toString();  //  '123'
const str3 = (3).toString(2);   //  '11'

//  toString() 메소드를 호출하여 숫자를 문자열로 변환하였다.
//  이 경우, toString()의 파라미터로 base 숫자를 입력해줄 경우, 해당 진법으로 숫자를 변환하여 문자열로 리턴한다.



String();

const str4 = 45643;
      str4 = String(str4);     //  '45643'
const str5 = String(123);      //  '123' 
const str6 = String(123.1);    //  '123.1'



//  Template String (템플릿 문자열)

const number1 = 123.1;
const number2 = 123;
const str7 = `${number1}`;    //  '123.1'
const str8 = `${number2}`;    //  '123' 

//  ES6 문법인 Template String(템플릿 문자열)을 이용해서 숫자를 문자열로 변환하였다.
//  템플릿 문자열은 백틱(`)으로 문자열을 감싸서 표현하고, '${}' 안에 Javascript 변수를 넣으면 
//  해당 변수의 값을 대응시켜서 문자열을 만들어 준다.




//   출처: https://hianna.tistory.com/491 [어제 오늘 내일:티스토리]