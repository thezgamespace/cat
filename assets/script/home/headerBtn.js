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


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.tierNames = ["mega", "ultra", "super", "quite", "abit"]
        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.CHOOSE_TIER, this.changeFrame.bind(this))
        this.emitPoint.on(GAME_ACTION.INPUT_CHANGED, this.reset.bind(this))

        this.canPlay = false;

        this.isOn = true;
        if (this.isOn == false) {

            this.node.removeComponent("buttonEffect")


        }

    },

    init($index, $numBox) {
        this.btnIndex = $index;
        this.numBox = $numBox;

        this.tierName = this.tierNames[$index]
    },


    reset($input, $pool) {



        if ($input == 0) {


            this.canPress = false;
            this.node.active = true;

        } else {

            var canPlay = $pool[this.tierName] == 0 ? false : true;

            this.node.active = canPlay;
            this.canPlay = canPlay;

        }


    },


    changeFrame($btn) {
        // if ($btn == this) {
        //     this.node.active = false;


        // } else {

        //     this.node.active = false;


        // }

    },


    onClick() {

        if (this.canPlay == false) { return }
        if (this.isOn == false) { return }
        if (this.node.parent.opacity != 255) { return }
        this.emitPoint.emit(GAME_ACTION.CHOOSE_TIER, this)
    },

    // update (dt) {},
});
