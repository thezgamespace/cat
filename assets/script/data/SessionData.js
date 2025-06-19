const fetcher = require("fetcher");
const apiUrl = require("../net/apiUrl");
const { GAME_ACTION } = require("./GameEnum");
const { DEBUG } = require("./debug");
const { SOCKET_ENUM } = require("./SocketEnum");

const BulletConfig = cc.Class({
    extends: fetcher,

    ctor() {

        this.data = {
            "sessionId": 1,
            "startTime": "2025-01-07 12:00:00",
            "endTime": "2025-01-08 23:59:59",
            "status": "Past Session",
            "canPlay": false,
            "statusId": 3,
            "bullets":
                [
                    {
                        "name": "Stone",
                        "bulletLvl": 1,
                        "bulletId": 0,
                        "price": 1,
                        "power": [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1],
                        "speed": 4500
                    },
                    {
                        "name": "Rock",
                        "bulletLvl": 2,
                        "bulletId": 1,
                        "price": 1,
                        "power": [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1],
                        "speed": 3500
                    },
                    {
                        "name": "Boulder",
                        "bulletLvl": 3,
                        "bulletId": 2,
                        "price": 10,
                        "power": [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1],
                        "speed": 2500
                    }
                ],
            "towers": [
                {
                    "name": "Tower A",
                    "tier": "Bronze & Above",
                    "eligible": false,
                    "towerLvl": 3,
                    "winAmount": 10000,
                    "towerId": 0,
                    "totalHp": 20000,
                    "hp": 20000,
                    "defeated": false,
                    "canPlay": true
                },
                {
                    "name": "Tower B",
                    "tier": "Bronze & Above",
                    "eligible": false,
                    "towerLvl": 2,
                    "winAmount": 3000,
                    "towerId": 1,
                    "totalHp": 20000,
                    "hp": 20000,
                    "defeated": false,
                    "canPlay": true
                },
                {
                    "name": "Tower B",
                    "tier": "Bronze & Above",
                    "eligible": false,
                    "towerLvl": 2,
                    "winAmount": 3000,
                    "towerId": 2,
                    "totalHp": 6000,
                    "hp": 6000,
                    "defeated": false,
                    "canPlay": true
                },
                {
                    "name": "Tower C",
                    "tier": "Norm & Bronze",
                    "eligible": false,
                    "towerLvl": 1,
                    "winAmount": 1000,
                    "towerId": 3,
                    "totalHp": 2000,
                    "hp": 2000,
                    "defeated": false,
                    "canPlay": true
                },
                {
                    "name": "Tower C",
                    "tier": "Norm & Bronze",
                    "eligible": false,
                    "towerLvl": 1,
                    "winAmount": 1000,
                    "towerId": 4,
                    "totalHp": 2000,
                    "hp": 2000,
                    "defeated": false,
                    "canPlay": true
                },
                {
                    "name": "Tower C",
                    "tier": "Norm & Bronze",
                    "eligible": false,
                    "towerLvl": 1,
                    "winAmount": 1000,
                    "towerId": 5,
                    "totalHp": 2000,
                    "hp": 2000,
                    "defeated": false,
                    "canPlay": true
                },
                {
                    "name": "Tower C",
                    "tier": "Norm & Bronze",
                    "eligible": false,
                    "towerLvl": 1,
                    "winAmount": 1000,
                    "towerId": 6,
                    "totalHp": 2000,
                    "hp": 2000,
                    "defeated": false,
                    "canPlay": true
                },
                {
                    "name": "Tower C",
                    "tier": "Norm & Bronze",
                    "eligible": false,
                    "towerLvl": 1,
                    "winAmount": 1000,
                    "towerId": 7,
                    "totalHp": 2000,
                    "hp": 2000,
                    "defeated": false,
                    "canPlay": true
                }
            ]
        }
    },

    statics: {
        instance: null
    },

    onLoad() {

        this.sessionId = 1;
        BulletConfig.instance = this;
        this.emitPoint = cc.find("emitPoint")

        this.emitPoint.on(GAME_ACTION.CHANGE_DATE, this.postSessionData.bind(this));
        // cc.game.on(cc.game.EVENT_SHOW, this.postSessionData.bind(this));
        this.emitPoint.on(SOCKET_ENUM.SOCKET_MESSAGE, this.socketMessage.bind(this))


    },


    socketMessage($data) {
        // {
        //   "action": "countdown",
        //   "message": "Time remaining: 147 seconds",
        //   "seconds": 147,
        //   "sessionId": "1"
        // }

        // {
        //     "action": "sessionStart",
        //     "sessionId": "1"
        // }


        if ($data.action == "countdown") {
            if (this.data.status == "Future") {
                this.emitPoint.emit(GAME_ACTION.POST_DATE_DATA)


            }

        } else if ($data.action == "sessionStart") {
            this.emitPoint.emit(GAME_ACTION.POST_DATE_DATA)

        }
    },

    postSessionData($data) {
        console.log($data)
        if ($data) {
            this.sessionId = $data.data.sessionId;

        }
        let url = this.baseUrl + apiUrl.postApis.sessionData;
        // let url = this.baseUrl + "session" + this.sessionId + ".json";
        url += "?sessionId=" + this.sessionId;
        return this.post(url)
    },

    successHandler($data) {
        console.log("postSessionData SUCCESS", $data)
        // console.log($data)

        if ($data.error != 200) {
            this.emitPoint.emit(GAME_ACTION.SHOW_MESSAGE, { message: $data.message })
            return
        }

        var data = $data

        this.data = data;

        this.emitPoint.emit(GAME_ACTION.SESSION_SUCCESS, data)

    },

    errorHandler($data) {
        console.log("postSessionData ERROR", $data)
        this.emitPoint.emit(GAME_ACTION.BULLET_CONFIG_ERROR, $data)
        this.emitPoint.emit(GAME_ACTION.SHOW_MESSAGE, { message: $data.message })

    },

});
