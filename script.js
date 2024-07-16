var state={
    balance:0,
    income:8,
    expense:0,
    transactions:[
        // {id:uniqueid(), name:'Salary',amount:4000,type:'income'},
        // {id:uniqueid(), name:'Buy Guitar',amount:600,type:'expense'},
        // {id:uniqueid(), name:'Rent',amount:300,type:'expense'}
    ]

}


var balanceEl = document.querySelector('#balance');
var incomeEl = document.querySelector('#income');
var expenseEl = document.querySelector('#expense');
var transactionsEl = document.querySelector('#transaction');
var incomeBtnEl = document.querySelector('#incomeBtn');
var expenseBtnEl = document.querySelector('#expenseBtn');
var nameInputEl = document.querySelector('#name');
var amountInputEl = document.querySelector('#amount'); 

function init(){
    updateState();
    initListeners();
}

function uniqueid(){
    return Math.round(Math.random() * 1000000);
}

function initListeners(){
    incomeBtnEl.addEventListener('click', onAddIncomeClick);
    expenseBtnEl.addEventListener('click', onAddExpenseClick);
}

function addTransaction(name,amount,type){
    if(name !== '' && amount !== ''){
        var transaction= {
            id:uniqueid(),
            name:name,
            amount:parseInt(amount),
            type:type};
        state.transactions.push(transaction);
    
        updateState();
    }else{
        alert('Please Enter valid data');
    }

    nameInputEl.value='';
    amountInputEl.value='';
}
function onAddIncomeClick(){
    addTransaction(nameInputEl.value,amountInputEl.value,'income');
}


function onAddExpenseClick(){
    addTransaction(nameInputEl.value,amountInputEl.value,'expense');
}
function updateState(){
    var income=0,
        expense=0,
        balance=0,
        item;

    for(var i=0; i<state.transactions.length; i++){
        item  = state.transactions[i];

        if(item.type === 'income'){
            income += item.amount;
        }else if(item.type === 'expense'){
            expense += item.amount;
        }
    }
    balance = income - expense;
    state.balance = balance;
    state.income =income;
    state.expense = expense;
    render();
}

function onDeleteClick(event){
    console.log(event.target);
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;
    for(var i=0; i<state.transactions.length; i++){
        if(state.transactions[i].id === id){
            deleteIndex = i;
            break;
        }
    }

    state.transactions.splice(deleteIndex,1);

    updateState(); //UI should re render
}


function render(){
 
    balanceEl.innerHTML = `$${state.balance}`;
    incomeEl.innerHTML = `$${state.income}`;
    expenseEl.innerHTML = `$${state.expense}`;

    var transactionEl,containerEl,amountEl,item;
    transactionsEl.innerHTML = '';

    for(var i=0;i<state.transactions.length;i++){
        item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(item.name);

        transactionsEl.appendChild(transactionEl);

        containerEl = document.createElement('div');
        amountEl = document.createElement('span');
        if(item.type === 'income'){
            amountEl.classList.add('income-amt');
        }else if(item.type === 'expense'){
            amountEl.classList.add('expense-amt');
        }
        amountEl.innerHTML = `$${item.amount}`;
        containerEl.appendChild(amountEl);

        btnEl = document.createElement('button');
        btnEl.setAttribute('data-id',item.id);
        btnEl.innerHTML = 'X';

        btnEl.addEventListener('click',onDeleteClick);

        containerEl.appendChild(btnEl); 
      
        transactionEl.appendChild(containerEl);
    }
}
init();
