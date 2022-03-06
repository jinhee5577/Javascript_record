// Class 

let User = function (name, age){
    this.name = name;
    this.age = age;     
    this.showName = function(){
         console.log(this.name);
    }
};

let jinhee = new User('jinhee', 30);  // User {name: 'jinhee', age: 30, showName: ƒ}


let User1 = function (name, age){
    this.name = name;
    this.age = age;     
    // this.showName = function(){
    //      console.log(this.name);
    // }
};

User1.prototype.showName = function(){
    console.log(this.name);
}

let nct = new User1('태용', 25);   //  User1 {name: '태용', age: 25}  
                                  //   [[Prototype]]: Object   showName: ƒ ()   constructor: ƒ (name, age)


class User2 {
    constructor(name, age){   
        this.name = name;
        this.age = age;
    }

   showName(){
        console.log(this.name);
   }
}

let naver = new User2('naver', 23);   //  User2 {name: 'naver', age: 23} 
                                     //   [[Prototype]]: Object   constructor: class User2   showName: ƒ showName() 
                           

//  class 라는 키워드를 사용하고 내부에는 constructor가 있다.
//  constructor는 객체를 만들어주는 생성자 메서드 이다.
//  showName 처럼 class내에 정의한 메서드는 User2의 프로토타입에 저장된다.


jinhee.showName();   //  jinhee
naver.showName();   //   naver


for(let p in nct){
    console.log(p);    //   name  age  showName  
}

for(let p in naver){
    console.log(p);   //    name  age           class의 메서드는  for in 문 에서 제외된다.
}



// 상속

class Car{
    constructor(color){
        this.color = color;
        this.wheels = 4;
    }
    drive(){
        console.log('drive~~~! ho!!');
    }
    stop(){
        console.log('STOP!!!');
    }
}


class BMW extends Car{
    park(){
        console.log('PARK!!~');
    }   
}

let jinCar = new BMW('white');    //   BMW {color: 'white', wheels: 4}
                                 //    [[Prototype]]: Car
                                //        constructor: class BMW
                               //         park: ƒ park()
                              //          [[Prototype]]: Object
                             //             constructor: class Car
                            //              drive: ƒ drive()
                           //               stop: ƒ stop()
