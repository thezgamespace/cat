// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start() {

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            return true;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            return true;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function () {
            return true;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function () {
            return true;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            return true;
        }, this);
        this.node.opacity = 0;
    },

    fadeIn(alpha) {
        this.node.active = true;
        this.node.opacity = 0;
        var opacity = alpha || 255;

        cc.tween(this.node)
            .to(0.3, { opacity: opacity })
            .start()

    },

    fadeOut() {

        cc.tween(this.node)
            .delay(0.2)
            .to(0.3, { opacity: 0 })
            .call(() => {
                this.node.active = false;
            })
            .start()

    },

});
