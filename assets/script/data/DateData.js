const fetcher = require("fetcher");
const apiUrl = require("../net/apiUrl");
const { GAME_ACTION } = require("./GameEnum");
const { DEBUG } = require("./debug");
const { SOCKET_ENUM } = require("./SocketEnum");

cc.Class({
    extends: fetcher,

    ctor() {

        this.data = {
            "username": "jack****",
            "userId": 0,
            "isKiller": true,
            "killBy": "jack****",
            "killed": false,
            "name": "Tower A",
            "towerLvl": 3,
            "towerId": 0,
            "totalHp": 20000,
            "hp": 100,
            "bulletBalance": 5,
            "bulletLvl": 1,
            "bulletId": 0,
            "power": 5
        }
    },

    statics: {
        instance: null
    },

    onLoad() {


        this.emitPoint = cc.find("emitPoint")
        // this.postDateData();
        this.emitPoint.on(SOCKET_ENUM.SOCKET_MESSAGE, this.socketMessage.bind(this))
        this.emitPoint.on(GAME_ACTION.POST_DATE_DATA, this.postDateData.bind(this));

        // cc.game.on(cc.game.EVENT_SHOW, this.postDateData.bind(this));

        // this.looper = setInterval(this.postDateData.bind(this),10000);
    },

    postDateData($data) {
        let url = this.baseUrl + apiUrl.getApis.dateBar;
        let data = undefined;
        return this.post(url, data)
    },

    socketMessage($data) {
        // {
        //   "action": "countdown",
        //   "message": "Time remaining: 147 seconds",
        //   "seconds": 147,
        //   "sessionId": "1"
        // }


        if ($data.action == "countdown") {
            if (this.data.status == "Future") {
                this.postDateData();

            }
        } else if ($data.action == "sessionOver") {
            this.postDateData();
        } else if ($data.action == "sessionStart") {
            this.postDateData();
        } else if ($data.action == "sessionCreate") {
            this.handleData($data);

        }


    },

    handleData($data) {
        console.log("DateData SUCCESS", $data)
        const data = $data.data;

        data.unshift({
            "date": "",
            "dateText": "",
            "statusId": 2,
            "status": "",
            "canPlay": false,
            "isToday": false
        })

        data.push({
            "date": "",
            "dateText": "",
            "statusId": 2,
            "status": "",
            "canPlay": false,
            "isToday": false
        })
        this.data = data;


        this.emitPoint.emit(GAME_ACTION.DATE_SUCCESS, data)

    },

    successHandler($data) {

        if ($data.error != 200) {
            this.errorHandler($data)
            return;
        }

        this.handleData($data)

    },

    errorHandler($data) {
        // console.log("DateData ERROR", $data)
        this.emitPoint.emit(GAME_ACTION.DATE_, $data)
    }

});
