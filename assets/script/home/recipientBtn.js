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
        card: cc.Node,
        onColour: cc.Color,
        offColour: cc.Color,
    },

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.CHOOSE_RECIPIENT, this.changeFrame.bind(this))
        this.emitPoint.on(GAME_ACTION.CHOOSE_TIER, this.show.bind(this))


    },

    start() {

    },



    init($index, $numBox) {
        this.btnIndex = $index;
        this.numBox = $numBox;


    },



    changeFrame($btn) {
        if ($btn == this) {

            this.show();

        } else {
            this.hide()

        }

    },


    show() {

        this.node.color = this.onColour;
        this.card.color = this.onColour;
    },

    hide() {


        this.node.color = this.offColour;
        this.card.color = this.offColour;

    },

    onClick() {
        if (this.node.parent.opacity != 255) { return }
        this.emitPoint.emit(GAME_ACTION.CHOOSE_RECIPIENT, this)
    },
    // update (dt) {},
});
