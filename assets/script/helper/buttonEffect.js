var nodeBase = require("nodeBase");

cc.Class({
    extends: nodeBase,

    properties: {
        idleScale: new cc.Vec2(1, 1),
        hoverScale: new cc.Vec2(1, 1),
        clickScale: new cc.Vec2(1, 1),
        oriScale: new cc.Vec2(1, 1),
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        if (cc.find("Main")) {
            this.sound = cc.find("Main").getComponent("soundManager");
        }

    },



    start() {

        this.oriScale.x = this.node.scaleX + 0;
        this.oriScale.y = this.node.scaleY + 0;
        if (cc.sys.os === cc.sys.MOBILE_BROWSER) {
            this.hoverScale.x = this.hoverScale.y = this.oriScale.x * 1;
        }
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.node.scaleX = this.oriScale.x * this.clickScale.x;
            this.node.scaleY = this.oriScale.y * this.clickScale.y;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            this.node.scaleX = this.oriScale.x * this.clickScale.x;
            this.node.scaleY = this.oriScale.y * this.clickScale.y;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function () {
            this.node.scaleX = this.oriScale.x * this.hoverScale.x;
            this.node.scaleY = this.oriScale.y * this.hoverScale.y;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function () {
            this.node.scaleX = this.oriScale.x * this.idleScale.x;
            this.node.scaleY = this.oriScale.y * this.idleScale.y;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.scaleX = this.oriScale.x * this.hoverScale.x;
            this.node.scaleY = this.oriScale.y * this.hoverScale.y;
            this.sound.playSfx("click");
        }, this);
    },

    // update (dt) {},
});
