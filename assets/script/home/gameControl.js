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
        gameArea: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.SESSION_SUCCESS, this.setSession.bind(this))

    },

    setSession($data) {


        this.sessionId = $data.sessionId;
    },



    fadeOut() {

        this.backBtn.active = true;
        cc.tween(this.gameArea)
            .to(0.1, { opacity: 0 })
            .call(() => {

            })
            .start()

    },

    fadeIn() {



        this.gameArea.opacity = 0;
        cc.tween(this.gameArea)
            .to(0.1, { opacity: 255 })
            .call(() => {
            })
            .start()
    },

    // update (dt) {},
});
