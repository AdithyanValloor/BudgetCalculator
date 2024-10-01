const incomeForm = document.getElementById('income-form')
const incomeAmount = document.getElementById('income-amount')

const expenseForm = document.getElementById('expense-form')
const expenseAmount = document.getElementById('expense-amount')

const expenseDesc = document.getElementById('expenseDesc')
const expenseCategory = document.getElementById('expense-category')

const displayIncome = document.getElementById('displayIncome')
const balanceElement = document.getElementById('displayBalance')

const tab = document.getElementById('tab')

const time = document.getElementById('time')
const date = document.getElementById('date')

let income = 0
let expenses = []

// income event

incomeForm.addEventListener('submit', e => {
    e.preventDefault();
    income = parseInt(incomeAmount.value)
    incomeAmount.value = ''
    displayIncome.textContent = `Total income : Rs ${income}`
})

//Expense event 

expenseForm.addEventListener('submit', e => {
    e.preventDefault();
    const expense = {
        description : expenseDesc.value ,
        amount : parseInt(expenseAmount.value) ,
        // category : expenseCategory.value

    }

    expenses.push(expense)
    updateBalance()
})

// Budget summary

let expenseTabArr = []
let balance = 0

const updateBalance = () => {
    const totalExpenses = expenses.reduce((sum,expense) => sum + expense.amount,0)
    balance = income - totalExpenses
    balanceElement.textContent = `Current balance : Rs ${balance}`
    console.log(totalExpenses);

    document.getElementById('tab-title').style.display = 'grid'

    updateTab()
    displayTab()
}

const updateTab = () => {

    const expenseTab = {
        date: date.value,
        time: time.value,
        expenseCategory: expenseCategory.value ,
        expenseDesc: expenseDesc.value,
        expenseAmount: expenseAmount.value,
        balance
    }

    console.log(expenseTab);
    

    expenseTabArr.push(expenseTab)

}

const displayTab = () => {

    let tabHTML = ''

    for(let i = 0 ; i<expenseTabArr.length; i++){
        console.log(expenseTabArr);

        const {time,date,expenseCategory,expenseDesc,expenseAmount,balance} = expenseTabArr[i]

        tabHTML += `
        <div class = 'tab-html'>
        <div>${i+1}.</div>
        <div>${time}</div>
        <div>${date}</div>
        <div>${expenseCategory}</div>
        <div>${expenseDesc}</div>
        <div>Rs ${expenseAmount}</div>
        <div>Rs ${balance}</div>
        </div>`
    }
    
    tab.innerHTML = tabHTML

    expenseDesc.value = ''
    expenseAmount.value = ''
    expenseCategory.value = 'Food'
    time.value = ''
    date.value = ''
}