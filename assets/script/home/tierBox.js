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
        onColour: cc.Color,
        offColour: cc.Color,
    },

    onLoad() {

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.INPUT_CHANGED, this.checkInput.bind(this))
        this.emitPoint.on(GAME_ACTION.CHOOSE_RECIPIENT, this.show.bind(this))
        this.grey();
    },

    checkInput($input) {

        if (parseInt($input) >= 300) {
            this.show()
        } else {
            this.grey();
        }

    },

    grey() {

        this.node.opacity = 255 * 0.5;
    },



    show() {
        this.node.opacity = 255;
    },

    start() {
        this.iniTierBtn();
    },




    iniTierBtn() {


        this.tierBtns = [];

        var children = this.node.children;
        for (var i = 0; i < children.length; i++) {
            var tierBtn = children[i].getComponent("tierBtn")

            tierBtn.init(i, this)

            this.tierBtns.push(tierBtn);



        }

    },

    // update (dt) {},
});
