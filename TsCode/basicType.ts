
// 布尔值
let isDone: boolean = false;
isDone = true;
// isDone = 2 是错的

// 数字
let a1: number = 10; // 十进制
let a2: number = 0b1010;  // 二进制
let a3: number = 0o12; // 八进制
let a4: number = 0xa; // 十六进制

// 字符串, 单引号或者双引号都可以
let aname:string = 'tom';
aname = 'jack';

let age:number = 12 // 支持重新赋值
const info = `My name is ${aname}, I am ${age} years old!`;

// Undifined 和 Null, 可以将这两种类型的变量赋值为任何类型的
// u=1; u="abc"; u=true; 都是可以的
let u: undefined = undefined;
let n: null = null;

// 数组，有两种方式。 1. 类型+[]; 2. 用Array<类型>关键字
let arr1 :number[] = [1,2,3];
let arr2 :Array<number> = [4,5,6];

// 元组，属于数组的一种。可以指定数组中每个元素的类型, 顺序
let tuple1: [string, number];
tuple1 = ['hello', 10]; // 正确
// tuple1 = [10, 'hello']; // 错误

// console.log(tuple1[0].substring(2)); 输出 llo，从索引为2开始的字符
// console.log(tuple1[0].substring(1,3)); 输出 el，从索引为1开始，输出到索引为3-1的字符

// 枚举，enum关键字。为一组值赋予编号，默认从0开始编号，也可以手动指定成员的数值  
enum Color {
  Red,
  Green,
  Blue
};
let c: Color = Color.Green; // c的值为1
enum Color2 { Red = 1, Green = 2, Blue = 4 }; // 手动指定数值
let c2: Color2 = Color2.Blue; // c2的值为4
let colorName:string = Color2[4]; // colorName的值为'Blue', 
// 作用是，知道值但不知道名字的情况下，可以取到对应的名字


// 任意值，any关键字， 变量可以是任意类型，用在数组时，数值内可以是多种类型
let arr3: any[] = [1, true, 'hello'];


// 空值，void关键字
    /* 
    表示没有任何类型, 
    1. 一般用来说明函数的返回值不能是undefined和null之外的值
    2. 函数没有return
    */
function fn(): void {
    console.log('this is fn function');
}


// object，表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
function fn2(obj:object):object {
  console.log('fn2()', obj);
  return {};
};
// console.log(fn2(new String('abc'))); // 输出 fn2() [String: 'abc'] 和 {}
// console.log(fn2([1,2,3])); // 输出 fn2() [ 1, 2, 3 ] 和 {}
// fn2(123); // 报错，123是number类型，不是object类型


// 联合类型，表示一个变量可以是几种类型之一，用|分隔每个类型
function toString2(x: number | string) : string {
  return x.toString()                   // 后面的string表示函数要求返回string类型
}                                       // 函数接收number或string类型的参数
