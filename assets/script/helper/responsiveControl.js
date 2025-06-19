/* Add this to Canvas node, canvas size 960x960
*/
cc.Class({
    extends: cc.Component,

    properties: {
        isPortait: false,
        w: 0,
        h: 0,
        resizers: [cc.Node]
    },

    onLoad() {
        this.emitPoint = cc.find("emitPoint")
        cc.view.enableAutoFullScreen(false);
        // console.log("responsiveControl");
        this.makeResponsive(cc.view.getFrameSize());
        //cc.view.resizeWithBrowserSize(true);
        
        var main = cc.find("Main");
        if (main) {

            main.emit("responsiveReady");

        }
        cc.view.setResizeCallback(this.makeResponsive.bind(this));
    },

    start() {
        this.makeResponsive();
    },


    resizeAll() {

        var size = cc.view.getVisibleSize();

        for (var i in this.resizers) {
            if(this.resizers[i].setOriSize){


                this.resizers[i].setOriSize(this.isPortait);

            }
        }
        for (var i in this.resizers) {
            this.resizers[i].responsive(size);
        }

        for (var i in this.resizers) {
            if (this.resizers[i].responsiveAlign) {
                this.resizers[i].responsiveAlign(size);
            }
        }

        for (var i in this.resizers) {

            if (this.isPortait) {
                if (this.resizers[i].landscapeOnly) {
                    this.resizers[i].node.active = false;
                } else if (this.resizers[i].portraitOnly) {
                    this.resizers[i].node.active = true;
                }

            } else {

                if (this.resizers[i].portraitOnly) {
                    this.resizers[i].node.active = false;
                } else if (this.resizers[i].landscapeOnly) {
                    this.resizers[i].node.active = true;
                }
            }


        }
    },



    makeResponsive() {
        let canvas = this.node.getComponent(cc.Canvas);
        let deviceResolution = cc.view.getFrameSize();

        this.w = deviceResolution.width;
        this.h = deviceResolution.height;
        //
        // console.log(cc.find("Canvas/Profile").width);

        // calculte design ratio
        let desiredRatio = canvas.designResolution.width / canvas.designResolution.height;
        // calculte device ratio
        let deviceRatio = deviceResolution.width / deviceResolution.height;
        this.isPortait = false;
        if (deviceResolution.width <= deviceResolution.height) {
            this.isPortait = true;
            //canvas.designResolution.width=540;
            canvas.fitHeight = true;
            canvas.fitWidth = false;
        } else {
            //canvas.designResolution.width=960;
            canvas.fitHeight = false;
            canvas.fitWidth = true;
        }


        this.resizeAll();
        this.emitPoint.emit("isPortrait",this.isPortait)
        // this.scheduleOnce(function () {
        //     this.resizeAll();
        // }, 1);


        //console.log("cc.view.getCanvasSize()", cc.view.getCanvasSize(), "cc.view.getFrameSize()", cc.view.getFrameSize(),"cc.view.getVisibleSize()",cc.view.getVisibleSize());
        //this.node.emit('responsive', cc.view.getCanvasSize());
    },

});