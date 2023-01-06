//  react에서 fetch()함수를 이용하여 get요청시 여러개의 params가 필요할경우 요청코드. 

function Test() {  // 컴포넌트
  
    const getXMLfromAPI = async () => {
        // 국토교통부 xml
        const baseurl = 'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade';         
        const key ='발급받은키';        
        const params = {  // 필요한 query params를 {} 형태에 담아준다.
            serviceKey : key,
            LAWD_CD : 11110,
            DEAL_YMD : 201510,
        };

        const queryString = new URLSearchParams(params).toString();  // url에 쓰기 적합한 querySting으로 return 해준다. 
        const requrl = `${baseurl}?${queryString}`;   // 완성된 요청 url.
      
        try{
           const response = await fetch(requrl); 
           const xmlString = await response.text();  // 해석할 xml문자열.
           console.log(xmlString);
        }catch(error){
           console.log(error); 
        }

    };

    useEffect(() => { 
       getXMLfromAPI();  // api요청 함수실행.
    }, []);

}       