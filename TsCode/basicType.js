// 布尔值
var isDone = false;
isDone = true;
// isDone = 2 是错的
// 数字
var a1 = 10; // 十进制
var a2 = 10; // 二进制
var a3 = 10; // 八进制
var a4 = 0xa; // 十六进制
// 字符串, 单引号或者双引号都可以
var aname = 'tom';
aname = 'jack';
var age = 12; // 支持重新赋值
var info = "My name is ".concat(aname, ", I am ").concat(age, " years old!");
// Undifined 和 Null, 可以将这两种类型的变量赋值为任何类型的
// u=1; u="abc"; u=true; 都是可以的
var u = undefined;
var n = null;
// 数组，有两种方式。 1. 类型+[]; 2. 用Array<类型>关键字
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
// 元组，属于数组的一种。可以指定数组中每个元素的类型, 顺序
var tuple1;
tuple1 = ['hello', 10]; // 正确
// tuple1 = [10, 'hello']; // 错误
// console.log(tuple1[0].substring(2)); 输出 llo，从索引为2开始的字符
// console.log(tuple1[0].substring(1,3)); 输出 el，从索引为1开始，输出到索引为3-1的字符
// 枚举，enum关键字。为一组值赋予编号，默认从0开始编号，也可以手动指定成员的数值  
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green; // c的值为1
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 4] = "Blue";
})(Color2 || (Color2 = {}));
; // 手动指定数值
var c2 = Color2.Blue; // c2的值为4
var colorName = Color2[4]; // colorName的值为'Blue', 
// 作用是，知道值但不知道名字的情况下，可以取到对应的名字
// 任意值，any关键字， 变量可以是任意类型，用在数组时，数值内可以是多种类型
var arr3 = [1, true, 'hello'];
// 空值，void关键字
/*
表示没有任何类型,
1. 一般用来说明函数的返回值不能是undefined和null之外的值
2. 函数没有return
*/
function fn() {
    console.log('this is fn function');
}
// object，表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
function fn2(obj) {
    console.log('fn2()', obj);
    return {};
}
;
console.log(fn2(new String('abc'))); // 输出 fn2() [Function: String] 和 {}
console.log(fn2([1, 2, 3])); // 输出 fn2() [ 1, 2, 3 ] 和 {}
// fn2(123); // 报错，123是number类型，不是object类型
