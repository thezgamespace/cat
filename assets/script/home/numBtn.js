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
        numText: cc.Label,
        btnBg: cc.Node,
        offFrame: cc.SpriteFrame,
        onFrame: cc.SpriteFrame,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.CHOOSE_NUM, this.changeFrame.bind(this))
        this.emitPoint.on(GAME_ACTION.CHOOSE_TIER, this.show.bind(this))


    },

    init($index, $num, $numBox) {
        this.btnIndex = $index;
        this.num = $num;
        this.numText.string = $num;
        this.numBox = $numBox;
        this.btnBg.getComponent(cc.Sprite).spriteFrame = this.onFrame;
        this.numText.node.color = this.numBox.onColour;
    },


    changeFrame($btn) {
        if ($btn == this) {

            this.show();

        } else {

            this.hide();
        }

    },

    show() {

        this.btnBg.getComponent(cc.Sprite).spriteFrame = this.onFrame;
        this.numText.node.color = this.numBox.onColour;
    },

    hide() {


        this.btnBg.getComponent(cc.Sprite).spriteFrame = this.offFrame;
        this.numText.node.color = this.numBox.offColour;

    },


    onClick() {

        if (this.node.parent.opacity != 255) { return }
        this.emitPoint.emit(GAME_ACTION.CHOOSE_NUM, this)
    },

    // update (dt) {},
});
