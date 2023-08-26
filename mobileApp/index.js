import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://playground-b94ac-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database,"shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    clearInputFieldEl()
    push(shoppingListInDb,inputValue)
    console.log(inputValue)
    //appendItemToShoppingListEl(inputValue)
})

onValue(shoppingListInDb, function(snapshot) {
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let item of itemsArray){
            appendItemToShoppingListEl(item)
            //console.log(item+" item")
        }
    }else{
        shoppingListEl.innerHTML = "No items here yet..."
    }
})

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function appendItemToShoppingListEl(item){
    let itemId = item[0]
    let itemValue = item[1]
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click",function(){
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemId}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}