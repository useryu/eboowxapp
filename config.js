/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = '12849517.ebooboo.cn';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `https://${host}/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `https://${host}/user`,

        playEndUrl: `https://${host}/audio/playend`,

        audioListUrl:  `https://${host}/audio/list`,

        getLevelQuizUrl:   `https://${host}/quiz/getLevelQuiz`,

        getChildLevelQuiz: `https://${host}/quiz/getChildLevelQuiz`,

        getBookQuiz:    `https://${host}/quiz/getBookQuiz`,

        submitBookQuizPoint: `https://${host}/quiz/submitBookQuizPoint`,

        submitLevelPoint: `https://${host}/quiz/submitLevelPoint`,

        switchToBook:    `https://${host}/user/switchToBook`,

        // 测试的信道服务地址
        tunnelUrl: `https://${host}/tunnel`,
    }
};

module.exports = config;