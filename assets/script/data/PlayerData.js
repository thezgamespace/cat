const fetcher = require("fetcher");
const apiUrl = require("../net/apiUrl");
const { GAME_ACTION } = require("./GameEnum");
const { DEBUG } = require("./debug");
const util = require("../helper/util");
const { SOCKET_ENUM } = require("./SocketEnum");

const PlayerData = cc.Class({
    extends: fetcher,
    properties: {

        usernameText: {
            type: cc.Label,
            default: null
        },

    },
    ctor() {

        this.playerData = {
            "user_id": 1002,
            "username": "pef123",
            "total_deposit": 0,
            "total_tokens_attained": 170,
            "remaining_token": 0,
            "total_winnings": 559,
            "silver_free_chance": 0,
            "gold_free_chance": 0,
            "platinum_free_chance": 0
        }
    },

    statics: {
        instance: null
    },

    onLoad() {

        PlayerData.instance = this;
        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.SUBMIT_NAME_POST, this.getPlayerData.bind(this))
        this.emitPoint.on(GAME_ACTION.BUY_SUCCESS, this.updateBalance.bind(this))
        // this.emitPoint.on(GAME_ACTION.TOWER_DEAD, this.postGetPlayerData.bind(this))

        // this.emitPoint.on(GAME_ACTION.RELOAD_PLAYER, this.postGetPlayerData.bind(this))

        // cc.game.on(cc.game.EVENT_SHOW, this.postGetPlayerData.bind(this));

        // this.emitPoint.on(SOCKET_ENUM.SOCKET_MESSAGE, this.socketMessage.bind(this))

        // this.postGetPlayerData()

    },


    socketMessage($data) {
        // {
        //   "action": "countdown",
        //   "message": "Time remaining: 147 seconds",
        //   "seconds": 147,
        //   "sessionId": "1"
        // }


        if ($data.action == "sessionOver") {
            this.postGetPlayerData();

        }


    },

    successHandler($response) {
        console.log("SUCCESS get player data", $response,)

        if ($response.error == 200 && $response.data) {


            this.playerData = $response.data;
            this.usernameText.string = this.playerData.username;
            // this.playerData.platinum_free_chance = 9
            // this.playerData.token = 0

            this.emitPoint.emit(GAME_ACTION.USER_DATA_SUCCESS, this.playerData)


        }


        // if ($response.error == 200) {


        //     this.playerData = $response.data;

        //     // this.playerData.platinum_free_chance = 9
        //     // this.playerData.token = 0

        //     this.emitPoint.emit(GAME_ACTION.USER_DATA_SUCCESS, this.playerData)


        // }
    },


    postGetPlayerData() {


        if (DEBUG) {
            this.successHandler({
                user_id: 0,
                username: "",
                token: 100,
                total_deposit: 0,
                total_tokens_attained: 0,
                remaining_token: 0,
                total_winnings: 0,
            })
        } else {
            console.log("memberrrrr")
            let url = this.baseUrl + apiUrl.getApis.userInfo;
            let data = undefined;
            return this.post(url, data)
        }

    },


    errorHandler($error) {
        // console.log("ERROR get player data", $error)
        this.emitPoint.emit(GAME_ACTION.USER_DATA_ERROR, $error)
    },

    getPlayerData() {
        return this.playerData;
    },

    updateBalance(data) {
        this.playerData.token = data.token;
    },


    getBalance() {
        return this.playerData.token;
    }
});
