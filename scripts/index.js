const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');


let meals = []
if(localStorage.getItem("meals") == undefined){
  localStorage.setItem("meals", JSON.stringify(meals));
} else {
  const mealsJSON = localStorage.getItem("meals");
  meals = JSON.parse(mealsJSON);
}

// add.addEventListener('click', check);
// window.addEventListener('keydown', (e) => {
// 	if(e.which == 13){
// 		check();
// 	}
// })

// function check(){
// 	if(inputValue.value != ""){
// 		new item(inputValue.value);
//         todos.push(inputValue.value);
//         window.localStorage.setItem("todos", JSON.stringify(todos));
// 		inputValue.value = "";
// 	}
// }


// for (var v = 0 ; v < todos.length ; v++){
//     new item(todos[v]);
// }

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LIli");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}