

cc.Class({
    extends: cc.Component,

    properties: {
        language:"en",
        totalAvatar:10,
        colours: {
            "default": [],
            type: [cc.Color]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.game.addPersistRootNode(this.node);

    },

    // LIFE-CYCLE CALLBACKS:

    setLanguage(language) {

        this.language=language;        
        this.strings=require(this.language)._STRINGS;
    },




    // update (dt) {},
});
