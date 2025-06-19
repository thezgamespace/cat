const { GAME_ACTION, GAME_STATE } = require("../data/GameEnum");
const fetcher = require("fetcher");
const apiUrl = require("../net/apiUrl");
cc.Class({
    extends: fetcher,

    properties: {

        questionText: {
            type: cc.Label,
            default: null
        },
        fadeBox: {
            type: cc.Node,
            default: null
        },
        animBox: {
            type: cc.Node,
            default: null
        },

        errorText: {
            type: cc.Node,
            default: null
        },
        waiting: false,
        allowClose: false,
        successClaim: false,


        panelFrame: {
            type: cc.SpriteFrame,
            default: null
        },


    },


    onLoad() {
        this.errorText.active = false;
        this.emitPoint = cc.find("emitPoint")
        this.emitPoint.on(GAME_ACTION.CLAIM_CONFIRM_PANEL, this.initData.bind(this))
        this.emitPoint.on(GAME_ACTION.USER_DATA_SUCCESS, this.updateBalance.bind(this))

        this.emitPoint.on(GAME_ACTION.CLAIM_ERROR, this.showErrorText.bind(this))
        this.node.active = false;
    },


    updateBalance($data) {

        console.log("updateBalance", $data)
        this.balance = $data.balance;
    },


    initData() {
        // this.questionText.string = roomConfig.roomName;
        this.fadeIn();


    },

    fadeIn() {
        this.fadeBox.active = true;
        this.fadeBox.opacity = 0;
        this.animBox.opacity = 0;
        this.animBox.y = 100;

        var panelFadeIn =
            cc.tween(this.animBox)
                .parallel(
                    cc.tween(this.animBox).to(0.2, { opacity: 255 }),
                    cc.tween(this.animBox).to(0.5, { y: 0 }, { easing: 'backOut' })
                )
                .call(() => { this.allowClose = true })


        cc.tween(this.fadeBox)
            .to(0.1, { opacity: 96 })
            .call(() => {
                panelFadeIn.start();
            })
            .start()
    },


    fadeOut() {
        if (this.allowClose == false) return;


        this.questionText.string = "WITHDRAW TOTAL WINNINGS\nTO MAIN WALLET?"
        this.allowClose = false;
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


    onClick() {

        if (this.successClaim == true) {
            console.log("A")
            this.fadeOut();


        } else {

            console.log("B")
            this.claim();


        }



    },


    claim() {

        if (this.waiting == true) return
        this.waiting = true
        let url = this.baseUrl + apiUrl.postApis.claim;
        let data = undefined;
        return this.post(url, data)

    },


    showErrorText(errorText) {
        this.errorText.active = true;
        this.waiting = false;
        if (errorText) { this.errorText.getComponent(cc.Label).string = errorText; }

        cc.tween(this.errorText)
            .set({ opacity: 255 })
            .delay(3)
            .to(0.3, { opacity: 0 })
            .call(() => {
            }).start()
    },


    successHandler(data) {

        // console.log("SUCCESS claim", data)

        // if (data.error == 200) {
        this.emitPoint.emit(GAME_ACTION.CLAIM_SUCCESS)
        this.successClaim = true;
        this.waiting = false;

        this.questionText.node.active = true;

        this.questionText.string = "YOU HAVE SUCCESFULLY\nWITHDRAWED!"

        // } else {

        //     this.errorHandler(data)

        // }


    },

    errorHandler(data) {
        this.waiting = false;

        // console.log("ERROR claim", data)
        this.showErrorText("SORRY, FAILED TO WITHDRAW, PLEASE TRY AGAIN!")
    },
});
