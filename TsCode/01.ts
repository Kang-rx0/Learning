function greeter(name: string) {
    return "Hello, " + name + "!";
}

let user = 'kang';
console.log(greeter(user))

// 下面这个会报错，函数接收的不是sting
// let user = [0,1,2];
// console.log(greeter(user))