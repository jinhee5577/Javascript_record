// javascript XML to JSON 변환

// 내 react프로젝트에서 국토부공공api를 가져와보기위해 검색을 하던중 data형태가 
// jsoon형태가 아닌 xml형태가 많았다.
// 그리하여 xml을 json형태로 변형 하는방법을 검색하여 기록을 남긴다.
// 방법은 라이브러리를 이용하는 방법과, Vanila JS를 사용하는 방법이 있었다.

// 이번방법은 Vanila JS를 이용하여 xml -> json 으로 변환 하는 방법이다.


// 아래코드가 xml => json 변환 xmlToJson함수 이다.
// 이렇게 js파일을 만들어 함수를 선언한후 export 해주었다.

const xmlToJson = (xml) => {   // xml => json 변환 xmlToJson함수
    // Create the return object
    let obj = {};
  
    if (xml.nodeType == 1) {
        // element
        // do attributes
      if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (let j = 0; j < xml.attributes.length; j++) {
               let attribute = xml.attributes.item(j);
               obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
      }
    } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
    }
  
    // do children
    // If all text nodes inside, get concatenated text from them.
    let textNodes = [].slice.call(xml.childNodes).filter(function(node) {
        return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
        obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
                 return text + node.nodeValue;
        }, "");
    } else if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
             let item = xml.childNodes.item(i);
             let nodeName = item.nodeName;
             if (typeof obj[nodeName] == "undefined") {
                 obj[nodeName] = xmlToJson(item);
            } else {
               if (typeof obj[nodeName].push == "undefined") {
                   let old = obj[nodeName];
                   obj[nodeName] = [];
                   obj[nodeName].push(old);
               }
               obj[nodeName].push(xmlToJson(item));
            }
        }
    }

    return obj;
  }  


export default xmlToJson;



// 아래코드는 API 호출 컴포넌트 파일이다.

function Test() {  // 컴포넌트 
  
    const getXMLfromAPI = async () => {  // 국토교통부 xmlAPI요청 함수
        // 국토교통부 xml
        const baseurl = '/api';  // setupProxy파일에서 설정해둔 /api     
        const key ='발급받은키';        
        const params = {
            serviceKey : key,
            LAWD_CD : 11650,
            DEAL_YMD : 202205,
        };
        
        const queryString = new URLSearchParams(params).toString();
        const requrl = `${baseurl}?${queryString}`;
      
        try{
           const response = await fetch(requrl); 
           const xmlString = await response.text();  // 해석할 xml문자열.
           const XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');  // xml로 변형

           // import해온 xmlToJson함수 안에 변형한 XmlNode를 넣어준다. 그러면 json객체를 return해준다.
           const {response : {body : {items : { item }}}} = xmlToJson(XmlNode);   // 구조분해할당 으로 data를 변수에 저장해줌.
           console.log(item);
        }catch(error){
           console.log(error); 
        }
    };

    useEffect(() => { 
       getXMLfromAPI();   // xmlAPI요청 함수를 호출해즘.

    }, []);

}