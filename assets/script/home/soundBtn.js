
cc.Class({
    extends: cc.Component,

    properties: {
        lastVolume: 0.5,

        soundBtn: {
            type: cc.Node,
            default: null
        },

        muteFrame: {
            type: cc.SpriteFrame,
            default: null
        },
        unmuteFrame: {
            type: cc.SpriteFrame,
            default: null
        },
        sliderMode: "all"
    },


    startSuper() {



            var main = cc.find("Main");
            if (main) {
                this.main = cc.find("Main");
                this.storage = main.getComponent("storage");
                this.api = cc.find("Main").getComponent("api");
                this.sound = cc.find("Main").getComponent("soundManager");
                this.initPos();
            }

    },

    toggle() {

        var volume = this.getVolume();
        if (volume == 0) {

            this.unmute();

        } else {

            this.mute();

        }

    },

    unmute() {

        var volume = 0.5;
        this.setVolume(volume)
        this.storage.saveItem(this.sliderMode, volume);
        this.soundBtn.getComponent(cc.Sprite).spriteFrame = this.muteFrame;
    },

    mute() {
        var volume = 0;
        this.setVolume(volume)
        this.storage.saveItem(this.sliderMode, volume);
        this.soundBtn.getComponent(cc.Sprite).spriteFrame = this.unmuteFrame;
    },


    initPos() {
        if (this.storage && this.storage.storageData) {
            var percent = this.storage.storageData[this.sliderMode];
            this.setBtnState(percent)

            this.setVolume(percent)

        }


    },



    setBtnState(volume) {


        if (volume > 0) {

            this.soundBtn.getComponent(cc.Sprite).spriteFrame = this.muteFrame;
        } else {


            this.soundBtn.getComponent(cc.Sprite).spriteFrame = this.unmuteFrame;

        }
    },



    start() {

        this.startSuper();
    },



    setVolume(volume) {
        if (this.sliderMode == "music") {
            cc.audioEngine.setMusicVolume(volume);
        } else if (this.sliderMode == "sfx") {
            cc.audioEngine.setEffectsVolume(volume);
        } else {
            cc.audioEngine.setMusicVolume(volume);
            cc.audioEngine.setEffectsVolume(volume);

        }


    },
    getVolume() {

        return this.storage.storageData[this.sliderMode];
    },


    // update (dt) {},
});
