// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bar: cc.Node,
        oriWidth: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    __preload() {

        this.animLoader = cc.find("Main").getComponent("animLoader");
        this.bar = this.node.getChildByName("load-bar");
    },


    onLoad() {

        this.oriWidth = this.bar.width + 0;
    },


    update() {
        this.bar.width = 78+this.animLoader.percent*(this.oriWidth-78);

    },

    start() {
        // console.log(this.node.getComponent(cc.Sprite).get)
        // var atlas = cc.assetManager.assets.;
        // console.log(atlas)

    },

    // update (dt) {},
});
