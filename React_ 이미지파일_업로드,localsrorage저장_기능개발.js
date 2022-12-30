import React, { useEffect, useState, useRef, } from 'react';


function Client (){
    let imgRef = useRef();
    let imgURL;
    
    let loadImg = (e) => { 
        if(!e.target.files[0]){ 
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