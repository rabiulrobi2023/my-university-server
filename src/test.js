const arr = [1, 2, 3];
const makeDouble = (elm) => elm * 2;
const makeDoubleFun = arr.map(makeDouble);
setTimeout(makeDouble, 5000);
console.log(makeDoubleFun);
console.log('After 5s');
