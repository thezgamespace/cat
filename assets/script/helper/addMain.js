
cc.Class({
    extends: cc.Component,

    properties: {
        mainPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:
    __preload() {

        var main = cc.find("Main");
        if (main) {

        } else {
            var scene = cc.director.getScene();
            var main = cc.instantiate(this.mainPrefab);
            main.parent = scene;
            main.name="Main";
        }

    },

    onLoad() {

    },


    start() {

    },

    // update (dt) {},
});
