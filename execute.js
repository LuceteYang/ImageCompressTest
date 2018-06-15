'use strict';
const optimizeService = require('./service/optimizeService');
const fs = require('fs');
const directory = `${process.cwd()}/sampleFile`;

const main = () => {
    fs.readdir(directory,(err,files)=>{
        if (err) throw err;
        files.forEach((filename) => {
            if(filename.includes('jpg')||filename.includes('png')) doOptimize(filename);
        });
    });
};

const doOptimize = async (filename)=>{
    let result = {};
    result.name = filename;
    result.imageMinJpegOptim = await optimizeService.imageMinJpegOptim(filename,getFilesizeInBytes(filename));
    // result.imageMinJpegtran = await optimizeService.imageMinJpegtran(filename,getFilesizeInBytes(filename));
    // result.imageMinMozjpeg = await optimizeService.imageMinMozjpeg(filename,getFilesizeInBytes(filename));
    console.log(result);

};

const getFilesizeInBytes =(filename)=>{
    const stats = fs.statSync(`${directory}/${filename}`);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes
};

main();