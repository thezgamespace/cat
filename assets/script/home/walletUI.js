// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { GAME_ACTION } = require("../data/GameEnum");

cc.Class({
    extends: cc.Component,

    properties: {
        balanceLabel: {
            type: cc.Label,
            default: null
        },
        usernameText: {
            type: cc.Label,
            default: null
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.usernameText.string = "";
        this.total = 0;
        this.balanceLabel.string = this.total;
        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.USER_DATA_SUCCESS, this.initBalance.bind(this))
        this.emitPoint.on(GAME_ACTION.BULLET_SUCCESS, this.updateBalance.bind(this))

        this.emitPoint.on(GAME_ACTION.CLAIM_SUCCESS, this.claimed.bind(this))



        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on("isPortrait", this.updatePosScale.bind(this))
    },

    updatePosScale($isPortrait) {

        // var username = this.usernameText.node;
        // if (cc.sys.isMobile) {
        //     username.x = -229;
        //     username.y = -56;
        // } else {


        //     if ($isPortrait) {
        //         username.x = -138;
        //         username.y = -70;

        //     } else {


        //         username.x = -138;
        //         username.y = -70;

        //     }

        // }

    },


    initBalance(data) {


        if (data.winning_balance) {

            this.total = data.winning_balance;
            this.balanceLabel.string = this.total;

        }
        this.usernameText.string = data.username;
    },

    resize() {

        console.log("resize")

    },


    claimed(data) {


        this.balanceLabel.string = 0;
    },
    updateBalance(data) {


        if (data.winning_balance) {

            this.total = data.winning_balance;
            this.balanceLabel.string = this.total;

        }

    },


    // update (dt) {},
});
