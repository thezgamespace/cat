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
        targetBox: {
            type: cc.Node,
            default: null
        },
        openBtn: {
            type: cc.Node,
            default: null
        },
        totalHit: 0,
        showing: false,
        hasFirstData:false,
        boardName:""
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.targetBox.scale = 0;
        this.emitPoint = cc.find("emitPoint")
        if(this.boardName=="leaderboard"){
            this.emitPoint.on(GAME_ACTION.LEADERBOARD_SUCCESS, this.firstOpen.bind(this))

        }else{

            this.emitPoint.on(GAME_ACTION.REALTIME_SUCCESS, this.firstOpen.bind(this))

        }
       

    },

    firstOpen() {
        if (this.totalHit == 0) {

            cc.tween(this.targetBox)
                .delay(1.1)
                .call(() => {
                    this.showing = true;
                    // this.openBtn.active = false;
                })
                .to(0.4, { scale: 1 }, { easing: 'sineIn' })
                .call(() => {
                })
                .start()


        }
    },


    updateLeaderboard() {
    },

    toggle(touchEvent) {
        // console.log("this.showing",this.showing)
        if (this.showing == true){

                this.showing = false;
    
                cc.tween(this.targetBox)
                    .to(0.1, { scale: 0 }, { easing: 'sineIn' })
                    .call(() => {
                        // btnAnim.start()
                    })
                    .start()

        }else{

            this.showing = true;
            // this.openBtn.active = false;
            cc.tween(this.targetBox)
                .to(0.2, { scale: 1 }, { easing: 'sineIn' })
                .call(() => {
                })
                .start()

        }
        

    },

    show(touchEvent) {
        if (this.showing == true) return;
        this.showing = true;
        // this.openBtn.active = false;
        cc.tween(this.targetBox)
            .to(0.2, { scale: 1 }, { easing: 'sineIn' })
            .call(() => {
            })
            .start()
    },
    hide(touchEvent) {
        if (this.showing == false) return;
        this.showing = false;
        // this.openBtn.active = true;
        // this.openBtn.scale = 0;
        // var btnAnim = cc.tween(this.openBtn)
        //     .to(0.2, { scale: 1 }, { easing: 'backOut' })

        cc.tween(this.targetBox)
            .to(0.1, { scale: 0 }, { easing: 'sineIn' })
            .call(() => {
                // btnAnim.start()
            })
            .start()
    },

    onCollisionEnter: function (other) {
        this.totalHit++;
        this.hide();

    },

    onCollisionStay: function (other) {
    },

    onCollisionExit: function () {
        this.totalHit--;
        if (this.totalHit > 0) { return }
        this.show();

    }
    // update (dt) {},
});
