// Crear referencias iniciales
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount =  document.getElementById("amount");
const expenditureValue =  document.getElementById("expenditure-value");
const balanceValue =  document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount =0;

//Establecer Presupuesto
totalAmountButton.addEventListener("click",()=>{
    tempAmount= totalAmount.value;
   

    if(tempAmount=="" || tempAmount<0){
        errorMessage.classList.remove("hide");
    }
    else
    {
        errorMessage.classList.add("hide");
    
    amount.innerHTML=tempAmount;

         
  //Establecer Balance
    balanceValue.innerText= tempAmount-expenditureValue.innerText;
  //Borrar cuadro
    totalAmount.value="";
    }
});
    //deshabilitar el botón editar y eliminar
    const disableButtons = (bool)=> {
        let editButtons = document.getElementsByClassName("edit");
        Array.from(editButtons).forEach(element =>{
            element.disabled = bool;
        });
    };
    //modificar elementos de la lista
    const modifyElement=(element,edit=false)=>{
        let parentDiv = element.parentElement;
        let currentBalance =  balanceValue.innerText;
        let currentExpense = expenditureValue.innerText;
        let parentAmount = parentDiv.querySelector(".amount").innerText;
        if(edit){
            let parentText = parentDiv.querySelector(".product").innerText;
            productTitle.value= parentText;
            userAmount.value=parentAmount;
            disableButtons(true);
        }
        balanceValue.innerText=parseInt(currentBalance)+ parseInt(parentAmount);
        expenditureValue.innerText=parseInt(currentExpense)-parseInt(parentAmount);
        parentDiv.remove();
    };


    //Función para crear lista de gastos
    const listCreator =(expenseName, expenseValue) =>{
        let subListContent = document.createElement("div");
        subListContent.classList.add("sublist-content", "flex-space");
        list.appendChild(subListContent);
        subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
        let editButton = document.createElement("button");
        editButton.classList.add("fa-solid","fa-pen-to-square","edit");
        editButton.style.fontSize ="24px";
        editButton.addEventListener("click", ()=>{
            modifyElement(editButton,true);
        });
        let deleteButton =  document.createElement("button");
        deleteButton.classList.add("fa-solid","fa-trash-can","delete");
        deleteButton.style.fontSize= "24px";
        deleteButton.addEventListener("click", ()=>{
            modifyElement(deleteButton);
        });
        subListContent.appendChild(editButton);
        subListContent.appendChild(deleteButton);
        document.getElementById("list").appendChild(subListContent);
    };

    //Agregar gastos
    checkAmountButton.addEventListener("click",()=>{

        if(!userAmount.value || !productTitle.value){
            productTitleError.classList.remove("hide");
            return false;
        }
        //habilitar botones
        disableButtons(false);
        //total expense
        let expenditure = parseInt(userAmount.value);
        let sum = parseInt(expenditureValue.innerText)+expenditure;
        expenditureValue.innerText=sum;
        //Calcular Balance
        const totalBalance =  tempAmount-sum;
        balanceValue.innerText = totalBalance;
        //Agregar a la lista
        listCreator(productTitle.value, userAmount.value);

        productTitle.value="";
        userAmount.value="";
    });