// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    __preloadSuper() {

        var main = cc.find("Main");
        if (main) {

            this.animLoader = main.getComponent("animLoader");
            this.api = main.getComponent("api");
            this.main = main.getComponent("main");
            this.sound = main.getComponent("soundManager");
            this.storage = main.getComponent("storage");
        } else {
            // cc.director.loadScene("loader");
        }
    },

    __preload() {
        this.__preloadSuper();
    },

    copyObject($obj, target) {
        for (const key in $obj) {
            if ($obj.hasOwnProperty(key)) {
                target[key] = this.deepCopy($obj[key]);
            }
        }
    },

    copyData(target, $obj) {
        for (const key in $obj) {
            if ($obj.hasOwnProperty(key)) {
                target[key] = $obj[key];
            }
        }
    },


    shuffleArray: function (array) {
        var counter = array.length,
            temp, index;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;

    },

    showLoading() {
        this.scheduleOnce(() => {
            this.fadeOut();
            var loader = cc.find("loading").getComponent("loadControl");
            loader.fadeIn(200);

        }, 1);
    },

    clearTween() {

        for (var i = this.tweens.length - 1; i > -1; i--) {
            if (this.tweens[i].stop) {
                this.tweens[i].stop();
            }
            this.tweens[i] = null;
            this.tweens.splice(i, 1);
        }


    },


    getKeyIndex($json, $key) {
        var index = Object.keys($json).indexOf($key);
        return index;
    },


    getKeyName($json, $index) {
        var name = Object.keys($json)[$index];
        return name;
    },
    deepCopy($data) {
        var data = JSON.parse(JSON.stringify($data));
        return data;

    },

    dragMove(delta) {
        this.node.x += delta.x;
        this.node.y += delta.y;
    },
    jumpTo(event, name) {

        var main = cc.find("Main");
        if (main) {
            var director = main.getComponent("director");
            director.go(name)
        }
    },
    strToNum: function (str) {
        return parseInt(str.replace(/^[^0-9]+/, ''), 10);
    },
    iconTextPos: function (icon, text, gap, offset) {
        var totalWidth = icon.width + text.node.width + gap;
        var startPos = -totalWidth * 0.5 + icon.width * 0.5;
        icon.x = startPos;
        text.node.x = icon.x + icon.width * 0.5 + gap;

        if (offset) {

            icon.x += offset;
            text.node.x += offset;
        }
    },

    randomInt: function (total) {
        return Math.floor(Math.random() * total) % total;
    },

    setSizeMode: function () {
        var sprite = this.node.getComponent(cc.Sprite);
        sprite.trim = false;
        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
    },

    initDragger() {
        this._down = false;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            this._down = true;
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_MOVE, function (event) {
            if (this._down == true) {
                var delta = event.getDelta();
                this.dragMove(delta);
                event.stopPropagation();
            }

        }, this);

        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            this._down = false;
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
            this._down = false;
        }, this);
    },

});
