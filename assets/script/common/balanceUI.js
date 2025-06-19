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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.BUY_SUCCESS, this.updateBalance.bind(this))
        this.emitPoint.on(GAME_ACTION.SUBMIT_NAME_SUCCESS, this.updateBalance.bind(this))
    },
 
    updateBalance(data) {

        console.log("updateBalance", data)
        this.balanceLabel.string = data.balance;

    },


    // update (dt) {},
});
