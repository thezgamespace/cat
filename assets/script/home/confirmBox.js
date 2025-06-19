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

        tokenText: cc.Label,
        damageText: cc.Label,
        speedText: cc.Label,
        animBox: cc.Node,
        fadeBox: cc.Node,
        errorNode: cc.Node,
        errorText: cc.Label,
        confirmBtn: cc.Node,

    },


    onLoad() {

        this.oriX = this.confirmBtn.x;
        this.oriY = this.confirmBtn.y;

        this.sessionData = cc.find("SessionData").getComponent("SessionData")

        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.BULLET_CONFIRM_BOX, this.fadeIn.bind(this))

        this.errorNode.active = false;

    },

    start() {
        this.node.active = false;

    },



    fadeIn($data) {
        this.bullet = $data;
        this.errorNode.active = false;
        var data = this.data = $data.data;
        this.node.active = true;
        this.fadeBox.active = true;
        this.fadeBox.opacity = 0;
        this.animBox.opacity = 0;
        this.animBox.y = 100;
        console.log("confirmBox", $data)

        this.tokenText.string = data.price + " Token";

        if (data.price > 1) {

            this.tokenText.string += "s";

        }

        this.tokenText.string += " will be deducted\nfor " + data.name;


        var seen = new Set();
        var uniquePowers = data.powers.map(p => p.power).filter(p => {
            if (seen.has(p)) return false;
            seen.add(p);
            return true;
        });

        uniquePowers.sort(function (a, b) { return a - b });
        console.log(uniquePowers)

        var powerString = uniquePowers.join(" / ");
        this.damageText.string = "Possible Damage: " + powerString + " ";



        var speedText = "Super Fast"

        if ($data.bulletId == 1) {


            speedText = "Very Fast"

        } else if ($data.bulletId == 2) {


            speedText = "Fast"

        }
        this.speedText.string = "Bar Speed: " + speedText;
        var panelFadeIn =
            cc.tween(this.animBox)
                .parallel(
                    cc.tween(this.animBox).to(0.1, { opacity: 255 }),
                    cc.tween(this.animBox).to(0.5, { y: 0 }, { easing: 'backOut' })
                )


        cc.tween(this.fadeBox)
            .to(0.2, { opacity: 96 })
            .call(() => {
                panelFadeIn.start();
            })
            .start()
    },

    showError($msg) {
        this.errorText.string = $msg
        this.errorNode.active = true;


        var range = 4;
        var half = range * 0.5;


        cc.tween(this.confirmBtn)
            .to(0.05, { x: this.oriX + range, y: this.oriY - range })

            .to(0.05, { x: this.oriX - half + Math.random() * range, y: this.oriY - half + Math.random() * range })
            .to(0.05, { x: this.oriX - half + Math.random() * range, y: this.oriY - half + Math.random() * range })
            .to(0.05, { x: this.oriX - half + Math.random() * range, y: this.oriY - half + Math.random() * range })
            .to(0.05, { x: this.oriX - half + Math.random() * range, y: this.oriY - half + Math.random() * range })
            .to(0.05, { x: this.oriX, y: this.oriY })
            .call(() => {


            })
            .start();

    },

    onConfirm() {


        console.log(this.sessionData)


        // if (this.sessionData.data.canPlay == false) {

        //     this.showError("Session is not open")
        //     return

        // }



        if (this.bullet.tower.dead == true) {

            this.showError("Tower has been destroyed, please select a new tower")
            return

        }


        if (this.bullet.tower.data.eligible == false) {

            this.showError("You are not eligible to attack this tower")
            return

        }
        if (this.bullet.balance < this.data.price) {

            this.showError("Not enough tokens")
            return

        }

        this.emitPoint.emit(GAME_ACTION.BULLET_SUCCESS, this.data)
        cc.tween(this.animBox)
            .parallel(
                cc.tween(this.animBox).to(0.2, { opacity: 0 }),
                cc.tween(this.animBox).to(0.5, { y: 100 }, { easing: 'backOut' })
            ).call(() => {

                this.node.active = false;
            }).start();

    },

    fadeOut() {

        cc.tween(this.fadeBox)
            .delay(0.2)
            .to(0.1, { opacity: 0 }).start()

        cc.tween(this.animBox)
            .parallel(
                cc.tween(this.animBox).to(0.2, { opacity: 0 }),
                cc.tween(this.animBox).to(0.5, { y: 100 }, { easing: 'backOut' })
            ).call(() => {

                this.fadeBox.active = false;
                this.node.active = false;
            }).start();
    },

    // update (dt) {},
});
