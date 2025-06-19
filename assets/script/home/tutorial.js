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
        finger: {
            type: cc.Node,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {


        var main = cc.find("Main");
        if (main) {
            this.main = cc.find("Main");
            this.storage = main.getComponent("storage");
        }

        this.emitPoint = cc.find("emitPoint")

        this.emitPoint.on(GAME_ACTION.SELECT_TOWER, this.hideTutorial.bind(this))


        if (this.storage.storageData["doneTutorial"] == true) {

            this.node.active = false;


        } else {

            var x = this.finger.x;
            var y = this.finger.y;
            this.fingerTween = cc.tween(this.finger)
                .repeatForever(
                    cc.tween(this.finger)
                        .to(0.3, { x: x + 10, y: y - 10 })
                        .to(0.3, { x: x, y: y })
                )
            this.fingerTween.start();



        }



    },

    hideTutorial() {
        if (this.node.active == false) { return }
        this.storage.saveItem("doneTutorial", true);
        this.fingerTween.stop();
        this.node.active = false

    },

    // update (dt) {},
});
