// 내 React프로젝트에서 원하는 지역을 선택할수 있는 selectBox를 만들어야 했다.
// 복잡해 질듯싶어서 검색을통해 구현방법을 알아냈고, react에서 적용할수있도록 코드를 바꿨다.
// 그런데 jquery로 구현 하는 방식이였다. 왠만하면 내 react프로젝트에서는 jquery를 안쓰고 싶었는데 
// 여러검색 결과 대부분 jquery로 구현하는 방식이라 이번만 jquery를 사용했다.

// 우선 내 React 프로젝트에 jquery를 설치해야한다.
// 프로젝트폴더 터미널에 npm install jquery 라고 명령을 친다.
// 사용하는 js파일에서 상단에 jquery를 import 해온다.  import $ from 'jquery';  <- 이런식으로.


// 나는 selectBox 생성함수가 길어질듯 해서 다른파일에서 함수작성후 export해서 가져올것이다.



// selectBOX.js 

import $ from 'jquery';


export function selectBOX (){   // 시/도/군/구 selectBOX 생성함수
     let area0 = ["시/도 선택","서울특별시","인천광역시","대전광역시","광주광역시","대구광역시","울산광역시","부산광역시","경기도","강원도","충청북도","충청남도","전라북도","전라남도","경상북도","경상남도","제주특별자치도"];
     let area1 = ["구/군 선택","강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
     let area2 = ["구/군 선택","계양구","미추홀구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"];
     let area3 = ["구/군 선택","대덕구","동구","서구","유성구","중구"];
     let area4 = ["구/군 선택","광산구","남구","동구","북구","서구"];
     let area5 = ["구/군 선택","남구","달서구","동구","북구","서구","수성구","중구","달성군"];
     let area6 = ["구/군 선택","남구","동구","북구","중구","울주군"];
     let area7 = ["구/군 선택","강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"];
     let area8 = ["구/군 선택","고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군"];
     let area9 = ["구/군 선택","강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"];
     let area10 = ["구/군 선택","제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"];
     let area11 = ["구/군 선택","계룡시","공주시","논산시","보령시","서산시","아산시","천안시","금산군","당진군","부여군","서천군","연기군","예산군","청양군","태안군","홍성군"];
     let area12 = ["구/군 선택","군산시","김제시","남원시","익산시","전주시","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군"];
     let area13 = ["구/군 선택","광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"];
     let area14 = ["구/군 선택","경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"];
     let area15 = ["구/군 선택","거제시","김해시","마산시","밀양시","사천시","양산시","진주시","진해시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군"];
     let area16 = ["구/군 선택","서귀포시","제주시",];
 
     
     // 시/도 선택 박스 초기화
     $("#sido1").each(function(i, item) {
         if(i == 0){
            let $selsido = $(this);
            $.each(eval(area0), function() {
              $selsido.append("<option value='"+this+"'>"+this+"</option>");
            });
            $selsido.next().append("<option value=''>구/군 선택</option>");
         }        
     });
     
     // 시/도 선택시 구/군 설정
     $("select[name^=sido]").change(function(e) {
        let area = "area"+$("option",$(this)).index($("option:selected",$(this))); // 선택지역의 구군 Array
        let $gugun = $(this).next(); // 선택영역 군구 객체
        $("option",$gugun).remove(); // 구군 초기화        
      
        if(area == "area0")
           $gugun.append("<option value=''>구/군 선택</option>");
        else {
          $.each(eval(area), function() {
             $gugun.append("<option value='"+this+"'>"+this+"</option>");
          });        
        }
        
     });       
 }


 
 // 컴포넌트 페이지. RealEstate.js

 import React, { useEffect, useState, useRef, } from 'react';
 import { selectBOX } from '../aesset/data.js';

 
function RealEstate () {  // 컴포넌트.

    useEffect(() => { 
        selectBOX();  // 시/도/군/구 selectBOX 생성함수를 컴포넌트가 로드 되자마자 실행해준다.
    
    }, []);

    return (
       <div>
          <select name="sido1" id="sido1"></select>
          <select name="gugun1" id="gugun1"></select>
       </div> 
    );
}
 

// 이렇게 작성하면 원하는 시/도를 선택하고 그뒤 select박스에서 해당지역 관할 구/군이 나열된다.
// 구현완료.


// 참고사이트 : https://chichi-story.tistory.com/18 