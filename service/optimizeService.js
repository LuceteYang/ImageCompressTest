'use strict';
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const ROOT_PATH = process.cwd();
const Optimize = {};
const tempDirectory = `${ROOT_PATH}/output/`;
const fs = require('fs');
const originDirectory = `${process.cwd()}/sampleFile`;



Optimize.imageMinJpegOptim = async (filename,origin_byte) => {
    const path = `${originDirectory}/${filename}`;
    const start = Date.now();
    return imagemin([path], `${tempDirectory}/jpegOptim/`, {
        plugins: [
            imageminJpegoptim({max: '80'})
            , imageminPngquant({quality: '65-80', floyd: 1})
        ]
    }).then((result) => {
        const millis = Date.now() - start;
        const compressFileSize = getFilesizeInBytes(result[0].path);
        const conpressRate = parseInt(compressFileSize*100/origin_byte)+"%";
        return {rate:conpressRate,time:millis,size:compressFileSize}
    })
};

Optimize.imageMinJpegOptim1 = (filename) => {
    const path = `${originDirectory}/${filename}`;
    return imagemin([path], `${tempDirectory}jpegOptim/`, {
        plugins: [
            imageminJpegoptim({max: '80'})
            , imageminPngquant({quality: '65-80', floyd: 1})
        ]
    })
};

Optimize.imageMinMozjpeg = async (filename,origin_byte) => {
    const path =  `${originDirectory}/${filename}`;
    const start = Date.now();
    return imagemin([path], `${tempDirectory}/Mozjpeg/`, {
        plugins: [
            imageminMozjpeg({quality:'80'})
            ,imageminPngquant({quality: '65-80', floyd: 1})
        ]
    }).then((result) => {
        const millis = Date.now() - start;
        const compressFileSize = getFilesizeInBytes(result[0].path);
        const conpressRate = parseInt(compressFileSize*100/origin_byte)+"%";
        return {rate:conpressRate,time:millis,size:compressFileSize}
    })
};

Optimize.imageMinJpegtran = async (filename,origin_byte) => {
    const path =  `${originDirectory}/${filename}`;
    const start = Date.now();
    return imagemin([path], `${tempDirectory}/Jpegtran/`, {
        plugins: [
            imageminJpegtran({progressive:true,arithmetic:true})
            ,imageminPngquant({quality: '65-80', floyd: 1})
        ]
    }).then((result) => {
        const millis = Date.now() - start;
        const compressFileSize = getFilesizeInBytes(result[0].path);
        const conpressRate = parseInt(compressFileSize*100/origin_byte)+"%";
        return {rate:conpressRate,time:millis,size:compressFileSize}
    })
};
// Optimize.imageMinJpegtran1 = async (filename) => {
//     const path =  `${originDirectory}/${filename}`;
//     return imagemin([path], `${tempDirectory}/Jpegtran/`, {
//         plugins: [
//             imageminJpegtran({progressive:true,arithmetic:true})
//             ,imageminPngquant({quality: '65-80', floyd: 1})
//         ]
//     })
// };
Optimize.imageMinJpegtran1 = (filename,origin_byte) => {
    const path =  `${originDirectory}/${filename}`;
    const start = Date.now();
    const promise = new Promise(function (resolve, reject) {
        imagemin([path], `${tempDirectory}/Jpegtran/`, {
            plugins: [
                imageminJpegtran({progressive:true,arithmetic:true})
                ,imageminPngquant({quality: '65-80', floyd: 1})
            ]
        }).then((result) => {
            const millis = Date.now() - start;
            const compressFileSize = getFilesizeInBytes(result[0].path);
            const conpressRate = parseInt(compressFileSize*100/origin_byte)+"%";
            resolve({rate:conpressRate,time:millis,size:compressFileSize})
        }).catch(function (err) {
            reject(err)
        })
    });
    return promise
};
function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes
}

module.exports = Optimize;