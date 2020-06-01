let not_enough = document.getElementById("not-enough");
let enough = document.getElementById("enough");

let meals = JSON.parse(localStorage.getItem("meals"));

if (meals.length < 3) {
  not_enough.className = "";
  enough.className = "is-hidden";
} else {
  not_enough.className = "is-hidden";
  enough.className = "";

  let first = document.getElementById("first");
  let second = document.getElementById("second");
  let third = document.getElementById("third");

  function compareMeals(a, b) {
    if (a.likes < b.likes) return 1;
    return -1;
  }

  meals.sort(compareMeals);

  first.innerHTML = meals[0].name + " (" + meals[0].likes + ")";
  second.innerHTML = meals[1].name + " (" + meals[1].likes + ")";
  third.innerHTML = meals[2].name + " (" + meals[2].likes + ")";

  console.log(meals);
}
