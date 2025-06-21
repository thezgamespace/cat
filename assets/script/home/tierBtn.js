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

        offFrame: cc.SpriteFrame,
        onFrame: cc.SpriteFrame,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.tierNames = ["mega", "ultra", "super", "quite", "abit"]
        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.CHOOSE_TIER, this.changeFrame.bind(this))
        this.emitPoint.on(GAME_ACTION.INPUT_CHANGED, this.reset.bind(this))


    },

    init($index, $numBox) {
        this.btnIndex = $index;
        this.numBox = $numBox;

        this.tierName = this.tierNames[$index]
    },


    reset($input, $pool) {

        this.node.getComponent(cc.Sprite).spriteFrame = this.onFrame;


        if ($input == 0) {


            this.node.active = true;

        } else {


            this.node.active = $pool[this.tierName] == 0 ? false : true;

        }


    },


    changeFrame($btn) {
        if ($btn == this) {

            this.node.getComponent(cc.Sprite).spriteFrame = this.onFrame;


        } else {

            this.node.getComponent(cc.Sprite).spriteFrame = this.offFrame;


        }

    },


    onClick() {
        if (this.node.parent.opacity != 255) { return }
        this.emitPoint.emit(GAME_ACTION.CHOOSE_TIER, this)
    },

    // update (dt) {},
});
