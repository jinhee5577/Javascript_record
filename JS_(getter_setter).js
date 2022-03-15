
// JavaScript - 접근자 프로퍼티 (getter, setter).

// 1. 프로퍼티의 종류
// - 데이터 프로퍼티(data property) : 값을 저장하기 위한 프로퍼티. 일반적으로 사용하는 프로퍼티는 데이터 프로퍼티 이다.
// - 접근자 프로퍼티(accessor property) : 값이 없음. 프로퍼티를 읽거나 쓸 때 호출하는 함수를 값 대신에 지정할 수 있는 프로퍼티 이다. 
//   접근자 프로퍼티의 본질은 함수인데, 이 함수는 값을 획득(get)하고 설정(set)하는 역할을 담당합니다. 그런데 외부 코드에서는 함수가 아닌
//   일반적인 프로퍼티처럼 보인다.

// 2. 접근자 프로퍼티
// - 접근자란 객체 지향 프로그래밍에서 객체가 가진 프로퍼티 값을 객체 바깥에서 읽거나 쓸 수 있도록 제공하는 메서드를 말한다. 
//   객체의 프로퍼티를 객체 바깥에서 직접 조작하는 행위는 데이터의 유지 보수성을 해치는 주요한 원인이다. 


//  getter와 setter
//  접근자 프로퍼티는 'getter(획득자)'와 ‘setter(설정자)’ 메서드로 표현된다. 
//  객체 리터럴 안에서 getter와 setter 메서드는 get과 set으로 나타낼 수 있다.

let obj = {
        get propName() {
          // getter, obj.propName을 실행할 때 실행되는 코드
        },
    
        set propName(value) {
          // setter, obj.propNAme = value를 실행할 때 실행되는 코드
        }
  };

// - getter 메서드는 obj.propName을 사용해 프로퍼티를 읽으려고 할 때 실행된다.
// - setter 메서드는 obj.propNAme = value으로 프로퍼티에 값을 할당하려 할 때 실행된다.


// 1 getter 메서드

let user = {
        name: "John",
        surname: "Smith",
    
        get fullName() {
           return `${this.name} ${this.surname}`;
        }
  };
  
  alert(user.fullName); // John Smith

// 바깥 코드에선 접근자 프로퍼티를 일반 프로퍼티처럼 사용할 수 있다. 접근자 프로퍼티를 사용하면 함수처럼 호출 하지 않고, 
// 일반 프로퍼티에서 값에 접근하는 것처럼 평범하게 user.fullName을 사용해 프로퍼티 값을 얻을 수 있다. 
// 나머지 작업은 getter 메서드가 뒷단에서 처리해준다.

// 위 예시의 fullName은 getter 메서드만 가지고 있기 때문에 user.fullName=을 사용해 값을 할당하려고 하면 에러가 발생한다.

  user.fullName = "Test"; // Error (프로퍼티에 getter 메서드만 있어서 에러가 발생한다.)


// 2 setter 메서드
  
let user2 = {
        name: "John",
        surname: "Smith",
    
        get fullName() {
           return `${this.name} ${this.surname}`;
        }
        
        set fullName(value) {
           [this.name, this.surname] = value.split(" ");
        }
  };
  
  // 주어진 값을 사용해 set fullName이 실행된다.
  user2.fullName = "Alice Special"
  
  alert(user2.fullName); // Alice Special
  alert(user2.name); // Alice
  alert(user2.surname); // Special
  
// * 이렇게 getter와 setter 메서드를 구현하면 객체엔 fullName이라는 '가상’의 프로퍼티가 생긴다. 
//   가상의 프로퍼티는 읽고 쓸 순 있지만 실제로는 존재하지 않는다.



//  접근자 프로퍼티 설명자

//  데이터 프로퍼티의 설명자와 접근자 프로퍼티의 설명자는 다르다.
//  접근자 프로퍼티엔 설명자 value와 writable가 없는 대신에 get과 set이라는 함수가 있다.
//  따라서 접근자 프로퍼티는 다음과 같은 설명자를 갖는다.

//  * get – 인수가 없는 함수로, 프로퍼티를 읽을 때 동작함.
//  * set – 인수가 하나인 함수로, 프로퍼티에 값을 쓸 때 호출됨.
//  * enumerable – 데이터 프로퍼티와 동일함.
//  * configurable – 데이터 프로퍼티와 동일함.

//  아래와 같이 defineProperty에 설명자 get과 set을 전달하면 fullName을 위한 접근자를 만들 수 있다.


let user = {
      name: "John",
      surname: "Smith"
  };
  
    Object.defineProperty(user, 'fullName', {
          get() {
             return `${this.name} ${this.surname}`;
          },
        
          set(value) {
             [this.name, this.surname] = value.split(" ");
          }
    });
  
  alert(user.fullName); // John Smith  
  for(let key in user) alert(key); // name, surname   


// * 프로퍼티는 접근자 프로퍼티(get/set 메서드를 가짐)나 데이터 프로퍼티(value를 가짐) 
//   중 한 종류에만 속하고 둘 다에 속할 수 없다는 점을 항상 유의하시기 바랍니다.




// 3. getter와 setter 똑똑하게 활용하기

// 일반적으로 이름을 읽고 수정하는 객체는 다음과 같이 이름을 수정하는 메서드 setName()을 포함하고 있다.

let user3 = {
        name: '',
        setName(value) {
           if (value.length < 4) {
               alert("입력하신 값이 너무 짧습니다. 네 글자 이상으로 구성된 이름을 입력하세요.");
               return;
           }
           this.name = value;
        }
  };
  
  user3.setName("Pete");
  alert(user3.name);  // Pete  
  user3.setName("");  // 너무 짧은 이름을 할당하려 함


//  그러나 getter와 setter를 ‘실제’ 프로퍼티 값을 감싸는 래퍼(wrapper)처럼 사용하면, 
//  메서드를 새로 만드는 일 없이 프로퍼티 값을 원하는 대로 통제할 수 있다.  


let user = {
    get name() {
      return this._name;
    },
  
    set name(value) {
      if (value.length < 4) {
        alert("입력하신 값이 너무 짧습니다. 네 글자 이상으로 구성된 이름을 입력하세요.");
        return;
      }
      this._name = value;
    }
  };
  
  user.name = "Pete";
  alert(user.name); // Pete
  
  user.name = ""; // 너무 짧은 이름을 할당하려 함


// user의 이름은 _name에 저장되고, 프로퍼티에 접근하는 것은 getter(user.name)와 setter(user.name = value)를 통해 이뤄진다.
// 기술적으론 외부 코드에서 user._name을 사용해 이름에 바로 접근할 수 있다. 그러나 밑줄 (user._name) 로 시작하는 프로퍼티는
// 객체 내부에서만 활용하고, 외부에서는 건드리지 않는 것이 관습이다. 위의 예제에서 user.name을 통해 프로퍼티에 접근하고 
// 수정하는 것 처럼 user._name을 직접적으로 사용하지는 않는 것이 좋다.



// 이분의 사이트를 통해 getter, setter 내용을 정확히 이해할수 있었습니다.
// 사이트 : https://velog.io/@bigbrothershin/JavaScript-%EC%A0%91%EA%B7%BC%EC%9E%90-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-getter-setter