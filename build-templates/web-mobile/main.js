var im = {
    "frames": [

        {
            "filename": "barLeft.png",
            "frame": { "x": 504, "y": 1, "w": 79, "h": 105 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 79, "h": 105 },
            "sourceSize": { "w": 79, "h": 105 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "barRight.png",
            "frame": { "x": 585, "y": 1, "w": 79, "h": 105 },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": { "x": 0, "y": 0, "w": 79, "h": 105 },
            "sourceSize": { "w": 79, "h": 105 },
            "pivot": { "x": 0.5, "y": 0.5 }
        },
        {
            "filename": "logo.png",
            "frame": { "x": 1, "y": 1, "w": 501, "h": 114 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 3, "y": 0, "w": 501, "h": 114 },
            "sourceSize": { "w": 504, "h": 114 },
            "pivot": { "x": 0.5, "y": 0.5 }
        }],
    "meta": {
        "app": "https://www.codeandweb.com/texturepacker",
        "version": "1.0",
        "image": "loading.png",
        "format": "RGBA8888",
        "size": { "w": 665, "h": 116 },
        "scale": "1",
        "smartupdate": "$TexturePacker:SmartUpdate:7cb891c271fed1a51a5d7648fb2f382d:be76d0efef526cc20845f739cd979d53:5294b8b30e478db5089d68a09bebcee6$"
    }
}


var percent = 0;
var gameW = 960;
var gameH = 960;
var tween

var tweenPercent = { percent: 1 };
var shine = { pos: -200 };
var canvas = document.getElementById("title");
var ctx = canvas.getContext('2d');
var imageLoaded = false

var font = new FontFace('Eczar-ExtraBold', 'url(Eczar-ExtraBold.ttf)');
font.load().then(function (loadedFont) {
    document.fonts.add(loadedFont);
    // Use the font to draw text on the canvas

}).catch(function (error) {
    console.error('Failed to load font: ' + error);
});
function getFrame(filename) {

    return im.frames.filter((item) => { return item.filename == filename })[0]
}

var barY = gameH * 0.65
var loadBar = new Image;
loadBar.src = "bar.png";


var loadBase = new Image;
loadBase.src = "base.png";
loadBase.onload = function () {

    ctx.drawImage(loadBase,
        gameW * 0.5 - 500 * 0.5, barY)

};
function drawImage(target, x, y, pivotX, pivotY) {

    var frameSrc = target.frame
    ctx.drawImage(sprite, frameSrc.x, frameSrc.y, frameSrc.w, frameSrc.h, x - pivotX * frameSrc.w, y - pivotY * frameSrc.h, frameSrc.w, frameSrc.h)

}

function updateLoadingBar() {
    var p = tweenPercent.percent;
    ctx.clearRect(0, 0, 960, 960)


    if (imageLoaded == false) {

        ctx.save()
        ctx.globalAlpha = p;
        ctx.font = "25px Poppins"; // Set the font size and family
        ctx.textAlign = "center";
        ctx.fillStyle = "white"; // Set the text color
        ctx.fillText(".....Loading Gameplay.....", gameW * 0.5, gameH * 0.5); // Draw the text

        ctx.restore()


        return
    }

    var barW = 851;
    var barH = 76;

    ctx.drawImage(loadBase,
        gameW * 0.5 - barW * 0.5, barY)

    ctx.drawImage(loadBar,
        0, 0, 851 * percent, barH,
        gameW * 0.5 - barW * 0.5, barY, barW * percent, barH)


    ctx.save()



    drawImage(getFrame("logo.png"), gameW * 0.5, gameH * 0.3, 0.5, 0.5)

    drawImage(getFrame("barLeft.png"), gameW * 0.5 - barW * 0.48, barY+35, 0.5, 0.5)
    drawImage(getFrame("barRight.png"), gameW * 0.5 + barW * 0.48, barY+35, 0.5, 0.5)
    ctx.save()
    ctx.globalAlpha = p;
    ctx.font = "25px Eczar-ExtraBold"; // Set the font size and family
    ctx.textAlign = "center";
    ctx.fillStyle = "white"; // Set the text color
    ctx.fillText(".....Preparing the Catapults.....", gameW * 0.5, gameH * 0.79); // Draw the text

    ctx.restore()
    ctx.restore()
}

var animTimer = setInterval(updateLoadingBar, 1);

function loadImage(url) {

    var im = new Image;
    im.src = url;
    im.onload = function () {
        tween = gsap.to(tweenPercent, {
            duration: 1, // Duration of the tween in seconds
            percent: 0, // Destination x position
            repeat: -1, // Repeat forever
            yoyo: true
        });
        tween = gsap.to(shine, {
            duration: 3, // Duration of the tween in seconds
            pos: 200, // Destination x position
            repeat: -1, // Repeat forever
            ease: "none",
            delay: 1
        });
        imageLoaded = true;
        updateLoadingBar()
    };
    return im;
}

var sprite = loadImage(im.meta.image)


window.boot = function () {

    var settings = window._CCSettings;
    window._CCSettings = undefined;
    var onProgress = null;

    var RESOURCES = cc.AssetManager.BuiltinBundleName.RESOURCES;
    var INTERNAL = cc.AssetManager.BuiltinBundleName.INTERNAL;
    var MAIN = cc.AssetManager.BuiltinBundleName.MAIN;
    var toNum = function (info) { return parseFloat((info).replace("px")) }
    var hideImg = function (name) {
        var image = document.getElementById(name);
        image.style.display = 'none';
    }

    function setLoadingDisplay() {
        var splash = document.getElementById('splash');

        onProgress = function (finish, total) {
            percent = finish / total;
            updateLoadingBar();
        };




        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            tween.kill();
            splash.style.display = 'none';
            hideImg("title");
            clearInterval(animTimer);
        });
    }

    var onStart = function () {

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        if (cc.sys.isBrowser) {
            setLoadingDisplay();
        }

        if (cc.sys.isMobile) {
            if (settings.orientation === 'landscape') {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            }
            else if (settings.orientation === 'portrait') {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            }
            cc.view.enableAutoFullScreen([
                cc.sys.BROWSER_TYPE_BAIDU,
                cc.sys.BROWSER_TYPE_BAIDU_APP,
                cc.sys.BROWSER_TYPE_WECHAT,
                cc.sys.BROWSER_TYPE_MOBILE_QQ,
                cc.sys.BROWSER_TYPE_MIUI,
                cc.sys.BROWSER_TYPE_HUAWEI,
                cc.sys.BROWSER_TYPE_UC,
            ].indexOf(cc.sys.browserType) < 0);
        }

        // Limit downloading max concurrent task to 2,
        // more tasks simultaneously may cause performance draw back on some android system / browsers.
        // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
        if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
            cc.assetManager.downloader.maxConcurrency = 2;
            cc.assetManager.downloader.maxRequestsPerFrame = 2;
        }

        var launchScene = settings.launchScene;
        var bundle = cc.assetManager.bundles.find(function (b) {
            return b.getSceneInfo(launchScene);
        });

        bundle.loadScene(launchScene, null, onProgress,
            function (err, scene) {
                if (!err) {
                    cc.director.runSceneImmediate(scene);
                    if (cc.sys.isBrowser) {
                        // show canvas
                        var canvas = document.getElementById('GameCanvas');
                        canvas.style.visibility = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                        console.log('Success to load scene: ' + launchScene);
                    }
                }
            }
        );

    };

    var option = {
        id: 'GameCanvas',
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: settings.debug,
        frameRate: 60,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    };

    cc.assetManager.init({
        bundleVers: settings.bundleVers,
        remoteBundles: settings.remoteBundles,
        server: settings.server
    });

    var bundleRoot = [INTERNAL];
    settings.hasResourcesBundle && bundleRoot.push(RESOURCES);

    var count = 0;
    function cb(err) {
        if (err) return console.error(err.message, err.stack);
        count++;
        if (count === bundleRoot.length + 1) {
            cc.assetManager.loadBundle(MAIN, function (err) {
                if (!err) cc.game.run(option, onStart);
            });
        }
    }

    cc.assetManager.loadScript(settings.jsList.map(function (x) { return 'src/' + x; }), cb);

    for (var i = 0; i < bundleRoot.length; i++) {
        cc.assetManager.loadBundle(bundleRoot[i], cb);
    }
};

if (window.jsb) {
    var isRuntime = (typeof loadRuntime === 'function');
    if (isRuntime) {
        require('src/settings.js');
        require('src/cocos2d-runtime.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/engine/index.js');
    }
    else {
        require('src/settings.js');
        require('src/cocos2d-jsb.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/jsb-engine.js');
    }

    cc.macro.CLEANUP_IMAGE_CACHE = true;
    window.boot();
}