function add(a, b){
    return a+b;
}
function subtract(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function devide(a, b){
    return a/b;
}
let a;
let b;
let operator;
function operate(){
    switch (operator){
        case '+': add(a, b); break;
        case '-': subtract(a, b); break;
        case '*': multiply(a, b); break;
        case '/': devide(a, b); break;
    }
}