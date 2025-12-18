// 使用接口interface关键词来定义对象的类型
// 对于必选属性，接口要求对象必须包含这些属性，否则会报错
// 可选属性用?标记
function greeterPerson2(person) {
    return "Hello, " + person.firstName + " " + person.lastName + (person.age ? ", age: ".concat(person.age) : '');
}
var person2 = {
    firstName: "a",
    lastName: "b"
};
console.log(greeterPerson2(person2));
