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
        symbol: cc.Node,
        btnBg: cc.Node,
        offFrame: cc.SpriteFrame,
        onFrame: cc.SpriteFrame,
        symbolFrames: {
            type: [cc.SpriteFrame],
            default: []
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.CHOOSE_SYMBOL, this.changeFrame.bind(this))
        this.emitPoint.on(GAME_ACTION.CHOOSE_TIER, this.show.bind(this))


    },

    init($index, $symbolBox) {
        this.btnIndex = $index;
        this.symbolBox = $symbolBox;

        this.btnBg.getComponent(cc.Sprite).spriteFrame = this.onFrame;

        this.symbol.getComponent(cc.Sprite).spriteFrame = this.symbolFrames[$index];



    },


    show() {

        this.btnBg.getComponent(cc.Sprite).spriteFrame = this.onFrame;
    },

    hide() {


        this.btnBg.getComponent(cc.Sprite).spriteFrame = this.offFrame;

    },


    changeFrame($btn) {
        if ($btn == this) {

            this.btnBg.getComponent(cc.Sprite).spriteFrame = this.onFrame;


        } else {

            this.btnBg.getComponent(cc.Sprite).spriteFrame = this.offFrame;


        }

    },


    onClick() {
        if (this.node.parent.opacity != 255) { return }
        this.emitPoint.emit(GAME_ACTION.CHOOSE_SYMBOL, this)
    },

    // update (dt) {},
});
