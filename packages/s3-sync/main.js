'use strict';
const VERSION = "v1.0.0";

const mimeTypes = require('mime-types');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, '..', '..', "local/aws-s3-config.json");
const builderFilePath = path.join(__dirname, '..', '..', "local/builder.json");

let Builder = require(builderFilePath);
let logger = {
    log: function (arg) {
        if (console) {
            console.log("[CocosJS Studio | s3-sync " + VERSION + "]", arg)
        }

        if (Editor) {
            Editor.log("[CocosJS Studio | s3-sync " + VERSION + "]", arg)
        }
    }
};

const PROJECT_NAME = (path.basename(path.join(__dirname, '..', '..'))).toLowerCase();
let bucket_name = null;
let bucket_region = null;
let iam_user_key = null;
let iam_user_secret = null;

let s3_config = null;
let s3 = null;
function readS3ConfigSync(configFile) {
    let configFileData = fs.readFileSync(configFilePath);
    if (configFileData) {
        s3_config = JSON.parse(configFileData);
    }
    else {
        logger.log("To enable AWS S3 files synchronization, please add an `aws-s3-config.json` file into './local' folder");
        logger.log("Structure of `aws-s3-config.json` file: " +
            '\n{' +
            '\n  "bucket_name":"cocosjs-game",' +
            '\n  "bucket_region":"ap-southeast-1",' +
            '\n  "iam_user_key":"access_key_id",' +
            '\n  "iam_user_secret":"access_key_secret"' +
            '\n}'
        );
    }
}

function connectS3(s3_config) {
    bucket_name = s3_config.bucket_name;
    bucket_region = s3_config.bucket_region;
    iam_user_key = s3_config.iam_user_key;
    iam_user_secret = s3_config.iam_user_secret;

    return new AWS.S3({
        accessKeyId: iam_user_key,
        secretAccessKey: iam_user_secret
    });
}

function uploadDir(s3Path, bucketName) {
    function walkSync(currentDirPath, callback) {
        fs.readdirSync(currentDirPath).forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            }
            else if (stat.isDirectory()) {
                walkSync(filePath, callback);
            }
        });
    }

    walkSync(s3Path, function (filePath, stat) {
        let key = PROJECT_NAME + "/" + (filePath.substring(s3Path.length + 1)).replace(/\\/g, "/");
        let params = {
            Bucket: bucket_name,
            Key: key,
            Body: fs.readFileSync(filePath),
            ContentType: mimeTypes.lookup(filePath),
            ACL: 'public-read'
        };
        let objectURL = "https://" + bucket_name + ".s3-" + bucket_region + ".amazonaws.com/" + key;

        s3.putObject(params, function (error, data) {
            if (error) {
                console.log(error);
                if (Editor) {
                    Editor.log(error);
                }
            }
            else {
                logger.log('Successfully uploaded ' + key + ' to ' + objectURL);
            }
        });
    });
}

function onBuildFinish(options, callback) {
    logger.log('Building ' + options.platform + ' to ' + options.dest); // you can display a log in the Console panel

    // uploadDir(options.dest, bucket_name);

    callback();
}

module.exports = {
    load() {
        // When the package loaded
        Editor.Builder.on('build-finished', onBuildFinish);

        readS3ConfigSync(configFilePath);
        s3 = connectS3(s3_config);
    },

    unload() {
        // When the package unloaded
        Editor.Builder.removeListener('build-finished', onBuildFinish);
    },

    messages: {
        'upload-builds'() {
            readS3ConfigSync(configFilePath);
            s3 = connectS3(s3_config);
            logger.log("=== Synchronizing S3 Files ===");

            var buildFolder = (path.join(__dirname, '..', '..', Builder.buildPath));
            fs.readdirSync(buildFolder).forEach(function (name) {
                if (name == "web-mobile") {
                    var filePath = path.join(buildFolder, name);
                    var stat = fs.statSync(filePath);
                    if (stat.isDirectory()) {
                        uploadDir(filePath, bucket_name);
                    }
                }
            });
        }
    }
};