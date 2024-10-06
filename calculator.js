//functions
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function populateDisplay(elem){
    display.textContent = elem;

}

function operate(op, num1, num2){
    switch(op){
        case '+': return add(num1, num2);
        break;
        case '-': return subtract(num1, num2);
        break;
        case '*': return multiply(num1, num2);
        break;
        case '/':
            if(num2 === 0){
                return 'ERROR!';
            }
            else{
                return divide(num1, num2);
            }
    }
}

function checkDot(){
    return dot.includes('.') ? true : false;
}

function createDecimal(){
    if(register[0] === number1){
        number1 += '.';
    }
    else if(register[0] === number2){
        number2 += '.';
    }
}

//Variable declarations
let display = document.querySelector(".display");
display.textContent = '0'

let number1 = '';
let number2 = '';
let answer = undefined;
let operator = '';
let dot = '';
let register = [number1]; //maps the last number on display to the actual variable on display

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector('#equals');
const cancelBtn = document.querySelector('#cancel');
const dotBtn = document.querySelector('.dot');
dotBtn.disabled = false;


//Eventlisteners
dotBtn.addEventListener('click', ()=>{
    if( !checkDot() ){
        dot = '.';
        dotBtn.disabled = true;
        createDecimal();
    }
});

cancelBtn.addEventListener('click', ()=>{
    number1 = '';
    number2 = '';
    answer = undefined;
    operator = '';
    display.textContent = '0';
    dot = '';
    dotBtn.disabled = false;
});

equalBtn.addEventListener('click', ()=>{
    if(answer === undefined){
        answer = operate(operator, Number(number2), Number(number1));
        display.textContent = answer;
    }
    else{
        answer = operate(operator, Number(answer), Number(number1));
        display.textContent = answer;
    }
    register[0] = answer;
    number1 = '';
    number2 = '';
    operator = '';
});

numberBtns.forEach(btn =>{
    btn.addEventListener("click", (e) =>{
        number1 += e.target.textContent;
        register[0] = number1;
        populateDisplay(number1);
    })
});

operatorBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        if(operator != ''){
            answer = operate(operator, Number(number2), Number(number1));
            display.textContent = answer;
            operator = e.target.textContent;
            number2 = answer;
            number1 = '';

        }
        else if(answer != undefined){
            operator = e.target.textContent;
            number2 = answer;
            number1 = '';
        }
        else{
            operator = e.target.textContent;
            number2 = number1; //to free number1 variable so that we use it on the next number input after operation is clicked
            number1 = '';
        }
        dot = '';
        dotBtn.disabled = false;

        console.log(`1: ${number1} || 2: ${number2} || answer: ${answer}`);
    })
});