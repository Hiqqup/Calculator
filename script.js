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
let symbol;
let isResult = false;
const current = document.querySelector('.current');
const previous = document.querySelector('.previous');
function updateDisplay(event){
    const id =event.target.dataset.identifier;
    
    if((!isNaN(parseInt(id)) ||
     (id == '-' &&!current.textContent))||
     (id == '.'&& (!(current.textContent.split('.').length >1 )))){
        if(isResult){
            current.textContent = id;
            isResult =false;
        }
        else current.textContent += id;
        console.log();
    }
    else{
        switch(id){
            case '÷': 
            case 'x': 
            case '-': 
            case '+': 
            if(!previous.textContent && current.textContent)putPrevious(current.textContent, id);
            else if (!isNaN(parseFloat(current.textContent)))putPrevious(calculate(), id);
            else if (current.textContent) putPrevious(previous.textContent.split(' ')[0], id);
        
            break;
            case 'CLEAR':
                current.textContent = previous.textContent ='';
                isResult = false;
            break;
            case 'DELETE': 
                if (!current.textContent) {
                    current.textContent = previous.textContent.split(' ')[0];
                    previous.textContent = '';
                }
                current.textContent = current.textContent.substring(0, current.textContent.length-1); 
            break;
            case '=': 
            current.textContent = calculate();
            previous.textContent = '';
            break;
            
        }
    }
}
function putPrevious(num, id){
    previous.textContent = num +' '+ id;
    current.textContent = '';
    symbol = id;
    isResult = false;
}
function calculate(){
    let b = parseFloat(current.textContent);
    let a = parseFloat(previous.textContent.split(' ')[0]);
    let r ;
    if(!isNaN(a) && !isNaN(b) && symbol){ 
        switch(symbol){
            case '÷': r=a /b; break;
            case 'x': r=a *b; break;
            case '-': r=a -b; break;
            case '+': r=a +b; break;
        }
        isResult = true;
        return r;
    }

    if (a) return a; 
    else if (b) return b;
}

