'use strict';
const optimizeService = require('./service/optimizeService');
const fs = require('fs');
const directory = `${process.cwd()}/sampleFile`;

const main = () => {
    fs.readdir(directory,(err,files)=>{
        if (err) throw err;
        files.forEach((filename) => {
            if(filename.includes('jpg')) doOptimize(filename);
        });
    });
};

const doOptimize = async (filename)=>{
    let resultObj = {};
    resultObj.name = filename;
    const origin_byte = getFilesizeInBytes(`${directory}/${filename}`);
    try {
        const start = Date.now();
        const result = await optimizeService.imageMinJpegOptim1(filename)
        const millis = Date.now() - start;
        const compressFileSize = getFilesizeInBytes(result[0].path);
        const conpressRate = parseInt(compressFileSize*100/origin_byte)+"%";
        resultObj.imageMinJpegOptim = {rate:conpressRate,time:millis,size:compressFileSize}
    }
    catch (err) {
        console.log('imageMinJpegOptim failed', err);
    }
    try {
        const result = await optimizeService.imageMinJpegtran1(filename,origin_byte)
        resultObj.imageMinJpegtran = result;
    }
    catch (err) {
        console.log('imageMinJpegtran1 failed', err);
    }
    // result.imageMinJpegOptim = await optimizeService.imageMinJpegOptim(filename,getFilesizeInBytes(filename));
    // result.imageMinJpegtran = await optimizeService.imageMinJpegtran(filename,getFilesizeInBytes(filename));
    // result.imageMinMozjpeg = await optimizeService.imageMinMozjpeg(filename,getFilesizeInBytes(filename));
    console.log(resultObj);

};


const getFilesizeInBytes =(dir)=>{
    const stats = fs.statSync(dir);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes
};

main();