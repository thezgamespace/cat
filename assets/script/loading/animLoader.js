cc.Class({
    extends: cc.Component,
    properties: {
        atlas: [cc.Asset],
        atlasNames: [cc.String],
        animationNames: [cc.String],
        percent: 0,
        assetLoaded: 0,
        progressBar: [],
    },

    __preload: function () {

        cc.game.addPersistRootNode(this.node);
        this.atlas = [];
        this.atlasNames = require("preloadUrl").url;
        console.log(this.atlasNames)
        this.animationNames = [];
        cc.resources.load(this.atlasNames, cc.SpriteAtlas, this.loadProgress.bind(this), this.loadCompleted.bind(this));

    },

    loadCompleted: function (err, res) {

        var atlas;

        console.log(err,res)

        if(res){

            for (var i = 0; i < res.length; i++) {
                atlas = res[i];
                this.atlas.push(atlas.addRef());
            }
    
            var main = cc.find("Main");
            if (main) {
                main.getComponent("director").gameReady();
                main.emit("loadComplete");
            }
    

        }

   


    },


    loadProgress: function (completedCount, totalCount, item) {
        if (totalCount > 0) {
            this.percent = completedCount / totalCount;
        }
    },

    setSizeMode: function (node) {
        var sprite = node.getComponent(cc.Sprite);
        sprite.trim = false;
        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
    },

    /**create sprite frame create new node, add $ before name if you want exact name match*/
    createClipAdd: function (name, container, autoPlay, wrapMode, animName, playbackSpeed, slicefront, sliceback) {
        var node = new cc.Node('Sprite');
        node.addComponent(cc.Sprite);
        node.parent = container;
        node.name = name.replace("$", "");
        this.createClip(name, node, autoPlay, wrapMode, animName, playbackSpeed, slicefront, sliceback);

        return node;
    },

    /**create sprite frame use existing node, add $ before name if you want exact name match*/
    createClip: function (name, node, autoPlay, wrapMode, animName, playbackSpeed, slicefront, sliceback) {
        var sprite = node.getComponent(cc.Sprite);
        if (!sprite) {
            sprite = node.addComponent(cc.Sprite);
        }
        this.setSizeMode(node);
        var exact = false;
        if (name.indexOf("$") > -1) {
            exact = true;
            name = name.replace("$", "");
        }
        animName = animName || name;
        var animation = node.getComponent(cc.Animation);
        if (!animation) {
            animation = node.addComponent(cc.Animation);
        }
        var sprites = this.getSpriteFrames(name, exact, slicefront, sliceback);
        var clip = cc.AnimationClip.createWithSpriteFrames(sprites, 20);
        clip.name = animName;
        if (playbackSpeed) { clip.speed = playbackSpeed }

        clip.wrapMode = wrapMode ? wrapMode : cc.WrapMode.Loop;
        animation.addClip(clip);
        if (autoPlay == true) {
            animation.play(animName);
        } else {
            sprite.spriteFrame = sprites[0];
        }

    },


    getSpriteFrames: function (name, exact, slicefront, sliceback) {


        var sprites = [];

        for (var a = 0; a < this.atlas.length; a++) {
            var spriteFrames = this.atlas[a].getSpriteFrames();

            for (var i = 0; i < spriteFrames.length; i++) {

                if (exact == true) {

                    if (spriteFrames[i]._name == name) {
                        sprites.push(spriteFrames[i]);
                    }

                } else {

                    if (spriteFrames[i]._name.indexOf(name) > -1) {
                        sprites.push(spriteFrames[i]);
                    }

                }

            }

        }
        if (slicefront != undefined && sliceback != undefined) {

            if (slicefront >= 0 && slicefront <= 1 &&
                sliceback >= 0 && sliceback <= 1
            ) {
                var front = Math.floor(slicefront * sprites.length);
                var back = Math.floor(sliceback * sprites.length);
                return sprites.slice(front, back);

            } else {


                return sprites.slice(slicefront, sliceback);
            }
        }

        return sprites;
    },


    onDestroy: function () {
        this.atlas.decRef();
        this.atlas = null;
    },
});