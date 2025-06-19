

// let baseUrl = window.location.href.indexOf("?") > -1 ? window.location.href.split("?")[0] : window.location.href
// if (baseUrl[baseUrl.length - 1] != "/") {
//     baseUrl += "/"

const util = require("../helper/util");

// }

// baseUrl += "testData/"

let baseUrl = "https://bgame.bartervip.com/api/"

const apiUrl = {

    baseUrl:  baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': "zh-cn"
    },
    getApis: {
        userInfo: "member",
        dateBar: "sessions",

    },
    postApis: {
        gameData: "load",
        vote: "vote",
        sessionData: "session",
        submitName: "login",
        play: "play",
        bullet: "bulletData.json",
        attack: "play",
        leaderboard: "leaderboard",
        history: "history",
       
       
        claim: "claim/store",
    }


}


apiUrl.token=util.getUrlParam("token");
module.exports = apiUrl;