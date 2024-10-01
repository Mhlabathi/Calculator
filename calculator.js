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

//Variable declarations
let display = document.querySelector(".display");

let number1 = '';
let number2 = '';
let answer = undefined;
let operator = '';

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector('#equals');
const cancelBtn = document.querySelector('#cancel');


//Eventlisteners
cancelBtn.addEventListener('click', ()=>{
    number1 = '';
    number2 = '';
    answer = undefined;
    operator = '';
    display.textContent = '';
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
    number1 = '';
    number2 = '';
    operator = '';
});

numberBtns.forEach(btn =>{
    btn.addEventListener("click", (e) =>{
        number1 += e.target.textContent;
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
            answer = operate(operator, Number(answer), Number(number1));
            display.textContent = answer;
            number2 = answer; //to free number1 variable so that we use it on the next number input after operation is clicked
            number1 = '';
        }
        else{
            operator = e.target.textContent;
            number2 = number1; //to free number1 variable so that we use it on the next number input after operation is clicked
            number1 = '';
        }

        console.log(`1: ${number1} || 2: ${number2} || answer: ${answer}`);
    })
});