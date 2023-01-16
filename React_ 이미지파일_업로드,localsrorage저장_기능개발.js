// 내 React프로젝트에서 간단하게 사진과,이름을 저장하는 프로필페이지를 만들어보고싶었다.
// 그래서 이미지파일 업로드하는 방법을 검색하며 기능개발을 시도해보았다.


import React, { useEffect, useState, useRef, } from 'react';

function Client (){   // Client컴포넌트.
    let imgRef = useRef();
    let imgURL;
    
    let loadImg = (e) => { 
        if(!e.target.files[0]){   // input에서 받은 이미지가 없을경우 함수종료한다.
           window.alert('이미지를 선택해 주세요.');  
           return;        
        }
        let imgFile = e.target.files[0];  // input에서 받은 이미지파일 객체 저장.
        imgURL = URL.createObjectURL(imgFile);   // 이미지 URL 생성.
        console.log(imgURL); 
        
        imgRef.current.setAttribute('src', imgURL);  // 생성된 이미지URL을 선택된img요소 src속성에 넣어준다.      
    };      
    
    let IMGsave = () => {  // 저장버튼 눌렀을때.
        localStorage.setItem('profile', JSON.stringify(imgURL));  // localStorage에 이미지URL을 profile키에 저장하고,
        const profile = localStorage.getItem('profile');   // 다시 localStorage에서 img데이터 꺼내와서 변수에 저장해준다.
        const isVaild = JSON.parse(profile);

        if(!isVaild){  // undefined일때 
           console.log('o');
           window.alert('이미지를 선택해 주세요.');  
           return;  // 저장된 이미지가 없을 경우 함수를 끝낸다.  
        } 

        imgRef.current.setAttribute('src', isVaild); 
        window.alert('프로필 이미지가 저장되었습니다!.');
    };

    useEffect(() => {  // 페이지가 로드 되자마자, localStorage에서 img데이터를 가져와서 존재할경우만 img요소 src에 imURL을 넣어준다.  
       const profile = localStorage.getItem('profile');   // 다시 localStorage에서 img데이터 꺼내와서 변수에 저장해준다.
       const isVaild = JSON.parse(profile);

       if(isVaild){  // 저장된 이미지가 있을때
          imgRef.current.setAttribute('src', isVaild); 
       } else {  }      

    }, []);

     
    return (
       <div className='clientBox'>
          <h2>Profile</h2>
          <div className='profile'>
            <img ref={imgRef}/>   
          </div>  
          <form method='post' encType="multipart/form-data">
            <div className='file_button'>
               <label htmlFor='chooseFile'>IMG</label> 
            </div>
            <input type='file' id='chooseFile' accept="image/*" name='chooseImg' onChange={loadImg} />  
            
            {/* <label htmlFor='userName'>이 름</label>      */}
            <input type='text' id='userName' name='userName' placeholder='이름을 입력해 주세요.'/>     
          </form> 
          <button className='pf_save' onClick={IMGsave}>저장</button>     
       </div>
    );

}


export default Client;



// 이렇게 프로필저장 로직을 완성하여 실험으로 이미지와, 이름을 저장해보았다.
// 처음 예상데로 잘저장이 되었다!.
// 하지만 다른페이지를 이동해서 프로필페이지로 돌아오거나, 새로고침을 하면 localsrorage에 
// 저장해 놓았던 이미지url이 없는경로로 나오는것이다!.

// 저장했을당시 생성된 이미지url을 새탭주소창에 입력하면 이미지가 잘나오지만, 새로고침하거나 
// 다른페이지 이동후 돌아오면, 마찬가지로 새탭주소창에 입력했을경우 이미지url이 없는경로, 없는 이미지라고 표시되었다.

// 한참을 방법을 찾으면서 검색하다, 원인을 알게되었다.

URL.createObjectURL(imgFile);  // 이코드가 원인이였다.

// 나는 URL.createObjectURL(); 함수로 생성된 이미지url이 영구적으로 보존이 되는줄만 알았지만, 
// 이 함수를 통해 만들어진 url은 일회성 이였고, 새로고침시 저장해두었던, url은 
// 더이상 사용할수가 없다

// 그래서 다른 저장방법을 찾고, 로직을 수정하여, 내최종 목적인 
// 영구적인 프로필 이미지,이름을 잘 저장과 수정을 할수 있게되었다!.

// 수정된 과정은 다음 기록에 남기겠다.