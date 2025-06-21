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

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.emitPoint = cc.find("emitPoint")


    },

    init($index, $numBox) {
        this.btnIndex = $index;
        this.numBox = $numBox;
        this.percentText.string = "0%";
        this.textBox.active = false;
    },




    setPercent($percent) {
        this.percent = $percent;
        this.percentText.string = ($percent * 100) + "%";
        this.textBox.active = $percent == 0 ? false : true;
    },



    // update (dt) {},
});
