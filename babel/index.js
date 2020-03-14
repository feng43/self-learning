const { transform } = require('@babel/core');

const fs = require('fs');

// 获取需要转换的js
const before = fs.readFileSync('./before.js', 'utf8');

const res = transform(`${before}`, {
  plugins: [require('./plugin')]
});

// 判断是否有afterjs
fs.existsSync('./after.js') && fs.unlinkSync('./after.js');

// 写入转化后的结果到after.js
fs.writeFileSync('./after.js', res.code, 'utf8');
