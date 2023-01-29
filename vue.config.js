module.exports = {

    devServer: {
      proxy: {
        '/api': {
          target: 'https://christmas-q25.site/api/api',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
        overlay: false
      },
    lintOnSave: false

    }

// module.exports = {
//      // 개발 서버 설정
//     devServer: {
//         // 프록시 설정
//         proxy: {
//             // 프록시 요청을 보낼 api의 시작 부분
//             '/api': {
//                 // 프록시 요청을 보낼 서버의 주소
//                 target: 'http://localhost:5001/api'
//             }
//         }
//     }
// };