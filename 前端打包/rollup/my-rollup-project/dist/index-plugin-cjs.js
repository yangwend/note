/**
 * ==============================
 * welcome to imooc.com
 * this is a rollup test project
 * ==============================
 **/
'use strict';

var samTestDataEs = require('sam-test-data-es');

console.log(samTestDataEs.a, samTestDataEs.b, samTestDataEs.random);
var mainEs = (base => {
  return samTestDataEs.random(base);
});

module.exports = mainEs;
/**
 * ===============
 * powered by sam
 * copyright 2018
 * ===============
 **/
