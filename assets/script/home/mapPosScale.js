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
        posMap: {
            default: new cc.Vec2(0, 0),
        },
        scaleMap: {
            default: new cc.Vec2(1, 1),
        },
        posZoom: {
            default: new cc.Vec2(0, 0),
        },
        scaleZoom: {
            default: new cc.Vec2(1, 1),
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.emitPoint = cc.find("emitPoint")

        this.emitPoint.on(GAME_ACTION.ZOOM_TOWER, this.setZoomPos.bind(this))
        this.emitPoint.on(GAME_ACTION.GO_MAP, this.setMapPos.bind(this))
        this.setMapPos();
    },

    start() {


    },


    setMapPos() {


        this.node.scaleX = this.scaleMap.x + 0;
        this.node.scaleY = this.scaleMap.y + 0;
        this.node.x = this.posMap.x + 0;
        this.node.y = this.posMap.y + 0;

    },

    setZoomPos() {

        this.node.scaleX = this.scaleZoom.x + 0;
        this.node.scaleY = this.scaleZoom.y + 0;
        this.node.x = this.posZoom.x + 0;
        this.node.y = this.posZoom.y + 0;

    },

});
