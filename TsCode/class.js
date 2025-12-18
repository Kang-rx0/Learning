// 创建类
var User = /** @class */ (function () {
    // constructor 是关键字，用于创建构造函数
    // 构造函数在创建类的实例时用 new 调用，用于初始化属性
    function User(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    return User;
}());
// 创建类的实例，使用 new 初始化
var userInfo = new User("a", "b", 18);
function greeterClass(user) {
    return "Hello, " + user.firstName + " " + user.lastName + ", age: " + user.age;
}
console.log(greeterClass(userInfo));
