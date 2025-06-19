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
        towers: {
            type: [cc.Node],
            default: []
        },
        gameBox: cc.Node,

        towerFrame0: {
            type: [cc.SpriteFrame],
            default: []
        },
        towerFrame1: {
            type: [cc.SpriteFrame],
            default: []
        },
        towerFrame2: {
            type: [cc.SpriteFrame],
            default: []
        },
        towerFrame3: {
            type: [cc.SpriteFrame],
            default: []
        },
        towerFrame4: {
            type: [cc.SpriteFrame],
            default: []
        },
        towerFrame5: {
            type: [cc.SpriteFrame],
            default: []
        },
        towerFrame6: {
            type: [cc.SpriteFrame],
            default: []
        },
        towerFrame7: {
            type: [cc.SpriteFrame],
            default: []
        },
        hpFrame: {
            type: [cc.SpriteFrame],
            default: []
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.SESSION_SUCCESS, this.setSession.bind(this))
    },

    setSession($data) {


        this.sessionId = $data.sessionId;
        this.towerData = $data.towers;

        // this.towers.forEach((tower, index) => {
        //     tower.getComponent("tower").setData(this.towerData[index])
        // });


    },

    start() {


        this.towers.forEach((tower, index) => {
            tower.getComponent("tower").init(index, this, this["towerFrame" + index])

            if (index > 2) {

                tower.scale = 0.8;


            } else if (index > 0) {

                tower.scale = 0.9;
            }
        });

    },

    // update (dt) {},
});
