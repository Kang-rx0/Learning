// 创建类
class User{
    firstName: string;
    lastName: string;
    age: number;

    // constructor 是关键字，用于创建构造函数
    // 构造函数在创建类的实例时用 new 调用，用于初始化属性
    constructor(firstName: string, lastName: string, age: number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    };

    // 一般方法
  greet (): string {
    return 'Hello ' + this.firstName + ' ' + this.lastName;
  }
}
// 创建类的实例，使用 new 初始化
let userGreeter = new User("a","b",18);
// 调用类的方法
console.log(userGreeter.greet());

// 也可以像下面这样定义函数，接收User类型的参数
function greeterClass(user: User){
    return "Hello, " + user.firstName + " " + user.lastName + ", age: " + user.age;
}

console.log(greeterClass(userGreeter)); 


