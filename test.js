// 几种常见的手写源码实现

function myNew() {
  var obj = new Object();
  var con = Array.prototype.shift.call(arguments);
  obj.__proto__ = con.prototype;
  var rs = con.apply(obj, Array.prototype.slice.call(arguments));
  return typeof rs === 'object' ? rs : obj;
}

function myNew2(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const rs = fn.apply(obj, args);
  return typeof rs === 'object' ? rs : obj;
}

// ========= 无返回值 =============
const testNewFun = function(name) {
  this.name = name;
};

const newObj = myNew2(testNewFun, 'foo');

console.log(newObj); // { name: "foo" }
console.log(newObj instanceof testNewFun); // true
// ========= 有返回值 =============
// const testNewFun = function(name) {
//   this.name = name;
//   return {};
// };

// const newObj = myNew(testNewFun, 'foo');

// console.log(newObj); // {}
// console.log(newObj instanceof testNewFun); // false

// Function.prototype.myBind = function(thisArg) {
//   if(typeof this !== 'function') return;
//   var self = this;
//   var args = Array.prototype.slice.call(arguments, 1);
//   构建一个干净的函数，用于保存原函数的原型
//   var nop = function(){};
//   var bound = function() {
//     return self.apply(
//       this instanceof nop, 判断是否使用 new 来调用 bound
//       如果是 new 来调用的话，this的指向就是其实例，
//       如果不是 new 调用的话，就改变 this 指向到指定的对象 o
//       this instanceof nop ? this : thisArg,
//       [...args, ...Array.prototype.slice.call(arguments)]
//     )
//   }
//   箭头函数没有 prototype，箭头函数this永远指向它所在的作用域
//   if(this.prototype) nop.prototype = this.prototype;
//   修改绑定函数的原型指向
//   bound.prototype = new nop();
//   return bound;
// }

Function.prototype.myBind = function(thisArg) {
  if(typeof this !== 'function') return;
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var nop = function() {};
  var bound = function() {
    return self.apply(
      this instanceof nop ? this : thisArg,
      [...args, ...Array.prototype.slice.call(arguments)]
    )
  }
  if(this.prototype) nop.prototype = this.prototype;
  bound.prototype = new nop();
  return bound;
}

// // const bar = function() {
// //   console.log(this.name, arguments);
// // };

// // bar.prototype.name = 'bar';

// // const foo = {
// //   name: 'foo'
// // };

// // const bound = bar.myBind(foo, 22, 33, 44);
// // new bound(); // bar, [22, 33, 44]
// // bound(); // foo, [22, 33, 44]


Function.prototype.myCall = function(thisArg) {
  if(typeof this !== 'function') return;
  var args = [...arguments].slice(1);
  thisArg.fn = this;
  var rs = thisArg.fn(...args);
  delete thisArg.fn;
  return rs;
}


// Function.prototype.myApply = function(thisArg) {
//   if(typeof this !== 'function') return;
//   var args = [...arguments][1];
//   thisArg.fn = this;

//   var rs = thisArg.fn(...args);
//   delete thisArg.fn;
//   return rs;
// }

// const bar = function() {
//   console.log(this.name, [...arguments], arguments);
// };

// bar.prototype.name = 'bar';

// const foo = {
//   name: 'foo'
// };

// // bar.myCall(foo, 1, 2, 3); // foo [1, 2, 3]
// // bar.myApply(foo, [1, 2, 3]); // foo [1, 2, 3]

// // let ary = [1, [2, [3, [4, 5]]], 6];
// // let str = JSON.stringify(ary);

// // ary = str.replace(/\[|\]/g, '').split(',');


// // while (ary.some(Array.isArray)) {
// //   ary = [].concat(...ary);
// // }

// // console.log(ary);


// // promise实现
// // pending、fulfilled、rejected
// class Promise {
//   constructor(executor){
//     this.state = 'pending';
//     this.value = '';
//     this.reason = '';
//     // 成功存放的数组
//     this.onResolvedCallbacks = [];
//     // 失败存放的数组
//     this.onRejectedCallbacks = [];
    
//     let resolve = value => {
//       if(this.state = 'pending') {
//         this.state = 'fulfillen';
//         this.value = value;
//         onResolvedCallbacks.forEach(fn => fn());
//       }
//     };
//     let reject = reason => {
//       if(this.state = 'pending') {
//         this.state = 'rejected';
//         this.reason = reason;
//         onRejectedCallbacks.forEach(fn => fn());
//       }
//     };
//     try{
//       executor(resolve, reject);
//     } catch (err) {
//       reject(err);
//     }
//   }

//   then(onFulfilled,onRejected) {
//     if(this.state === 'fulfillen') {
//       setTimeout(() => {
//         onFulfilled(this.value);
//       }, 0);
//     }
//     if(this.state === 'rejected') {
//       setTimeout(() => {
//         onRejected(this.reason);
//       }, 0);
//     }
//     if(this.state === 'pending') {
//       this.onResolvedCallbacks.push(() => {
//         setTimeout(() => {
//           onFulfilled(this.value);
//         }, 0);
//       })

//       this.onRejectedCallbacks.push(() => {
//         setTimeout(() => {
//           onRejected(this.reason);
//         }, 0);
//       })
//     }
//   }
// }


// // promise链式调用
// class _Promise{
//   constructor(executor) {
//     this.state = 'pending';
//     this.value = '';
//     this.reason = '';
//     this.onResolvedCallbacks = [];
//     this.onRejectedCallbacks = [];
    
//     let resolve = (value) => {
//       if(this.state === 'pending') {
//         this.value = value;
//         this.state = 'fulfilled';
//         this.onResolvedCallbacks.forEach(fn => fn());
//       }
//     }
//     let reject = (reason) => {
//       if(this.state === 'pending') {
//         this.reason = reason;
//         this.state = 'rejected';
//         this.onRejectedCallbacks.forEach(fn => fn());
//       }
//     }
//     try{
//       executor(resolve, reject);
//     } catch (err) {
//       reject(err);
//     }
//   }

//   then(onFulfilled, onRejected) {
//     // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
//     onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
//     // onRejected如果不是函数，就忽略onRejected，直接扔出错误
//     onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
//     let promise2 = new Promise((resolve, reject) => {
//       if (this.state === 'fulfilled') {
//         // 异步
//         setTimeout(() => {
//           try {
//             let x = onFulfilled(this.value);
//             resolvePromise(promise2, x, resolve, reject);
//           } catch (e) {
//             reject(e);
//           }
//         }, 0);
//       };
//       if (this.state === 'rejected') {
//         // 异步
//         setTimeout(() => {
//           // 如果报错
//           try {
//             let x = onRejected(this.reason);
//             resolvePromise(promise2, x, resolve, reject);
//           } catch (e) {
//             reject(e);
//           }
//         }, 0);
//       };
//       if (this.state === 'pending') {
//         this.onResolvedCallbacks.push(() => {
//           // 异步
//           setTimeout(() => {
//             try {
//               let x = onFulfilled(this.value);
//               resolvePromise(promise2, x, resolve, reject);
//             } catch (e) {
//               reject(e);
//             }
//           }, 0);
//         });
//         this.onRejectedCallbacks.push(() => {
//           // 异步
//           setTimeout(() => {
//             try {
//               let x = onRejected(this.reason);
//               resolvePromise(promise2, x, resolve, reject);
//             } catch (e) {
//               reject(e);
//             }
//           }, 0)
//         });
//       };
//     });
//     // 返回promise，完成链式
//     return promise2;
//   }
//   catch(fn){
//     return this.then(null,fn);
//   }
// }
// function resolvePromise(promise2, x, resolve, reject){
//   // 循环引用报错
//   if(x === promise2){
//     // reject报错
//     return reject(new TypeError('Chaining cycle detected for promise'));
//   }
//   // 防止多次调用
//   let called;
//   // x不是null 且x是对象或者函数
//   if (x != null && (typeof x === 'object' || typeof x === 'function')) {
//     try {
//       // A+规定，声明then = x的then方法
//       let then = x.then;
//       // 如果then是函数，就默认是promise了
//       if (typeof then === 'function') { 
//         // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
//         then.call(x, y => {
//           // 成功和失败只能调用一个
//           if (called) return;
//           called = true;
//           // resolve的结果依旧是promise 那就继续解析
//           resolvePromise(promise2, y, resolve, reject);
//         }, err => {
//           // 成功和失败只能调用一个
//           if (called) return;
//           called = true;
//           reject(err);// 失败了就失败了
//         })
//       } else {
//         resolve(x); // 直接成功即可
//       }
//     } catch (e) {
//       // 也属于失败
//       if (called) return;
//       called = true;
//       // 取then出错了那就不要在继续执行了
//       reject(e); 
//     }
//   } else {
//     resolve(x);
//   }
// }

// //all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
// Promise.all = function(promises){
//   let arr = [];
//   let i = 0;
//   function processData(index,data){
//     arr[index] = data;
//     i++;
//     if(i == promises.length){
//       resolve(arr);
//     };
//   };
//   return new Promise((resolve,reject)=>{
//     for(let i=0;i<promises.length;i++){
//       promises[i].then(data=>{
//         processData(i,data);
//       },reject);
//     };
//   });
// }


// console.log(1);
   
// setTimeout(() => {
//     console.log(2);
// }, 0);

// process.nextTick(() => {
//     console.log(3);
// });

// setImmediate(() => {
//     console.log(4);
// });

// new Promise((resolve, reject) => {
//     console.log(5);
//     resolve();
//     console.log(6);
// }).then(() => {
//     console.log(7);
// });

// Promise.resolve().then(() => {
//     console.log(8);

//     process.nextTick(() => {
//         console.log(9);
//     });
// });

// // 1, 5, 6, 3, 7, 8, 2, 4



// function clone(obj){
//   if(typeof obj!=='object'){return obj;}
//   let cloneObj = {};
//   switch(obj.constructor){
//     case Array:
//       cloneObj = [];
//     case Object:
//       for(var property in obj){
//         cloneObj[property] = typeof obj[property] === 'object'?clone(obj[property]):obj[property];
//       }
//       break;
//     case Map:
//       cloneObj = new Map();
//       obj.forEach((value,key)=>{
//         cloneObj.set(key,typeof value==='object'?clone(value):value);
//       });
//       break;
//     case Set:
//       cloneObj = new Set();
//       obj.forEach(value=>{
//         cloneObj.add(typeof value==='object'?clone(value):value);
//       });
//       break;
//   }
//   return cloneObj;
// }


// function fn(str) {
//   const obj = {
//       '(':')',
//       '{':'}',
//       '[':']'
//   }
//   const temp = ['(', ')', '{', '}', '[', ']'];
//   const arr = [];
//   for(let ii = 0;ii < str.length; ii++) {
//       if(~temp.indexOf(str[ii])) {
//           if(!obj[str[ii]]) {
//               let top = arr.length === 0 ? '#' : arr.pop();
//               if(obj[top] !== str[ii]) return false;
//           } else {
//               arr.push(str[ii]);
//           }
//           console.log(arr);
//       }
//   }
//   return arr.length === 0;
// }
// console.log(fn('{[(1+2)x3]+4}'))
// console.log(fn('(1+2]x[3+4)'))

//  function Person(age) { 
//  this.age = age; 
//  this.growOld = function () { 
//    this.age++; } 
//  }
//  var person = new Person(1); 
//  setTimeout(person.growOld, 1000);
//  setTimeout(function () { console.log(person.age) }, 2000); 

/*
  * 输入一段连续英文字符串，如 nfdjkashfadshjfdhsajhhhh，找出重复出现次数最多 的字母。
*/

// function fn(str) {
//   const obj = {};
//   for(let ii = 0; ii < str.length; ii++) {
//       if(obj[str[ii]]) {
//          obj[str[ii]]++; 
//       } else {
//           obj[str[ii]] = 1;
//       }
//   }
//   return Math.max(...Object.values(obj));
// }
// console.log(fn('nfdjkashfadshjfdhsajhhhh'))


// function fn(arr) {
//   let resultArr = [];
//   for(let ii = 0; ii < 5; ii++) {
//     let index = Math.floor(Math.random() * arr.length);
//     if(!resultArr.includes(arr[index])) {
//       resultArr.push(arr[index]);
//     } else {
//       ii--;
//     }
//   }
//   return resultArr;
// }
// console.log(fn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]));

// function fn(arr) {
//   let resultArr = [];
//   for(let jj = 0; jj < 5; jj++) {
//     let index = Math.floor(Math.random() * arr.length);
//     resultArr.push(arr[index]);
//     arr.splice(index, 1);
//   }
//   return resultArr;
// }
// console.log(fn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]));


// [-1, -1, -1, -1, -1]

function fn(arr) {
  for(let ii = 0; ii < 5; ii++) {
    let index = Math.floor(Math.random() * arr.length);
    [arr[ii], arr[index]] = [arr[index], arr[ii]];
  }
  return arr.slice(0, 5);
}
console.log(fn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]));



function Person(age) {
  this.age = age;
  this.growOld = function () { this.age++;console.log(this); }
}
var person = new Person(1);
setTimeout(person.growOld,1000);
setTimeout(function(){console.log(person.age); },2000);


function SUM(n) {
  return function(m) {
    return n + m;
  }
}
console.log(SUM(1)(2));

function SUM(n) {
  var sum = n;
  function addMore(m) {
    sum += m;
    return addMore;
  }
  addMore.toString = function() {
    return sum;
  }
  return addMore;
}
console.log(SUM(1)(2)(3));