// 메소드 오버라이딩


class Car {   // 부모 클래스
    constructor(color){
        this.color = color;
        this.wheels = 4;
    }
    drive(){
       console.log("drive..");  //메소드는  Prototype 으로 들어간다.
    }    
    stop(){
       console.log('STOP!!');   //메소드는  Prototype 으로 들어간다.
    }
}

class BMW extends Car {
    park(){
        console.log("PARK!");  //메소드는  Prototype 으로 들어간다.
    }
    stop(){
        console.log('OFF!!');  //메소드는  Prototype 으로 들어간다.
     }    
}

let z2 = new BMW("white");
console.log(z2);   // => BMW {color: 'white', wheels: 4}
console.log(z2.stop());   //  =>  OFF!!  부모 class 메소드 를 덮어 씌어버린다.


class BMW extends Car {
    park(){
        console.log("PARK!");    //메소드는  Prototype 으로 들어간다.
    }
    stop(){
        super.stop();       // super키워드를 이용하면 부모클래스의 정의된 메소드를 사용할수있다.
        console.log('OFF!!');    //메소드는  Prototype 으로 들어간다.
     }    
}

let z3 = new BMW("white");
console.log(z3.stop());    //   STOP!!  OFF!!  두개 다나온다.


class BENZ extends Car{
    constructor(){
        this.navigation = 1;    // 새로운 필즈를 추가 하고싶다면 ?!
    }

    park(){
        console.log("PARK!");   
    }
    stop(){
        super.stop();       // super키워드를 이용하면 부모클래스의 정의된 메소드를 사용할수있다.
        console.log('OFF!!');    
     } 
}

let bz = new BENZ('bule');
console.log(bz);   // 그냥 이렇게 하면 에러가 난다.  자식클래스 에서 this를 사용하기 전에 super constructor !!즉!!
                   // 부모생성자를 반드시! 먼저 호출해야한다!.  자식클래스는 빈{} 가 만들어지고, this에 할당하는 이 작업을 건너뛴다.


class BENZ extends Car{
    constructor(color){    //  여기에 color 를 받고 부모constructor로 넘겨줘야 한다!.
        super(color);     // 항상 super키워드로 부모클래스의 constructor를 호출해줘야 된다!.
        this.navigation = 1;    // 새로운 필즈를 추가 하고싶다면 ?!

        // 자식클래스에서 constructor를 쓸려면 무조건!! super()를 부모생성자를 호출하고!, this.프로퍼티 = any; 이렇게 할당해줘야 한다!!.
    }

    park(){
        console.log("PARK!");   
    }
    stop(){
        super.stop();       // super키워드를 이용하면 부모클래스의 정의된 메소드를 사용할수있다.
        console.log('OFF!!');    
        } 
    }
  
let bz2 = new BENZ('bule');
console.log(bz2);     //  BENZ {color: 'bule', wheels: 4, navigation: 1} 이렇게 원하는 결과가 나온다.