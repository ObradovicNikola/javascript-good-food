let myInput = document.getElementById("myInput");
let errorMsg = document.getElementById("error-msg");
let list = document.getElementById("meals");

const multiSpacePattern = /\s\s+/g;

function createElementFromString(value, likes) {
  const template = `
  <li class="item">
    <div class="left">
     <input type="checkbox" />
      <p class="name">${value}</p>
    </div>
    <div class="right">
      <span class="counter">${likes}</span>
      <span class="like">
        <i class="fas fa-thumbs-up"></i>
      </span>
      <span class="dislike">
        <i class="fas fa-thumbs-down"></i>
      </span>
    </div>
  </li>`;

  let div = document.createElement("div");
  div.innerHTML = template.trim();

  return div.firstChild;
}

let meals = [{}];
if (localStorage.getItem("meals") == undefined) {
  meals = [
    { name: "Spageti", likes: 3, checked: false },
    { name: "Sarma", likes: 5, checked: false },
    { name: "Rostilj", likes: 7, checked: false },
  ];
  localStorage.setItem("meals", JSON.stringify(meals));
} else {
  const mealsJSON = localStorage.getItem("meals");
  meals = JSON.parse(mealsJSON);
}
function initializeListElements() {
  for (let i = 0; i < meals.length; i++) {
    meals[i].checked = false;
    let newItem = createElementFromString(meals[i].name, meals[i].likes);
    let title = newItem.getElementsByClassName("name")[0];

    let thumbUp = newItem.getElementsByClassName("like")[0];
    thumbUp.onclick = function like() {
      let counter = newItem.getElementsByClassName("counter")[0];
      let likes = counter.innerHTML;
      likes++;
      counter.innerHTML = likes;

      for (let j = 0; j < meals.length; j++) {
        if (meals[j].name == title.innerHTML) {
          meals[j].likes = likes;
          localStorage.setItem("meals", JSON.stringify(meals));
          return;
        }
      }
    };

    let thumbDown = newItem.getElementsByClassName("dislike")[0];
    thumbDown.onclick = function like() {
      let counter = newItem.getElementsByClassName("counter")[0];
      let likes = counter.innerHTML;
      likes--;
      counter.innerHTML = likes;

      for (let j = 0; j < meals.length; j++) {
        if (meals[j].name == title.innerHTML) {
          meals[j].likes = likes;
          localStorage.setItem("meals", JSON.stringify(meals));
          return;
        }
      }
    };

    let inputCheks = newItem.getElementsByTagName("input");
    for (let i = 0; i < inputCheks.length; i++) {
      inputCheks[i].addEventListener("click", function hey() {
        if (title.style.textDecoration == "line-through") {
          title.style.textDecoration = "none";
          for (let j = 0; j < meals.length; j++) {
            if (meals[j].name == title.innerHTML) {
              meals[j].checked = false;
              // ovo se ne pise u local storage!
              return;
            }
          }
        } else {
          title.style.textDecoration = "line-through";
          for (let j = 0; j < meals.length; j++) {
            if (meals[j].name == title.innerHTML) {
              meals[j].checked = true;
              // ovo se ne pise u local storage!
              return;
            }
          }
        }
      });
    }

    list.prepend(newItem);
  }
}

initializeListElements();

function resetError() {
  errorMsg.className = "is-hidden";
}
myInput.addEventListener("focus", resetError);

function parseInput() {
  const verified = JSON.parse(localStorage.getItem("verified"));
  if (verified !== true) {
    if (
      window.confirm(
        'You have to get verified first! If you click "ok" you will be redirected to the verification tab. Cancel will return you back.'
      )
    ) {
      window.location.href = "/verification.html";
    }
    myInput.value = "";
    return;
  }

  const newMeal = myInput.value.replace(multiSpacePattern, " ").trim();

  if (newMeal == undefined || newMeal == "") {
    myInput.value = "";
    errorMsg.className = "";
    return;
  }
  resetError();
  addItem();
}

function addItem() {
  let newItem = createElementFromString(myInput.value, 0);
  let title = newItem.getElementsByClassName("name")[0];
  meals.push({ name: myInput.value, likes: 0, checked: false });
  localStorage.setItem("meals", JSON.stringify(meals));

  let thumbUp = newItem.getElementsByClassName("like")[0];
  thumbUp.onclick = function like() {
    let counter = newItem.getElementsByClassName("counter")[0];
    let likes = counter.innerHTML;
    likes++;
    counter.innerHTML = likes;

    for (let j = 0; j < meals.length; j++) {
      if (meals[j].name == title.innerHTML) {
        meals[j].likes = likes;
        localStorage.setItem("meals", JSON.stringify(meals));
        return;
      }
    }
  };

  let thumbDown = newItem.getElementsByClassName("dislike")[0];
  thumbDown.onclick = function like() {
    let counter = newItem.getElementsByClassName("counter")[0];
    let likes = counter.innerHTML;
    likes--;
    counter.innerHTML = likes;

    for (let j = 0; j < meals.length; j++) {
      if (meals[j].name == title.innerHTML) {
        meals[j].likes = likes;
        localStorage.setItem("meals", JSON.stringify(meals));
        return;
      }
    }
  };

  let inputCheks = newItem.getElementsByTagName("input");
  for (let i = 0; i < inputCheks.length; i++) {
    inputCheks[i].addEventListener("click", function hey() {
      if (title.style.textDecoration == "line-through") {
        title.style.textDecoration = "none";
        for (let j = 0; j < meals.length; j++) {
          if (meals[j].name == title.innerHTML) {
            meals[j].checked = false;
            // ovo se ne pise u local storage!
            return;
          }
        }
      } else {
        title.style.textDecoration = "line-through";
        for (let j = 0; j < meals.length; j++) {
          if (meals[j].name == title.innerHTML) {
            meals[j].checked = true;
            // ovo se ne pise u local storage!
            return;
          }
        }
      }
    });
  }

  list.prepend(newItem);
  myInput.value = "";
}

myInput.addEventListener("keydown", (e) => {
  resetError(); // when typing a new value, hide error msg
  if (e.which == 13) {
    parseInput();
  }
});

let removeSelected = document.getElementById("removeSelected");
let removeAll = document.getElementById("removeAll");

removeSelected.addEventListener("click", function removeSelected() {
  const verified = JSON.parse(localStorage.getItem("verified"));
  if (verified !== true) {
    if (
      window.confirm(
        'You have to get verified first! If you click "ok" you will be redirected to the verification tab. Cancel will return you back.'
      )
    ) {
      window.location.href = "/verification.html";
    }
    myInput.value = "";
    return;
  }

  for (let i = 0; i < meals.length; i++) {
    if (meals[i].checked) {
      meals.splice(i, 1);
      i--;
    }
  }
  localStorage.setItem("meals", JSON.stringify(meals));

  list.innerHTML = "";
  initializeListElements();
});

removeAll.addEventListener("click", function removeAll() {
  const verified = JSON.parse(localStorage.getItem("verified"));
  if (verified !== true) {
    if (
      window.confirm(
        'You have to get verified first! If you click "ok" you will be redirected to the verification tab. Cancel will return you back.'
      )
    ) {
      window.location.href = "/verification.html";
    }
    myInput.value = "";
    return;
  }

  meals = [];

  localStorage.setItem("meals", JSON.stringify(meals));
  list.innerHTML = "";
  initializeListElements();
});
