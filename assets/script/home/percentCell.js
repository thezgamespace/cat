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
        percentText: cc.Label,
        textBox: cc.Node,
        bg: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.bg.active = false;
        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.CHOOSE_TIER, this.showTier.bind(this))
        this.emitPoint.on(GAME_ACTION.INPUT_CHANGED, this.idle.bind(this))
  },


    idle() {
            this.bg.active = false;

    },

    init($index, $numBox) {
        this.btnIndex = $index;
        this.numBox = $numBox;
        this.percentText.string = "0%";
        this.textBox.active = false;
    },


    showTier($tierBtn) {
        if ($tierBtn.btnIndex == this.btnIndex) {
            this.bg.active = true;
        } else {
            this.bg.active = false;
        }
    },


    setPercent($percent) {
        this.percent = $percent;
        this.percentText.string = ($percent * 100) + "%";
        this.textBox.active = $percent == 0 ? false : true;
    },



    // update (dt) {},
});
