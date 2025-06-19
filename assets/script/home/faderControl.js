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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.SHOW_PLAY_BOX, this.fadeOut.bind(this))
        this.emitPoint.on(GAME_ACTION.HIDE_PLAY_BOX, this.fadeIn.bind(this))

    },
    fadeIn () {

        cc.tween(this.node).delay(0.1).to(0.2, { opacity: 255 }).start()

    },
    fadeOut () {

        cc.tween(this.node).delay(0.5).to(0.2, { opacity:0 }).start()

    },
    // update (dt) {},
});
