
const util = {
    getUrlParam: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[[]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },

    iconTextPos: function (icon, text, gap, offset) {
        gap = gap || 0;
        text._forceUpdateRenderData();

        var textWidth=text.node.width * text.node.scale 
        let totalWidth = icon.width + textWidth + gap;
        let startPos = -totalWidth * 0.5 + icon.width * 0.5;
        icon.x = startPos;
        text.node.x = icon.x + icon.width * 0.5 + textWidth * 0.5 + gap;

        if (offset) {

            icon.x += offset;
            text.node.x += offset;
        }

        // console.log("iconTextPos", icon.width, text.node.width, gap)
    },
    setCharAt: function (str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    },
    starUserName: function ($text, maxChar = 15) {
        let text = $text;
        let textLength = text.length;
        if (textLength > maxChar) {

            const extraChar = textLength - maxChar;
            const extraMidPoint = Math.floor(textLength / 2) - Math.floor(extraChar / 2);
            text = text.substring(0, extraMidPoint) + text.substring(extraMidPoint + extraChar, textLength);
            textLength = text.length;
        }

        const totalStar = Math.floor(text.length * 0.5);
        const midIndex = Math.floor(textLength / 2) - Math.floor(totalStar / 2)

        for (let i = 0; i < totalStar; i++) {
            text = this.setCharAt(text, midIndex + i, "*")
        }
        return text
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

    screenshot: function (fileName) {
        let node = new cc.Node();
        node.parent = cc.director.getScene();
        let camera = node.addComponent(cc.Camera);

        // Set the CullingMask of the screenshot you want
        camera.cullingMask = 0xffffffff;

        // Set the camera's position to the center of the visible area
        camera.node.setPosition(cc.visibleRect.width / 2, cc.visibleRect.height / 2);

        // Create a new RenderTexture and set this new RenderTexture to the camera's targetTexture so that the camera content will be rendered to this new RenderTexture
        let texture = new cc.RenderTexture();
        let gl = cc.game._renderContext;
        // If the Mask component is not included in the screenshot, you don't need to pass the third parameter.
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        camera.targetTexture = texture;

        // Render the camera once, updating the content once into RenderTexture
        camera.render();

        // This allows the data to be obtained from the rendertexture.
        let data = texture.readPixels();

        // Then you can manipulate the data.
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = texture.width;
        canvas.height = texture.height;

        let rowBytes = texture.width * 4;
        for (let row = 0; row < texture.height; row++) {
            let srow = texture.height - 1 - row;
            let imageData = ctx.createImageData(texture.width, 1);
            let start = srow * texture.width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }

            ctx.putImageData(imageData, 0, row);
        }
        if (cc.sys.browserType === cc.sys.BROWSER_TYPE_CHROME || cc.sys.browserType === cc.sys.BROWSER_TYPE_SAFARI) {
            let dataURL = canvas.toDataURL("image/jpeg");
            let link = document.createElement('a');
            link.download = fileName;
            link.href = dataURL;
            link.click();
        } else {
            // Convert the canvas to a Blob object
            canvas.toBlob(function (blob) {
                // Create a URL object from the Blob
                let url = URL.createObjectURL(blob);

                // Create a link element to prompt the user to download the image
                let link = document.createElement('a');
                link.download = fileName;
                link.href = url;
                link.click();

                // Revoke the URL object after the download
                URL.revokeObjectURL(url);
            }, "image/jpeg");


        }

    },


    // screenshot(fileName) {
    //     let node = new cc.Node();
    //     node.parent = cc.director.getScene();
    //     let camera = node.addComponent(cc.Camera);

    //     // Set the CullingMask of the screenshot you want
    //     camera.cullingMask = 0xffffffff;

    //     // Set the camera's position to the center of the visible area
    //     camera.node.setPosition(cc.visibleRect.width / 2, cc.visibleRect.height / 2);

    //     // Create a new RenderTexture and set this new RenderTexture to the camera's targetTexture so that the camera content will be rendered to this new RenderTexture
    //     let texture = new cc.RenderTexture();
    //     let gl = cc.game._renderContext;
    //     // If the Mask component is not included in the screenshot, you don't need to pass the third parameter.
    //     texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
    //     camera.targetTexture = texture;

    //     // Render the camera once, updating the content once into RenderTexture
    //     camera.render();

    //     // This allows the data to be obtained from the rendertexture.
    //     let data = texture.readPixels();

    //     // Then you can manipulate the data.
    //     let canvas = document.createElement('canvas');
    //     let ctx = canvas.getContext('2d');
    //     canvas.width = texture.width;
    //     canvas.height = texture.height;

    //     let rowBytes = texture.width * 4;
    //     for (let row = 0; row < texture.height; row++) {
    //         let srow = texture.height - 1 - row;
    //         let imageData = ctx.createImageData(texture.width, 1);
    //         let start = srow * texture.width * 4;
    //         for (let i = 0; i < rowBytes; i++) {
    //             imageData.data[i] = data[start + i];
    //         }

    //         ctx.putImageData(imageData, 0, row);
    //     }

    //     // Use data URL if the browser is Chrome or Safari, otherwise use Blob
    //     if (cc.sys.browserType === cc.sys.BROWSER_TYPE_CHROME || cc.sys.browserType === cc.sys.BROWSER_TYPE_SAFARI) {
    //         // Use canvas.toDataURL() to convert the canvas content to a data URL
    //         let dataURL = canvas.toDataURL("image/jpeg");
    //         this.saveDataURL(fileName, dataURL);
    //     } else {
    //         // Use canvas.toBlob() to create a Blob object
    //         canvas.toBlob(function(blob) {
    //             this.saveBlob(fileName, blob);
    //         }, "image/jpeg");
    //     }
    // },

    saveDataURL(fileName, dataURL) {
        // Create a link element to prompt the user to download the image
        let link = document.createElement('a');
        link.download = fileName;
        link.href = dataURL;
        link.click();

    },

    getUrlParam($paramName) {
        const queryParams = new URLSearchParams(window.location.search);

        // Get a specific parameter value by its name
        const paramValue = queryParams.get($paramName);

        return paramValue

    },

    saveBlob(fileName, blob) {
        // Create a URL object from the Blob
        let url = URL.createObjectURL(blob);

        // Create a link element to prompt the user to download the image
        let link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        link.click();

        // Revoke the URL object after the download
        URL.revokeObjectURL(url);
    },

    // Function to encrypt a string
    encrypt: function (text, key) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(char);
        }
        return result;
    },

    // Function to decrypt an encrypted string
    decrypt: function (encryptedText, key) {
        let result = '';
        for (let i = 0; i < encryptedText.length; i++) {
            const char = encryptedText.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(char);
        }
        return result;
    }

}

module.exports = util;