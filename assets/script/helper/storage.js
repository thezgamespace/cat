// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        storageName: "GAMENAME-1.0.0",
        storageData: null
    },

    // LIFE-CYCLE CALLBACKS:



    onLoad() {

        // this.storageName = "GAMENAME-1.0.0";
        var main = cc.find("Main");
        if (main) {
            this.main = main.getComponent("main");
            if (this.loadAll() == undefined) {
                this.initData();
            }
            this.main.setLanguage(this.storageData.language);
        }



    },

    initData() {
        this.storageData = {
            doneTutorial: false,
            music: 1,
            sfx: 1,
            language: "en",
        };

        this.saveAll();
    },

    saveItem(key, value) {
        this.storageData[key] = value;
        this.saveAll();
    },

    loadItem(key) {

        this.loadAll();
        return this.storageData[key];
    },

    loadAll() {
        let data = cc.sys.localStorage.getItem(this.storageName);
        if (data) {
            this.storageData = JSON.parse(data);
        }

        return this.storageData;
    },

    saveAll() {
        cc.sys.localStorage.setItem(this.storageName, JSON.stringify(this.storageData));
    },

    // update (dt) {},
});
