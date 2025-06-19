// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        posP: {
            default: new cc.Vec2(0, 0),
        },
        scaleP: {
            default: new cc.Vec2(1, 1),
        },
        posL: {
            default: new cc.Vec2(0, 0),
        },
        scaleL: {
            default: new cc.Vec2(1, 1),
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on("isPortrait", this.updatePosScale.bind(this))


        let deviceResolution = cc.view.getFrameSize();
        this.updatePosScale(deviceResolution.width <= deviceResolution.height);

    },

    start() {


    },

    updatePosScale($isPortrait) {

        if ($isPortrait) {

            this.node.scaleX = this.scaleP.x + 0;
            this.node.scaleY = this.scaleP.y + 0;
            this.node.x = this.posP.x + 0;
            this.node.y = this.posP.y + 0;

        } else {


            this.node.scaleX = this.scaleL.x + 0;
            this.node.scaleY = this.scaleL.y + 0;
            this.node.x = this.posL.x + 0;
            this.node.y = this.posL.y + 0;

        }

    },

    // update (dt) {},
});
