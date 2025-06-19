
var PosMode;
PosMode = cc.Enum({
    stage: 0,
    self: 1
});


var AlignV;
AlignV = cc.Enum({
    top: 0,
    center: 1,
    down: 2
});


var AlignH;
AlignH = cc.Enum({
    left: 0,
    center: 1,
    right: 2
});

var nodeBase = require("nodeBase");

cc.Class({
    extends: nodeBase,

    properties: {
        // autoGenerate: cc.Boolean,

        portraitOnly: {
            "default": false
        },


        landscapeOnly: {
            "default": false
        },

        showSetting: {
            "default": false
        },

        alignByTarget: {
            "default": false
        },

        fitGameScreen: {
            "default": false
        },
        oriSizeL: {
            default: new cc.Vec2(0, 0),
            visible: function () { return this.showSetting; }
        },
        oriSizeP: {
            default: new cc.Vec2(0, 0),
            visible: function () { return this.showSetting; }
        },
        oriSize: {
            default: new cc.Vec2(1, 1),
            visible: function () { return this.showSetting; }
        },

        baseScale: {
            default: new cc.Vec2(1, 1),
            visible: function () { return this.showSetting; }
        },

        animScale: {
            default: new cc.Vec2(1, 1),
            visible: function () { return this.showSetting; }
        },


        vCenterL: {
            "default": false,
            visible: function () { return this.showSetting; }
        },
        hCenterL: {
            "default": false,
            visible: function () { return this.showSetting; }
        },


        hAlignL: {
            "default": AlignH.left,
            type: AlignH,
            visible: function () { return this.showSetting; }
        },
        vAlignL: {
            "default": AlignV.top,
            type: AlignV,
            visible: function () { return this.showSetting; }
        },
        posModeL: {
            "default": PosMode.stage,
            type: PosMode,
            visible: function () { return this.showSetting; }
        },
        posL: {
            default: new cc.Vec2(0, 0),
            visible: function () { return this.showSetting; }
        },
        sizeL: {
            default: new cc.Vec2(0, 0),
            visible: function () { return this.showSetting; }
        },

        sizeTargetL: {
            type: cc.Node,
            default: null,
            visible: function () { return this.showSetting && this.alignByTarget; }
        },
        sizeCopyL: {
            "default": 1,
            visible: function () { return this.showSetting && this.alignByTarget; }
        },

        alignTargetXL: {
            type: cc.Node,
            default: null,
            visible: function () { return this.showSetting && this.alignByTarget; }
        },

        alignModeXL: {
            "default": AlignH.left,
            type: AlignH,
            visible: function () { return this.showSetting && this.alignByTarget; }
        },
        alignToRefXL: {
            "default": 0,
            visible: function () { return this.showSetting && this.alignByTarget; }
        },
        alignTargetYL: {
            type: cc.Node,
            default: null,
            visible: function () { return this.showSetting && this.alignByTarget; }
        },
        alignModeYL: {
            "default": AlignV.top,
            type: AlignV,
            visible: function () { return this.showSetting && this.alignByTarget; }
        },

        alignToRefYL: {
            "default": 0,
            visible: function () { return this.showSetting && this.alignByTarget; }
        },

        same: {
            "default": true,
            visible: function () { return this.showSetting; }
        },
        vCenterP: {
            "default": false,
            visible: function () { return !this.same && this.showSetting; }
        },
        hCenterP: {
            "default": false,
            visible: function () { return !this.same && this.showSetting; }
        },

        hAlignP: {
            "default": AlignH.left,
            type: AlignH,
            visible: function () { return !this.same && this.showSetting; }
        },
        vAlignP: {
            "default": AlignV.top,
            type: AlignV,
            visible: function () { return !this.same && this.showSetting; }
        },
        posModeP: {
            "default": PosMode.stage,
            type: PosMode,
            visible: function () { return !this.same && this.showSetting; }
        },
        posP: {
            "default": new cc.Vec2(0, 0),
            visible: function () { return !this.same && this.showSetting; }
        },
        sizeP: {
            "default": new cc.Vec2(0, 0),
            visible: function () { return !this.same && this.showSetting; }
        },

        sizeTargetP: {
            type: cc.Node,
            default: null,
            visible: function () { return !this.same && this.showSetting && this.alignByTarget; }
        },
        sizeCopyP: {
            "default": 1,
            visible: function () { return !this.same && this.showSetting && this.alignByTarget; }
        },

        alignTargetXP: {
            type: cc.Node,
            default: null,
            visible: function () { return !this.same && this.showSetting && this.alignByTarget; }
        },
        alignModeXP: {
            "default": AlignH.left,
            type: AlignH,
            visible: function () { return !this.same && this.showSetting && this.alignByTarget; }
        },
        alignToRefXP: {
            "default": 0,
            visible: function () { return !this.same && this.showSetting && this.alignByTarget; }
        },

        alignTargetYP: {
            type: cc.Node,
            default: null,
            visible: function () { return !this.same && this.showSetting && this.alignByTarget; }
        },

        alignModeYP: {
            "default": AlignV.top,
            type: AlignV,
            visible: function () { return !this.same && this.showSetting && this.alignByTarget; }
        },

        alignToRefYP: {
            "default": 0,
            visible: function () { return !this.same && this.showSetting && this.alignByTarget; }
        },
    },

    __preload() {

        if (this.same == true) {

            this.vCenterP = this.vCenterL;
            this.hCenterP = this.hCenterL;
            this.hAlignP = this.hAlignL;
            this.vAlignP = this.vAlignL;
            this.posModeP = this.posModeL;
            this.posP = this.posL;
            this.sizeP = this.sizeL;
            this.posRefP = this.posRefL;
            this.sizeTargetP = this.sizeTargetL;
            this.sizeCopyP = this.sizeCopyL;
            this.alignTargetXP = this.alignTargetXL;
            this.alignModeXP = this.alignModeXL;
            this.alignToRefXP = this.alignToRefXL;
            this.alignTargetYP = this.alignTargetYL;
            this.alignModeYP = this.alignModeYL;
            this.alignToRefYP = this.alignToRefYL;

        }

        this.__preloadSuper();
    },
    responsiveAlign($size) {

        if ($size == undefined) {
            $size = cc.view.getVisibleSize();
        }

        var orientation = $size.width > $size.height ? "L" : "P";

        if (this["sizeTarget" + orientation]) {
            this.copyScale(this["sizeTarget" + orientation].getComponents("responsiveNode")[0], this, this["sizeCopy" + orientation]);
        }


        if (this["alignTargetX" + orientation]) {

            switch (this["alignModeX" + orientation]) {
                case AlignH.left:
                    this.alignNodeLeft(this["alignTargetX" + orientation].getComponents("responsiveNode")[0], this, this["alignToRefX" + orientation]);

                    break;
                case AlignH.center:
                    this.alignNodeCenterX(this["alignTargetX" + orientation].getComponents("responsiveNode")[0], this, this["alignToRefX" + orientation]);
                    break;
                case AlignH.right:
                    this.alignNodeRight(this["alignTargetX" + orientation].getComponents("responsiveNode")[0], this, this["alignToRefX" + orientation]);
                    break;
            }
        }


        if (this["alignTargetY" + orientation]) {
            switch (this["alignModeY" + orientation]) {
                case AlignV.top:
                    this.alignNodeTop(this["alignTargetY" + orientation].getComponents("responsiveNode")[0], this, this["alignToRefY" + orientation]);
                    break;
                case AlignV.center:
                    this.alignNodeCenterY(this["alignTargetY" + orientation].getComponents("responsiveNode")[0], this, this["alignToRefY" + orientation]);
                    break;
                case AlignV.down:
                    this.alignNodeBottom(this["alignTargetY" + orientation].getComponents("responsiveNode")[0], this, this["alignToRefY" + orientation]);
                    break;
            }
        }


    },

    copyScale(copyTarget, self, multiply) {

        self.node.scaleX = copyTarget.node.scaleX;
        self.node.scaleY = copyTarget.node.scaleY;

        if (multiply) {
            self.node.scaleX *= multiply;
            self.node.scaleY *= multiply;
        }

    },


    alignNodeLeft(alignTarget, alignNode, offset) {
        alignNode.node.x = alignTarget.node.x - alignTarget.getSizeW() * 0.5;
        this.offsetXbySize(offset);
    },

    alignNodeRight(alignTarget, alignNode, offset) {
        alignNode.node.x = alignTarget.node.x + alignTarget.getSizeW(0.5) - alignNode.getSizeW(0.5);
        this.offsetXbySize(offset);
    },

    alignNodeCenterX(alignTarget, alignNode, offset) {
        alignNode.node.x = alignTarget.node.x;
        this.offsetXbySize(offset);
    },

    alignNodeTop(alignTarget, alignNode, offset) {
        alignNode.node.y = alignTarget.node.y + alignTarget.getSizeH(0.5) - alignNode.getSizeH(0.5);
        this.offsetYbySize(offset);
    },

    alignNodeBottom(alignTarget, alignNode, offset) {
        alignNode.node.y = alignTarget.node.y - alignTarget.getSizeH() * 0.5 + alignNode.getSizeH(0.5);
        this.offsetYbySize(offset);
    },

    alignNodeCenterY(alignTarget, alignNode, offset) {
        alignNode.node.y = alignTarget.node.y;
        this.offsetYbySize(offset);
    },


    offsetXbySize(offset) {
        if (offset) {
            this.node.x += offset * this.node.width * this.node.scaleX;
        }
    },

    offsetYbySize(offset) {
        if (offset) {
            this.node.y += offset * this.node.height * this.node.scaleY;
        }
    },

    getSizeW(percent) {
        percent = percent || 1;
        return this.node.width * this.node.scaleX * percent;
    },

    getSizeH(percent) {
        percent = percent || 1;
        return this.node.height * this.node.scaleY * percent;
    },

    getSize(percentX, percentY) {
        return { x: this.getSizeW(percentX), y: this.getSizeH(percentY) };
    },

    start() {
        this.responsive();
        this.responsiveAlign();
    },

    onLoad() {
        this.onLoadSuper();
    },

    onLoadSuper() {

        this.DPI = cc.view.getDevicePixelRatio();
        this.initStats();
        this.responsive();
        cc.find("Canvas").getComponent("responsiveControl").resizers.push(this);

    },

    responsiveReady() {
        var responsiveNode = this.node.getComponent("responsiveNode");
        var responsiveControl = cc.find("Canvas").getComponent("responsiveControl")
        var resizers = responsiveControl.resizers;

        if (resizers.indexOf(responsiveNode) == -1) {
            resizers.push(responsiveNode);
        }

    },


    setOriSize($isPortrait) {

        if ($isPortrait) {
            if (this.oriSizeP.x == 0 && this.oriSizeP.y == 0) {


            } else {

                this.oriSize.x = this.node.width = this.oriSizeP.x + 0
                this.oriSize.y = this.node.height = this.oriSizeP.y + 0

            }

        } else {
            if (this.oriSizeL.x == 0 && this.oriSizeL.y == 0) {

            } else {

                this.oriSize.x = this.node.width = this.oriSizeL.x + 0
                this.oriSize.y = this.node.height = this.oriSizeL.y + 0

            }

        }
        
        // console.log("setOriSize",this.node.name,this.oriSize.x ,this.oriSize.y,this.oriSizeP.x ,this.oriSizeP.y,this.oriSizeL.x,this.oriSizeL.y)
    },


    initStats() {

        this.oriSize.x = this.node.width;
        this.oriSize.y = this.node.height;
    },


    setPortraitScale($size) {

        var w = $size.width;
        var h = $size.height;


        var scaleX = 1;
        var scaleY = 1;
        if (this.sizeP.x > 0) {
            scaleX = (w * this.sizeP.x) / this.oriSize.x;
        }

        if (this.sizeP.y > 0) {
            scaleY = (h * this.sizeP.y) / this.oriSize.y;
        }


        this.baseScale.x = this.baseScale.y = Math.min(scaleX, scaleY);
        this.readScale();

        // console.log("setPortraitScale",this.sizeP.x,this.sizeP.y,this.oriSize.x,this.oriSize.y,this.oriSize.x,this.oriSize.y,scaleX,scaleY)

    },


    setPortraitPos($size) {

        var w = $size.width;
        var h = $size.height;
        var posRefX, posRefY, alignH, alignV;

        if (this.posModeP == PosMode.stage) {

            posRefX = w;
            posRefY = h;

        } else {

            posRefX = this.node.width * this.node.scaleX;
            posRefY = this.node.height * this.node.scaleY;

        }

        alignH = this.hAlignP / 2 * w;
        alignV = (2 - this.vAlignP) / 2 * h;

        if (this.hCenterP == true) {

            this.node.x = w * 0.5;

        } else {

            this.node.x = alignH + this.posP.x * posRefX;
        }

        if (this.vCenterP == true) {

            this.node.y = h * 0.5;

        } else {

            this.node.y = alignV + this.posP.y * posRefY;

        }

    },


    setPortrait($size) {

        this.setPortraitScale($size);
        this.setPortraitPos($size);


    },


    setLandscapeScale($size) {
        var w = $size.width;
        var h = $size.height;

        var scaleX = 1;
        var scaleY = 1;

        if (this.sizeL.x > 0) {
            scaleX = (w * this.sizeL.x) / this.oriSize.x;
        }

        if (this.sizeL.y > 0) {
            scaleY = (h * this.sizeL.y) / this.oriSize.y;
        }



        this.baseScale.x = this.baseScale.y = Math.min(scaleX, scaleY);

        this.readScale();
        
        // console.log("setLandscapeScale",this.node.name,this.sizeL.x,this.sizeL.y,this.oriSize.x,this.oriSize.y,this.oriSize.x,this.oriSize.y,scaleX,scaleY)

    },

    setLandscapePos($size) {

        var w = $size.width;
        var h = $size.height;

        var posRefX, posRefY, alignH, alignV;

        if (this.posModeL == PosMode.stage) {

            posRefX = w;
            posRefY = h;

        } else {

            posRefX = this.node.width * this.node.scaleX;
            posRefY = this.node.height * this.node.scaleY;

        }

        alignH = this.hAlignL / 2 * w;
        alignV = (2 - this.vAlignL) / 2 * h;

        if (this.hCenterL == true) {

            this.node.x = w * 0.5;

        } else {

            this.node.x = alignH + this.posL.x * posRefX;
        }

        if (this.vCenterL == true) {

            this.node.y = h * 0.5;

        } else {

            this.node.y = alignV + this.posL.y * posRefY;

        }


    },

    setLandscape($size) {

        this.setLandscapeScale($size);
        this.setLandscapePos($size);

    },

    dragMove(delta) {

        var oldX = this.node.x + 0;
        var oldY = this.node.y + 0;
        this.node.x += delta.x;
        this.node.y += delta.y;
        this.updatePos(this.node.x, this.node.y);

    },
    updatePos(x, y) {
        var size = cc.view.getVisibleSize();
        var w = size.width;
        var h = size.height;

        if (w > h) {
            this.updatePosLandscape(x, y, w, h);
        } else {
            this.updatePosPortrait(x, y, w, h);
        }

    },
    updatePosLandscape(x, y, w, h) {
        var posRefX, posRefY, alignH, alignV;

        if (this.hCenterL == true) {
            this.hAlignL = AlignH.center;
            alignH = 1 / 2 * w;
        } else {
            alignH = this.hAlignL / 2 * w;
        }
        if (this.vCenterL == true) {
            this.vAlignL = AlignV.center;
            alignV = (2 - 1) / 2 * h;
        } else {
            alignV = (2 - this.vAlignL) / 2 * h;
        }
        if (this.posModeL == PosMode.stage) {
            posRefX = w;
            posRefY = h;
        } else {
            posRefX = this.node.width * this.node.scaleX;
            posRefY = this.node.height * this.node.scaleY;
        }

        this.posL.x = (this.node.x - alignH) / posRefX;
        this.posL.y = (this.node.y - alignV) / posRefY;

        this.hCenterL = false;
        this.vCenterL = false;
    },

    updatePosPortrait(x, y, w, h) {
        var posRefX, posRefY, alignH, alignV;

        if (this.hCenterP == true) {
            this.hAlignP = AlignH.center;
            alignH = 1 / 2 * w;
        } else {
            alignH = this.hAlignP / 2 * w;
        }
        if (this.vCenterP == true) {
            this.vAlignP = AlignV.center;
            alignV = (2 - 1) / 2 * h;
        } else {
            alignV = (2 - this.vAlignP) / 2 * h;
        }
        if (this.posModeP == PosMode.stage) {
            posRefX = w;
            posRefY = h;
        } else {
            posRefX = this.node.width * this.node.scaleX;
            posRefY = this.node.height * this.node.scaleY;
        }

        this.posP.x = (this.node.x - alignH) / posRefX;
        this.posP.y = (this.node.y - alignV) / posRefY;

        this.hCenterP = false;
        this.vCenterP = false;

    },


    readScale() {

        if (this.baseScale.x > 1) {
            this.baseScale.x = this.baseScale.y = 1;
        }

        this.node.scaleX = this.baseScale.x * this.animScale.x;
        this.node.scaleY = this.baseScale.y * this.animScale.y;


        // console.log("readScale",this.node.scaleX,this.node.scaleX)
    },


    responsive($size) {
        
        // console.log(this.node.width,this.node.height)
        this.responsiveSuper($size);
    },


    responsiveSuper($size) {

        if ($size == undefined) {
            $size = cc.view.getVisibleSize();
        }


        if ($size.width > $size.height) {

            this.setLandscape($size);

        } else {

            this.setPortrait($size);
        }

    },

    // update (dt) {},
});
