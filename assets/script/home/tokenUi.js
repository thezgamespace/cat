// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { GAME_ACTION } = require("../data/GameEnum");
const util = require("../helper/util");

cc.Class({
    extends: cc.Component,

    properties: {
    
        balanceText: {
            type: cc.Label,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.balance = 0;
        this.emitPoint = cc.find("emitPoint")
        // this.emitPoint.on(GAME_ACTION.BULLET_SUCCESS, this.updateBalance.bind(this))
        this.emitPoint.on(GAME_ACTION.USER_DATA_SUCCESS, this.updateBalance.bind(this))
        this.emitPoint.on(GAME_ACTION.ATTACK_SUCCESS, this.updateBalance.bind(this))

    },


    updateBalance($data) {
        if ($data.token != undefined) {

            this.balance = $data.token;
            this.balanceText.string = this.balance;


            this.emitPoint.emit(GAME_ACTION.UPDATE_BALANCE, { balance: this.balance })


        }

    },

    start() {


        this.updateBalance({ price: 0 })

    },

    // update (dt) {},
});
