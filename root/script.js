

let savedToDos = []; //array for placing saved todos

function buttonClick(){
    let listText = document.getElementById('add-item-input').value; //gets the value from the input box

    if( listText  !=''){ //if input value does not equal empty it runs whats in the if statement

        //variabels for generating the date
        var today = new Date(); 
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
        let postObject = {
          posts: listText, //this section shows the intial to do item
          postTime: date,  //in addition to make sure the date & time gets passed on
          NumberOfClicks: 0 //starting num clicks at 0
        }
        
        let list = document.createElement('li'); //creating the list elements
        list.innerText = postObject.posts + " " + postObject.postTime; //inner text of the list variable is concatenated with postObjects values
        //finishPost = list.innerText;
        applyToDoBehavior(list,postObject); //calling the function from below to run


        document.body.appendChild(list); //adding new content to the web page
    
        let item = document.createElement("li"); //creating the date to appear on page, and also making sure the typed out list item is rendered
        item.innerText = date;  // inner text of that = date variable

      
      savedToDos.push(postObject); //adds items to savedToDo array
        localStorage.setItem("storedToDos",JSON.stringify(savedToDos)); //stringifys the object in local storage 
      
    }

}

//function for clearing input box after typing
function clearInputFeild(){
    document.getElementById('add-item-input').value = '';
}


//function for generating list items to stay on page load
function storeItems(){
    let storedToDos = JSON.parse(localStorage.getItem("storedToDos")); //enables items to render
    if(storedToDos){  // savedToDos is the array that allows you to type in the program. 
        savedToDos = storedToDos;  //storedToDo is the key variable that enables us to parse
    } 

    for( i = 0; i < savedToDos.length; i++){ 
        let itemsStored = document.createElement("li"); // creates li's to store on page.
        let toDo = savedToDos[i]; // this enabled items to stay on page
        if (toDo.NumberOfClicks==1){  //apply strike through for local storage and post object to local storage 
            itemsStored.style.textDecoration = "line-through" //make line go through
        } 
        applyToDoBehavior(itemsStored,toDo); 
                itemsStored.innerText = toDo.posts + " " + toDo.postTime; //this refrances the postObject from above and enables elements (li), (innerText) to stay on page
            document.body.appendChild(itemsStored);  //appending enables items to stay on page refresh.
    }


}

  storeItems() // calling this function enbables items to be stored on page load

  function applyToDoBehavior(list,postObject){ // list helps us create items and postObject and enables element (li) and object (postObject) to run when called on.
    
    list.addEventListener("click",function(){ // listens for click then runs block of code.

        postObject.NumberOfClicks++ //this is important for when num click = 0 
      if (postObject.NumberOfClicks==1){ //if the number of clicks = 1 
          list.style.textDecoration = "line-through" //applies the line through
      } else if (postObject.NumberOfClicks==2){ //if number of clicks is 2 
          list.remove()  //removes the list item

          let updatedSavedToDos = []; // updates updatedsavedToDos on refresh
          // list.remove removes it visually, this for loop updates the array
          for(i = 0; i < savedToDos.length; i++){  //runs through each items in the array
              if (savedToDos[i] != postObject){  // if it dosent equal post object
                  updatedSavedToDos.push(savedToDos[i]); //pushing updated values into updatedSavedToDos array.
              }
          }
          savedToDos = updatedSavedToDos; //savedToDos equlas the updated updatedSavedToDos.
          
          
      } 
    localStorage.setItem("storedToDos", JSON.stringify(savedToDos)); //enables savedToDos to be updated and string
  });

  }