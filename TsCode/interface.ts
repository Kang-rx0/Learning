// 使用接口interface关键词来定义对象的类型
// 对于必选属性，接口要求对象必须包含这些属性，否则会报错
// 可选属性用?标记
// 只读属性用readonly标记, 只能在对象刚创建的时候赋值，之后不能修改

interface Person{
    firstName: string;
    readonly lastName: string; // 只读属性
    age?: number;  // 可选属性
}

function greeterPerson2(person:Person){
    return "Hello, " + person.firstName + " " + person.lastName + (person.age ? `, age: ${person.age}` : '');
}

let person2: Person = {
    firstName: "a",
    lastName: "b"
};

// console.log(greeterPerson2(person2));  // 输出 Hello, a b
// person2.lastName = "c"; // 报错，lastName是只读属性，不能修改、、

// 接口除了描述对象的形状外，还可以用来描述函数

interface SearchFunc{
    (source: string, subString: string): boolean;
};    // 函数类型接口，要用函数的参数和返回值来描述 

// 令函数mySearch的类型为SearchFunc 
const mySearch: SearchFunc = function(source: string, sub: string): boolean { 
    return source.search(sub) > -1;
};
// console.log(mySearch("hello world", "world")); // 输出 true


// 用接口描述属性或者函数时，可以被类（class）实现（implements）
interface alarm{
    alert(): any;
};

interface light1{
    lightOn(): void;
    lightOff(): void;
}
// 这里定义了两个接口，类可以实现一个或者多个接口
class Car implements alarm, light1{
    alert(){
        console.log("Car alert()");
    }
    lightOn(): void {
        console.log("Car lightOn()");
    }
    lightOff(): void {
        console.log("Car lightOff()");
    }
} // 这里就用类Car实现了两个接口

// 实例化类后就可以调用类的方法
let car = new Car();
car.alert();
car.lightOn();
car.lightOff();


// 接口还可以继承，使用extends关键词,这里继承了的alarm和light1两个接口
interface alarmAndLight extends alarm, light1{
}
