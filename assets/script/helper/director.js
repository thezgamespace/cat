// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        startScene: cc.String,
        sceneIndex: cc.Number = 0,
        gameLoaded: cc.Boolean = false,
        scenes: {
            "default": [],
            type: [cc.String]
        },
        divs: {
            "default": [],
            type: [cc.String]
        },
        
        loadingPrefab: cc.Prefab,
    },
    ctor: function () {

        this.scenes = [
            "loader",
            "splash",
            "home",
            "game"
        ]
        this.divs = [
        ]

        this.startScene = "home";
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startScene = "home";
    },

    hideDiv() {
        for (var i = 0; i < this.divs.length; i++) {

            var divName = this.divs[i];
            var div = document.getElementById(divName);
            if (div) {
                div.style.display = "none";
            }

        }
        this.divs.length = 0;
    },

    gameReady() {
        this.gameLoaded = true;
        this.hideDiv();
        var splash = require("settings")._SETTINGS.Splash;
        for (var i = 0; i < splash.length; i++) {
            if (splash[i].Enabled == true) {
                cc.director.loadScene("splash");
                this.node.emit("changeScene", "splash");
                return;
            }
        }
        this.goStartScreen();

    },


    goStartScreen() {
        this.go(this.startScene);
    },


    go(scene) {
        this.sceneIndex = this.scenes.indexOf(scene);
        this.loadScene();
    },

    replay() {
        this.loadScene();
    },

    loadScene() {
        var scene = this.scenes[this.sceneIndex];
        this.sceneName = scene;
        cc.director.loadScene(scene);
        this.node.emit("changeScene", scene);
    },


    next() {
        if (this.sceneIndex + 1 < this.scenes.length) {
            this.sceneIndex++;
            this.loadScene();
        }
    },

    prev() {
        if (this.sceneIndex - 1 >= 0) {
            this.sceneIndex--;
            this.loadScene();

        }
    },

    // update (dt) {},
});
