
// import fs from 'fs';
// import readline from 'readline';
// import path from 'path';

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, '/src/config/index.ts')),
  output: process.stdout,
  terminal: false,
});

const prodApis = [];
let hitProdConfig = false;
rl.on('line', (line) => {
  if (hitProdConfig) {
    prodApis.push(line.trim());
  }
  hitProdConfig = line.indexOf('case BUILD_ENV.PROD') !== -1;
});
rl.on('close', () => {
  console.log('3333域名配置:');
  console.log(prodApis);
  if (prodApis.length === 0) {
    console.error('项目未配置任何线上域名，请研发人员确认！');
    // process.exit(1);
  } else {
    prodApis.forEach((apiConfig) => {
      if (
        !apiConfig ||
        apiConfig.indexOf('test') !== -1 ||
        apiConfig.indexOf('https') == -1
      ) {
        console.error('项目存在不合理的线上域名配置，请研发人员检查！');
        process.exit(1);
      }
    });
    console.log('域名配置检测通过.');
  }
});
