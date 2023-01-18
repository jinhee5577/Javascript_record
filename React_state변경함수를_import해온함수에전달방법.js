// 내 React 프로젝트에서 state변경함수를 컴포넌트가 아닌 import해온 일반함수에 전달해야만했다.
// 컴포넌트가 아닌 다른파일에 있는 일반함수에서 전달한 state변경함수를 사용할수있을까?,
// 그럼 이걸 어떻게 전달해야할까? 고민을 많이 했었다.

// 여러 시도와 고민끝에 해결방법을 구현했고, 나의 계획데로 state가 잘변경되었다.

// 코드를 보면서 설명하겠다.


import React, { useEffect, useState, useRef, } from 'react';
import { selectBOX } from '../aesset/data.js';


function RealEstate () { 
    let [selectSido, SETselectSido] = useState('');   // 선택한 시/도 담을 state.
    const postOBJ = {setState : SETselectSido};   // data.js에 있는 함수에 보내기위해, state변경함수를 object에 담았다.

    // 기타 다른코드 생략.

    useEffect(() => { 
      selectBOX(postOBJ);  // import해온 함수에 파라미터로 postOBJ를 넣어주고 호출.

    }, []);

    // 기타 다른코드 생략.
};

export default RealEstate;




// data.js 코드

export function selectBOX ({ setState }){   
       // selectBOX함수에서 인자로 받은 object를 구조분해할당 으로 state변경함수를 가져온다.
       // key이름을 setState로 지정했으니 컴포넌트쪽 전송할 오브젝트key도 setState로 맞추어 주어야한다.
       // 오브젝트key에 담아와서 state변경함수 기능을 그데로 사용할수있다.

       
       // 기타 다른코드 생략.

       setState(변경하고싶은값); 
      // 이렇게 변경하고싶은값을 넣어 변경함수를 실행하면, 컴포넌트 쪽에서는 state가 계획데로 잘변경되어있다!.

};


// 이런 시도와 고민을 거쳐 구현하고 싶었던 기능을 완성했다!.