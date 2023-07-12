function add(a, b){
    return(parseFloat(a) + parseFloat(b));
}
function subtract(a, b){
    return(parseFloat(a) - parseFloat(b));
}
function multiply(a, b){
    return(parseFloat(a) * parseFloat(b));
}
function devide(a, b){
    return(parseFloat(a) / parseFloat(b));
}
let a;
let b;
let c;
let operator;
function operate(){
    switch (operator){
        case '+': c= add(a, b); break;
        case '-': c= subtract(a, b); break;
        case 'x': c= multiply(a, b); break;
        case '÷': c= devide(a, b); break;
    }
}
const buttons = document.querySelector('.buttons'); 
generateNumPad();
function generateNumPad(){
    createButton(
    'CLEAR','DELETE',
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
        button.addEventListener('click', updateDisplay)
        buttons.appendChild(button);
    }
}
let currentInput = '';
const current = document.querySelector('.current');
function updateDisplay(event){
    const id =event.target.dataset.identifier;
    
    if(!isNaN(parseInt(id)) || (id == '.')&& !(currentInput.split('.').length >1)){
        currentInput += id;
        current.textContent =currentInput;
    }
    else{
        switch(id){
            case '÷': 
            case 'x': 
            case '-': 
            case '+': manageMem(id);
            break;
            case 'CLEAR': break;
            case 'DELETE': break;
            case '=': 
            b = currentInput;
            operate();
            console.log(`a: ${a}, b: ${b}, c: ${c}`);
            current.textContent = c;
            previous.textContent = '';
            break;
            
        }
    }
}
const previous = document.querySelector('.previous');
function manageMem(symbol){
    operator = symbol;
    a = currentInput;
    previous.textContent = currentInput + ' ' +symbol;
    currentInput = '';
    current.textContent = currentInput;
}
