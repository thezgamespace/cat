cc.Class({
    extends: cc.Component,

    properties: {

        bgm: {
            type: cc.AudioClip,
            default: null
        },
        click: {
            type: cc.AudioClip,
            default: null
        },


    },


    onLoad() {
        this.maxNum = cc.audioEngine.getMaxAudioInstance();
        this.audioPool = [];

        // check deprecated
        ['playMusic', 'playEffect'].forEach(function (name) {
            if (!cc.audioEngine[name]) {
                cc.warn('.' + name + ' is not found!');
            }
        });


    },

    start() {

        var main = cc.find("Main");
        if (main) {
            this.storage = main.getComponent("storage");
            if (this.storage && this.storage.storageData) {
                cc.audioEngine.setMusicVolume(this.storage.storageData.all);
                cc.audioEngine.setEffectsVolume(this.storage.storageData.all);

            }
        }
        // this.playBgm();
    },



    onDestroy() {
        cc.audioEngine.stopAll();
    },

    removeAudio(id) {
        var idx = this.audioPool.indexOf(id);
        if (idx > -1) {
            this.audioPool.splice(idx, 1);
        }
    },

    playBgm() {
        if (!this.bgm || this.audioPool.length === this.maxNum) return;

        var id = cc.audioEngine.playMusic(this.bgm, true);
        this.audioPool.push(id);

        // set finish callback
        cc.audioEngine.setFinishCallback(id, this.removeAudio.bind(this, id));
    },
    stopBgm() {

        console.log("stop")
        cc.audioEngine.stopMusic(this.bgm);
        this.removeAudio(this.bgm)
    },



    playSfx(sfx) {
        if (!this[sfx] || this.audioPool.length === this.maxNum) return;
        var id = cc.audioEngine.playEffect(this[sfx]);
        this.audioPool.push(id);

        // set finish callback
        cc.audioEngine.setFinishCallback(id, this.removeAudio.bind(this, id));
    },


    stopAll() {
        cc.audioEngine.stopAll();
        this.audioPool = [];
    },

    pauseAll() {
        cc.audioEngine.pauseAll();
    },

    resumeAll() {
        cc.audioEngine.resumeAll();
    },
});
