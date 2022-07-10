// 만약 open API 요청시 발생할수 있는 CORS이슈 해결방법중 하나인  http-proxy-middleware 를 만들어 해결.
// 1). 프로젝트 내 src폴더 내에 setupProxy.js 파일 하나만듬.
// 2). setupProxy.js 내에 이렇게 작성


const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
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