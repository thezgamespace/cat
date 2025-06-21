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
        prizeText: cc.Label,
        eachText: cc.Label,
        textBox: cc.Node,
        onColour: cc.Color,
        offColour: cc.Color,
        textBox: cc.Node,
        bg: cc.Node,
    },

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.CHOOSE_TIER, this.showTier.bind(this))
        this.emitPoint.on(GAME_ACTION.CHOOSE_RECIPIENT, this.showRecipient.bind(this))
        this.emitPoint.on(GAME_ACTION.INPUT_CHANGED, this.idle.bind(this))


    },



    showTier($tierBtn) {
        if ($tierBtn.btnIndex == this.col) {
            this.isTargetTier = true;
            this.show();
        } else {
            this.isTargetTier = false;
            this.hide();
        }
    },


    idle() {

        this.bg.active = false;
        this.prizeText.node.color = this.offColour;
        // this.eachText.node.color = this.offColour;
        this.textBox.opacity=255;
    },
    show() {

        this.bg.active = true;
        this.prizeText.node.color = this.onColour;
        // this.eachText.node.color = this.onColour;
        this.textBox.opacity=255;
    },

    hide() {

        this.bg.active = false;
        this.prizeText.node.color = this.offColour;
        // this.eachText.node.color = this.offColour;
        this.textBox.opacity=255*0.3;
    },
    showRecipient($recipientBtn) {
        if (this.isTargetTier == true) {
            if ($recipientBtn.btnIndex == this.row) {
                this.show();
            } else {
                this.hide();
            }
        }
    },


    start() {

    },

    init($col, $row, $numBox) {
        this.col = $col;
        this.row = $row;
        this.numBox = $numBox;
        this.prizeText.string = "0";
        this.bg.active = false;
        this.textBox.active = false;

        if (this.row == 0) {
            this.eachText.node.active = false;
        }

        this.tierName = $numBox.tierNames[$col]
    },

    setPrize($prize) {

        this.prize = $prize;
        this.prizeText.string = $prize;
        this.textBox.active = $prize == 0 ? false : true;




    },
    // update (dt) {},
});
