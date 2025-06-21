const { GAME_ACTION } = require("../data/GameEnum");

var sliderMode;
sliderMode = cc.Enum({
    music: 0,
    sfx: 1,
    all: 2
});

var axisMode;
axisMode = cc.Enum({
    x: 0,
    y: 1
});


cc.Class({
    extends: cc.Component,

    properties: {
        sliderBox: {
            type: cc.Node,
            default: null
        },
        lastVolume: 0.5,
        minX: 0,
        maxX: 0,
        sliderMode: "music",
        sliderIndex: {
            "default": sliderMode.music,
            type: sliderMode
        },
        axisMode: "x",
        axisIndex: {
            "default": axisMode.x,
            type: axisMode
        },

        bar: {
            type: cc.Node,
            default: null
        },

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
    },


    startSuper() {






        this.sliderModes = ["music", "sfx", "all"];
        this.axisModes = ["x", "y"];
        this.axisMode = this.axisModes[this.axisIndex];
        this.sliderMode = this.sliderModes[this.sliderIndex];
        this.width = this.maxX - this.minX;
        this.nodeHolder = new cc.Vec2(0, 0);
        this.touchHolder = new cc.Vec2(0, 0);

        var main = cc.find("Main");
        if (main) {
            this.main = cc.find("Main");
            this.storage = main.getComponent("storage");
            this.api = cc.find("Main").getComponent("api");
            this.sound = cc.find("Main").getComponent("soundManager");
            this.initPos();
        }

        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMove, this);

    },

    startBgm() {
        this.sound.playBgm();

    },

    stopBgm() {
        this.sound.stopBgm();


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

        this.setVolume(this.lastVolume)

        var volume = this.getVolume();
        this.storage.saveItem(this.sliderMode, volume);
        this.soundBtn.getComponent(cc.Sprite).spriteFrame = this.muteFrame;
    },

    mute() {
        this.lastVolume = this.storage.storageData[this.sliderMode];
        this.setVolume(0)
        var volume = this.getVolume();
        this.storage.saveItem(this.sliderMode, volume);

        this.soundBtn.getComponent(cc.Sprite).spriteFrame = this.unmuteFrame;
    },


    initPos() {
        if (this.storage && this.storage.storageData) {
            var axis = this.axisMode;
            var percent = this.storage.storageData[this.sliderMode];
            this.node[axis] = this.minX + percent * this.width;

            this.bar.width = (this.maxX - this.minX) * percent + 3;
            this.setBtnState(percent)

            this.setVolume(percent)

            // console.log(axis, this.sliderMode, percent, this.width, this.storage.storageData, this.storage.storageData[this.sliderMode])
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

        this.emitPoint = cc.find("emitPoint")
        this.startSuper();
    },


    onTouchStart(event) {
        this.sound.playSfx("click");
        this.onTouchStartSuper(event);
        this.emitPoint.emit(GAME_ACTION.DRAGGING_SOUND, true)
    },


    onTouchStartSuper(event) {
        var point = event.currentTouch._point;
        var axis = this.axisMode;
        this.touchHolder[axis] = point[axis];

        this.nodeHolder[axis] = this.node[axis];
    },


    onMove(event) {

        this.onMoveSuper(event);

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

        this.bar.width = (this.maxX - this.minX) * volume + 3;


        var axis = this.axisMode;
        this.node[axis] = this.minX + volume * this.width;

    },


    onMoveSuper(event) {
        // var point = event.currentTouch._point;

        var axis = this.axisMode;
        // this.node[axis] = this.nodeHolder[axis] + (point[axis] - this.touchHolder[axis]) / this.node.parent.parent.scaleX;
        let delta = event.getDelta();

        // Convert the delta to the parent's local space
        let parent = this.node.parent;
        let localDelta = parent.convertToNodeSpaceAR(cc.v2(this.node.x + delta.x, this.node.y + delta.y)).sub(parent.convertToNodeSpaceAR(cc.v2(this.node.x, this.node.y)));

        // Apply the delta to the node position
        this.node.x += localDelta.x;
        if (this.node[axis] < this.minX) {
            this.node[axis] = this.minX;
        }
        if (this.node[axis] > this.maxX) {
            this.node[axis] = this.maxX;
        }

        var volume = this.getVolume();
        this.setVolume(volume)
        this.setBtnState(volume)

    },

    getVolume() {

        var axis = this.axisMode;
        return (this.node[axis] - this.minX) / this.width;
    },

    onTouchEnd(event) {
        var volume = this.getVolume();
        this.storage.saveItem(this.sliderMode, volume);

        if (this.sliderMode == "music") {
            this.api.APImusicVolume(volume);

        } else {
            this.api.APIsfxVolume(volume);
        }

        this.emitPoint.emit(GAME_ACTION.DRAGGING_SOUND, false)
    },


    // update (dt) {},
});
