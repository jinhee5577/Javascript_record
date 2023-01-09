// CORS란?
// 간단히 말하자면 서로 다른 출처(Origin) 간에 리소스를 전달하는 방식을 제어하는 체제이며, 
// CORS 요청이 가능하려면 서버에서 특정 헤더인 Access-Control-Allow-Origin과 함께 응답할 필요가 있다.
// 예를 들어 클라이언트 포트가 3000번이고 서버 포트가 8000번일 때 클라이언트에서 서버로 리소스를 
// 요청했을때 CORS 에러 메시지가 클라이언트 콘솔에 빨갛게 뜨고 데이터를 주지 않게 된다. 
// 그래서 동일한 출처에서 리소스를 요청하면 된다.



// 클라이언트: http-proxy-middleware 사용하기
// 만약 open API 요청시 발생할수 있는 CORS이슈 해결방법중 하나인  http-proxy-middleware 를 만들어 해결.
// 1). npm i http-proxy-middleware -D 를 이용하여 라이브러리를 설치한다.   
// 2). 프로젝트 내 src폴더 내에 setupProxy.js 파일 하나만듬.
// 3). setupProxy.js 내에 아래코드 처럼작성.


const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(   // setupProxy파일에서 이 프로젝트 내에서 타겟주소를 String 변수 '/api'로 사용하겠다고 설정한다.
    '/api',   // /api로 시작하는 경로일 경우
    createProxyMiddleware({
      target: 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json',   // 요청 url 앞에 target을 붙여주기
      changeOrigin : true,
      pathRewrite: {
        '^/api': '',   // /api에 해당하는 url을 없애기
      },
    }),
  );
};


// axios.get() 요청 에서는 이렇게 작성한다.

let featch_hansan = async () => {
    try {
       let url = '/api?key=96972ad419e3d1247b5d7fe574829c32&movieCd=20209343';  // /api 로 시작하게 url 작성 하여 proxy 파일에서 url을 재조정한다. 
       let {data : {movieInfoResult : { movieInfo } }} = await axios.get(url);
       console.log(movieInfo);
       Sethansan_movie(movieInfo);     
    } catch(error){
        console.log(error);
    }    
}; 


// 이렇게 작성해준다면 cors error를 해결할 수 있다.