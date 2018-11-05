const qiniu = require('qiniu');
const path = require('path');
const fs = require('fs');
const config = require('../config/index');

let mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey);
let options = {
    scope: config.qiniu.bucket
};
let uploadToken = new qiniu.rs.PutPolicy(options).uploadToken(mac);
let uploadConfig = new qiniu.conf.Config();
// 空间对应的机房
uploadConfig.zone = qiniu.zone.Zone_z0;
// 上传是否使用cdn加速
uploadConfig.useCdnDomain = true;

let formUploader = new qiniu.form_up.FormUploader(uploadConfig);
let putExtra = new qiniu.form_up.PutExtra();

// 上传文件夹下所有文件
let baseDir = path.resolve(__dirname, '../dist');

function genFileList(dir) {
    files = fs.readdirSync(path.join(baseDir, dir));
    files.forEach(fileName => {
        filePath = path.join(baseDir, dir, fileName);
        let fileStat = fs.statSync(filePath);
        if (fileStat.isFile()) {
            uploadFile(path.join(dir, fileName));
        } else if (fileStat.isDirectory()) {
            genFileList(path.join(dir, fileName));
        }
    });
}

function uploadFile(relativePath) {
    let key = config.qiniu.keyPrefix + relativePath;
    formUploader.putFile(uploadToken, key, path.resolve(baseDir, relativePath), putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            console.log(relativePath + ' success');
        } else {
            console.log(relativePath + ": " + respBody.error);
        }
    });
}

genFileList('');