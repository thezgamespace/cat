const { GAME_ACTION, GAME_STATE } = require("../data/GameEnum");
const fetcher = require("fetcher");
const apiUrl = require("../net/apiUrl");
const util = require("../helper/util");
cc.Class({
    extends: fetcher,

    properties: {

        errorText: {
            type: cc.Node,
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
        editBox: {
            type: cc.EditBox,
            default: null
        },
        submitBtn: {
            type: cc.Node,
            default: null
        },
        playerName: "",
        waiting: false,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.errorText.active = false;
        this.emitPoint = cc.find("emitPoint")
        // this.emitPoint.on(GAME_ACTION.SUBMIT_NAME_SUCCESS, this.onRegisterNameSuccess.bind(this))
        // this.emitPoint.on(GAME_ACTION.SUBMIT_NAME_ERROR, this.onRegisterNameError.bind(this))
        cc.find("Canvas").getComponent("responsiveControl").resizers.push(this);




    },


    postGameData($playerName) {


        var platform
        var hostname = window.location.hostname.toLowerCase();

        if (hostname.indexOf("hiso33signupb1") > -1) {
            platform = 0
        } else if (hostname.indexOf("hiso33signupb2") > -1) {
            platform = 1
        } else if (hostname.indexOf("hiso33signupb3") > -1) {
            platform = 2
        } else if (hostname.indexOf("hiso33signupb4") > -1) {
            platform = 3
        } else {
            platform = 0
        }
        let url = this.baseUrl + apiUrl.postApis.submitName;
        url += "?username=" + $playerName
        url += "&platform=" + platform
        return this.post(url)
    },


    responsive(size) {
        this.editBox.blur();
    },


    start() {
        let editbox = document.getElementsByClassName("cocosEditBox");
        editbox["EditBoxId_1"]["autocomplete"] = "off";



        this.node.active = false;
        this.fadeBox.active = false;


        // var main = cc.find("Main");
        // if (main) {
        //     this.main = cc.find("Main");
        //     this.storage = main.getComponent("storage");


        //     if (this.storage.storageData.uniqueId == undefined) {

        //         this.fadeIn()
        //     } else {

        //         this.emitPoint.emit(GAME_ACTION.LOAD_GAME, this.storage.storageData.uniqueId)

        //         this.node.active = false;
        //         this.fadeBox.active = false;


        //     }

        //     // this.fadeIn()
        // }


    },

    fadeIn() {

        this.fadeBox.active = true;
        this.fadeBox.opacity = 0;
        this.animBox.opacity = 0;
        this.animBox.y = 100;

        var panelFadeIn =
            cc.tween(this.animBox)
                .parallel(
                    cc.tween(this.animBox).to(0.1, { opacity: 255 }),
                    cc.tween(this.animBox).to(0.5, { y: 0 }, { easing: 'backOut' })
                )


        cc.tween(this.fadeBox)
            .delay(0.5)
            .to(0.2, { opacity: 96 })
            .call(() => {
                panelFadeIn.start();
            })
            .start()

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

                this.emitPoint.emit(GAME_ACTION.UPDATE_GAME_STATE, GAME_STATE.START_GAME)
                this.fadeBox.active = false;
                this.node.active = false;
            }).start();
    },

    textChanged(inputText) {
        this.playerName = inputText;
    },

    successHandler($data) {


        if ($data.error == 200) {
            var data = $data.data[0]


            this.storage.saveItem("uniqueId", data.uniqueId);
            // console.log("submitname SUCCESS",data)
            this.emitPoint.emit(GAME_ACTION.SET_TOKEN, data.uniqueId)
            this.fadeOut()



        } else if ($data.error == 202 && $data.validation.username) {

            this.waiting = false;

            this.errorText.getComponent(cc.Label).string = $data.validation.username;
            this.errorText.active = true;

        } else {


            this.waiting = false;

            this.errorText.getComponent(cc.Label).string = $data.message;
            this.errorText.active = true;
        }


    },

    errorHandler(errorText) {

        this.waiting = false;
        this.errorText.getComponent(cc.Label).string = errorText;

        cc.tween(this.errorText)
            .set({ opacity: 255 })
            .delay(3)
            .to(0.3, { opacity: 0 })
            .call(() => {
            }).start()
    },

    submitName() {
        this.errorText.active = false;
        // if (this.playerName.length == 0) {
        //     this.onRegisterNameError("Please Input Your Name")
        //     return;
        // }
        if (this.waiting == true) return;
        this.waiting = true;
        // this.emitPoint.emit(GAME_ACTION.SUBMIT_NAME_POST, this.playerName)

        this.postGameData(this.playerName)
        // this.onSuccess({
        //     username: this.playerName,
        //     userId: 0,
        //     balance: 100
        // })
    },

    // update (dt) {},
});
