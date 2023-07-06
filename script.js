import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const appSetting = {
    databaseURL: "https://mobileapp-17447-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

})

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())
        
        clearShoppingListEl()

        for(let i=0; i < itemArray.length; i++){
            let currentItem = itemArray[i]
            // let currentItemID = currentItem[0]
            // let currentItemValue = currentItem[1]

        appendItemsToShoppingListEl(currentItem) 
        }
    }else{
       shoppingListEl.innerHTML = "No Items Here...Yet 🤷‍♂️" 
    }
    
    
    
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemsToShoppingListEl(item){
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.innerHTML = itemValue

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)

    })

    shoppingListEl.append(newEl)
}