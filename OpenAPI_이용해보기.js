 /*eslint-disable*/ 
 import React, { Component, useEffect, useState, useRef, } from 'react';
 import axios from "axios";
 import './App.css';
 
 // 또다른 Rect폴더에서 OpenAPI를 axios를 이용하여 가져왔고, 원하는 기능을 추가하여 개발한 코드내용만을 
 // 이곳에 옮겨왔습니다.
 // 한국도로공사 OpenAPI 이용해보기 +  클릭시마다 15개 data가 추가 된다.
 
 function Traffic(){ 
     let [traffic, Settraffic] = useState([]);
     let [extra, Setextra] = useState([]);  
 
     let car_axios = async () => { 
         let url = 'http://data.ex.co.kr/openapi/trafficapi/nationalTrafficVolumn?key=4652599945&type=json&sumDate=20220310';
         let {data : {list}} = await axios.get(url);
         let list_splice = list.splice(0, 15);
      //   console.log(list_splice);
         Setextra(list);   // 195 개남음
         Settraffic(list_splice);
     }
     
     let add_data = () => {  // 클릭할때마다 15개 data가 추가 된다.
         if(extra.length > 0){
             let copy_extra = [...extra];
             let splice = copy_extra.splice(0, 15);  
             Settraffic([...traffic, ...splice]);   
             Setextra(copy_extra);    // 다시 15개 뺀 data배열을 state에 넣어준다.
             console.log(copy_extra);
         } else { window.alert('정보가 끝입니다.'); }       
     }
 
     useEffect(() => {
         car_axios();
         
     }, []);
 
 
     return (
         <div id="traffic">
           <div className='main'>
              {
                 traffic.map((item, i) => { 
                     return (
                         <article key={i} style={{ color : "whtie" }}>
                             <h3>일자별 교통량 현황 {i + 1} </h3>  
                              <p>측정일자 : {item.sumDate}</p>     
                              <p>집계주체구분 : {item.exDivCode}</p>     
                              <p>하이패스/일반구분 : {item.tcsType}</p>     
                              <p>차종구분 : {item.carType}</p>     
                              <p>대량 : {item.trafficVolumn}</p>                                   
                         </article>
                     );
                  })
              }   
              <button onClick={add_data}>더보기</button>  // 클릭시마다  15개 data가 더 가져온다.
           </div>        
         </div>
     );
 }
 
 export default Traffic;