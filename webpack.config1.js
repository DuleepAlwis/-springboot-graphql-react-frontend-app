/*module.exports = {
    resolve:{
        fallback:{ "path": false }
    }
}*/


module.exports = function (webpackEnv) {
    // ...
    return {
     // ...
      resolve: {
        // ...
        fallback: {
          // 👇️👇️👇️ add this 👇️👇️👇️
          "fs": false,
          "os": false,
          "path": false,
        }
      }
    }
  }