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
const buttons = document.querySelector('.buttons'); 
generateNumPad();
function generateNumPad(){
    createButton(
    'clear','delete',
    7,8,9,'÷'
    ,4,5,6,'x'
    ,1,2,3,'-'
    ,'.','0','=','+');
   
}
function createButton(){
    for(let i = 0; i< arguments.length; i++){
        const button = document.createElement('button');
        button.textContent = arguments[i];
        button.classList.add(`button`);
        button.id = `but${arguments[i]}`;
        button.dataset.identifier = arguments[i];
        buttons.appendChild(button);
    }
}