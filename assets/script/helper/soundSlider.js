var sliderMode;
sliderMode = cc.Enum({
    music: 0,
    sfx: 1
});

var axisMode;
axisMode = cc.Enum({
    x: 0,
    y: 1
});


cc.Class({
    extends: cc.Component,

    properties: {
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
    },


    startSuper() {

        this.sliderModes = ["music", "sfx"];
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


    initPos() {
        if (this.storage && this.storage.storageData) {
            var axis = this.axisMode;
            var percent = this.storage.storageData[this.sliderMode];
            this.node[axis] = this.minX + percent * this.width;
            // console.log(axis, this.sliderMode, percent, this.width, this.storage.storageData, this.storage.storageData[this.sliderMode])
        }
    },



    start() {

        this.startSuper();
    },


    onTouchStart(event) {
        this.sound.playSfx("click");
        this.onTouchStartSuper(event);
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


    onMoveSuper(event) {
        var point = event.currentTouch._point;

        var axis = this.axisMode;
        this.node[axis] = this.nodeHolder[axis] + (point[axis] - this.touchHolder[axis]) / this.node.parent.parent.scaleX;

        if (this.node[axis] < this.minX) {
            this.node[axis] = this.minX;
        }
        if (this.node[axis] > this.maxX) {
            this.node[axis] = this.maxX;
        }

        var volume = this.getVolume();
        if (this.sliderMode == "music") {
            cc.audioEngine.setMusicVolume(volume);
        } else {

            cc.audioEngine.setEffectsVolume(volume);

        }

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
    },


    // update (dt) {},
});
