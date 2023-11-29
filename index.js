import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-80e27-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-List")
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputField()
})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList()
        for(let i=0;i<itemsArray.length;i++){
            let currentItem = itemsArray[i]
            let currentItemId= currentItem[0]
            let currentItemValue= currentItem[1]
            addToList(currentItem)
        }
    }
    else{
        shoppingListEl.innerHTML="No items here... yet"
    }
    
})

function addToList(item){
    let itemValue=item[1]
    let itemId=item[0]
    let newLiElememnt = document.createElement("li")
    newLiElememnt.textContent = itemValue

    newLiElememnt.addEventListener("dblclick",function(){
       let exactLocationInDB  = ref(database,`shoppingList/${itemId}`)
       remove(exactLocationInDB)
    })

    shoppingListEl.append(newLiElememnt)
}

function clearShoppingList(){
    shoppingListEl.innerHTML=""
}

function clearInputField(){
    inputFieldEl.value=""
}