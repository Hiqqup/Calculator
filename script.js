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
        if(arguments[i] == '+')button.id = 'butplus';
        else if(arguments[i] == '.')button.id = 'butdot';
        else if(arguments[i] == '=')button.id = 'buteq';
        button.dataset.identifier = arguments[i];
        button.addEventListener('mousedown', updateDisplay);
        button.addEventListener('mouseenter', toggleHover);
        button.addEventListener('mouseleave', toggleHover);
        buttons.appendChild(button);
    }
}
function toggleHover(e){
    e.target.classList.toggle('hover');
}
function restoreLast(){
    const obj = history.pop(); 
    if (obj){
        current.textContent = obj.current;
        previous.textContent = obj.previous;
    }
}
let history = [];

window.addEventListener('keydown', updateDisplay);
let symbol;
let isResult = false;
const current = document.querySelector('.current');
const previous = document.querySelector('.previous');
function updateDisplay(event){

    
    // check event type
    let id;
    if(event.type === 'mousedown'){
        id =event.target.dataset.identifier;
    }
    else if(event.type === 'keydown'){
        id = '';
        id = event.key;
        switch (id){
            case '/': id = '÷';break;
            case ':': id = '÷'; break;
            case '*': id = 'x';break;
            case 'Backspace': id = 'DELETE';break;
            case 'Enter': id = '=' ;break;
            case ' ': id = 'CLEAR';break;
            case 'ArrowUp' : restoreLast();
        }
    }
    
    console.log(id);
    
    //check for numbers minus or dot
    if((!isNaN(parseInt(id)) ||
     (id == '-' &&!current.textContent))||
     (id == '.'&& (!(current.textContent.split('.').length >1 )))){
        if(isResult){
            current.textContent = id;
            isResult =false;
        }
        else current.textContent += id;
        if(current.textContent.length > 18) current.classList.add('currentHalf');
        else current.classList.remove('currentHalf');
        
    }
    else{
        //act according to the symbols
        switch(id){
            case '÷': 
            case 'x': 
            case '-': 
            case '+': 
            // there is no previous  and ther is current
            if(!previous.textContent && current.textContent&& current.textContent != '-')putPrevious(current.textContent, id);
            //        //current is a number                        
            else if (!isNaN(parseFloat(current.textContent)))putPrevious(calculate(), id);
                     //there is current text
            else if (previous.textContent) putPrevious(previous.textContent.split(' ')[0], id);
            // else if (!current.textContent)putPrevious(previous.textContent.split(' ')[0], id)
        
            break;
            case 'CLEAR':
                history.push({
                    current:[current.textContent] ,
                    previous:[previous.textContent]
                });
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
    history.push({
        current:[current.textContent] ,
        previous:[previous.textContent]
    });
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

