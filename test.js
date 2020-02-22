// 几种常见的手写源码实现

function myNew() {
  var obj = new Object();
  var con = Array.prototype.shift.call(arguments);
  obj.__proto__ = con.prototype;
  var rs = con.apply(obj, Array.prototype.slice.call(arguments));
  return typeof rs === 'object' ? rs : obj;
}

// ========= 无返回值 =============
// const testNewFun = function(name) {
//   this.name = name;
// };

// const newObj = myNew(testNewFun, 'foo');

// console.log(newObj); // { name: "foo" }
// console.log(newObj instanceof testNewFun); // true
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
  var nop = function(){};
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

// const bar = function() {
//   console.log(this.name, arguments);
// };

// bar.prototype.name = 'bar';

// const foo = {
//   name: 'foo'
// };

// const bound = bar.myBind(foo, 22, 33, 44);
// new bound(); // bar, [22, 33, 44]
// bound(); // foo, [22, 33, 44]


Function.prototype.myCall = function(thisArg) {
  if(typeof this !== 'function') return;
  var args = [...arguments].slice(1);
  thisArg.fn = this;
  var rs = thisArg.fn(...args);
  delete thisArg.fn;
  return rs;
}

Function.prototype.myApply = function(thisArg) {
  if(typeof this !== 'function') return;
  var args = [...arguments][1];
  thisArg.fn = this;

  var rs = thisArg.fn(...args);
  delete thisArg.fn;
  return rs;
}

const bar = function() {
  console.log(this.name, [...arguments], arguments);
};

bar.prototype.name = 'bar';

const foo = {
  name: 'foo'
};

bar.myCall(foo, 1, 2, 3); // foo [1, 2, 3]
// bar.myApply(foo, [1, 2, 3]); // foo [1, 2, 3]

// let ary = [1, [2, [3, [4, 5]]], 6];
// let str = JSON.stringify(ary);

// ary = str.replace(/\[|\]/g, '').split(',');


// while (ary.some(Array.isArray)) {
//   ary = [].concat(...ary);
// }

// console.log(ary);