// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { GAME_ACTION } = require("../data/GameEnum");
const { SOCKET_ENUM } = require("../data/SocketEnum");

cc.Class({
    extends: cc.Component,

    properties: {
        countdownText: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.SESSION_SUCCESS, this.setSession.bind(this))
        this.emitPoint.on(SOCKET_ENUM.SOCKET_MESSAGE, this.socketMessage.bind(this))
        this.emitPoint.on(GAME_ACTION.CHANGE_DATE, this.changeDate.bind(this));
  },

    changeDate($data) {
        this.node.active = false;

    },

    setSession($data) {

        this.sessionId = $data.sessionId;


    },

    socketMessage($data) {
        // {
        //   "action": "countdown",
        //   "message": "Time remaining: 147 seconds",
        //   "seconds": 147,
        //   "sessionId": "1"
        // }


        if ($data.action == "sessionStart") {
            this.node.active = false;
        } else if ($data.action == "countdown" && this.sessionId == $data.sessionId) {
            this.node.active = true;


            this.countdownText.string = this.formatTime($data.seconds * 1000);


        }


    },

    start() {

        this.node.active = false;

    },

    // checkCountDown($data) {

    //     if (this.timer != undefined) { this.clearInterval(this.timer); }


    //     var data = this.data = $data;

    //     this.node.active = this.data.status == "Countdown";

    //     this.serverTime = new Date(data.serverTime);
    //     this.startTime = new Date(data.startTime);

    //     var clientNow = Date.now();
    //     this.serverOffset = this.serverTime.getTime() - clientNow;

    //     this.updateCountdown(); // initial call
    //     // this.timer = setInterval(this.updateCountdown.bind(this), 1000);
    // },
    formatTime(ms) {
        if (ms < 0) ms = 0;
        var totalSeconds = Math.floor(ms / 1000);
        var hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        var minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        var seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    },


    // updateCountdown() {
    //     if (this.node.active == false) { return }
    //     if (this.startTime == undefined) { return }
    //     var correctedNow = Date.now() + this.serverOffset;
    //     var remaining = this.startTime.getTime() - correctedNow;

    //     if (remaining < 0) {

    //         this.node.active = false;
    //         return;
    //     }

    //     this.countdownText.string = this.formatTime(remaining);
    // },
    update(dt) {



        // this.updateCountdown();
    },
});
