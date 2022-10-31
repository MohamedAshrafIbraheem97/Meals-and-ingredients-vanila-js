import { ApiController } from "./ApiController.js";
import { Meal } from "./Meal.js";
import { queryTypesEnum } from "./enums.js";
import { Category } from "./Category.js";
import { Ingredient } from "./Ingredient.js";

// navbar
const nav = document.querySelector("nav");
const navClosableAreaOffset =
  document.querySelector(".closable-area").offsetWidth;
const navShownArea = document.querySelector(".shown-area");
const burgerIcon = document.querySelector(".nav-icon .fa-bars");
const closeIcon = document.querySelector(".nav-icon .fa-xmark");

// navBar links
const search = document.querySelector(".upper-section ul a:nth-child(1)");
const categories = document.querySelector(".upper-section ul a:nth-child(2)");
const area = document.querySelector(".upper-section ul a:nth-child(3)");
const ingreditent = document.querySelector(".upper-section ul a:nth-child(4)");
const contactUs = document.querySelector(".upper-section ul a:nth-child(5)");

// sections
const seachSection = document.querySelector(".search");
const foodSection = document.querySelector(".food .container .row");
const categoriesSection = document.querySelector(".categories .container .row");
const mealDetails = document.querySelector(".meal-details");
const ingredientSection = document.querySelector(".ingredients");
let foodCard = "";
let categoryCard = "";
let ingredientCard = "";

// search inputs
const searchByName = document.querySelector("#searchByName");
const searchByFirstLetter = document.querySelector("#searchByFirstLetter");

let isHidden = true;
nav.style.left = `-${navClosableAreaOffset}px`;

closeIcon.addEventListener("click", function () {
  closeAndOpenNav();
});

burgerIcon.addEventListener("click", function () {
  closeAndOpenNav();
});

// Init api call
const mainApi = new ApiController();

function closeAndOpenNav() {
  if (isHidden) {
    isHidden = false;
    // $('nav').animate();
    nav.style.left = `0px`;
    closeIcon.classList.remove("visually-hidden");
    burgerIcon.classList.add("visually-hidden");

    // animation with JS (Not Finished)
    // let id = setInterval(frame, 200);
    // function frame() {
    //   if (nav.style.left == "0px") {
    //     clearInterval(id);
    //   } else {
    //     nav.style.left += `${nav.style.left++}px`;
    //     console.log(nav.style.left);
    //     /* code to change the element style */
    //   }
    // }
  } else {
    isHidden = true;
    nav.style.left = `-${navClosableAreaOffset}px`;
    closeIcon.classList.add("visually-hidden");
    burgerIcon.classList.remove("visually-hidden");
  }
}

// function animateCloseAndOpen() {
//   let id = setInterval(frame, 5);
//   if (isHidden) {
//     function frame() {
//       if (nav.style.left == "0px") {
//         clearInterval(id);
//       } else {
//         nav.style.left = `0px`;
//         /* code to change the element style */
//       }
//     }
//   }
// }

class Area {
  constructor(name) {
    this.areaName = name;
  }
}

async function createMealsList(query) {
  if (query != undefined) {
    let responseArray = "";
    if (query.length == 1) {
      responseArray = await mainApi.getMealsByFirstLetter(query);
    } else {
      responseArray = await mainApi.getMealsByName(query);
    }
    let mealsArray = responseArray.meals;
    let list = [];

    if (mealsArray != null) {
      // map instead of forloop
      for (let i = 0; i < mealsArray.length; i++) {
        let meal = mealsArray[i];
        list.push(
          new Meal(
            mealsArray[i].idMeal,
            mealsArray[i].strMeal,
            mealsArray[i].strMealThumb,
            mealsArray[i].strArea,
            mealsArray[i].strCategory,
            mealsArray[i].strInstructions,
            mealsArray[i].strSource,
            mealsArray[i].strTags,
            mealsArray[i].strYoutube,
            getIngredients(mealsArray[i])
          )
        );
      }
    }
    return list;
  }
}

async function createAreasList() {
  let responseObject = await mainApi.getAreas();
  let areasArray = responseObject.meals;
  let areasList = [];
  for (let i = 0; i < areasArray.length; i++) {
    areasList.push(new Area(areasArray[i].strArea));
  }

  return areasList;
}

async function createCatgoriesList() {
  let responseObject = await mainApi.getCategories();
  let categories = responseObject.categories;
  let categoriesList = [];
  if (categories != null) {
    for (let i = 0; i < categories.length; i++) {
      categoriesList.push(
        new Category(
          categories[i].idCategory,
          categories[i].strCategory,
          categories[i].strCategoryThumb,
          categories[i].strCategoryDescription
        )
      );
    }
    return categoriesList;
  }
}

async function creatMealDetailsObject(mealId) {
  let mealDetailsResponse = await mainApi.getMealById(mealId);
  let mealData = mealDetailsResponse.meals[0];

  let mealDetails = new Meal(
    mealData.idMeal,
    mealData.strMeal,
    mealData.strMealThumb,
    mealData.strArea,
    mealData.strCategory,
    mealData.strInstructions,
    mealData.strSource,
    mealData.strTags,
    mealData.strYoutube,
    getIngredients(mealData)
  );

  assignMealDetailsToHtml(mealDetails);
}

async function createMealsListFromCategoryName(categoryName) {
  let responseArray = "";
  responseArray = await mainApi.filterMealsByCategoryName(categoryName);
  let mealsArray = responseArray.meals;
  let list = [];

  for (let i = 0; i < mealsArray.length; i++) {
    let meal = mealsArray[i];
    list.push(
      new Meal(
        mealsArray[i].idMeal,
        mealsArray[i].strMeal,
        mealsArray[i].strMealThumb
      )
    );
  }

  return list;
}

async function createMealsListFromAreaName(areaName) {
  let responseArray = "";
  responseArray = await mainApi.filterMealsByAreaName(areaName);
  let mealsArray = responseArray.meals;
  let list = [];

  for (let i = 0; i < mealsArray.length; i++) {
    list.push(
      new Meal(
        mealsArray[i].idMeal,
        mealsArray[i].strMeal,
        mealsArray[i].strMealThumb
      )
    );
  }

  return list;
}

async function createMealsListFromIngredientName(ingredientName) {
  let responseArray = "";
  responseArray = await mainApi.filterMealsByIngredientName(ingredientName);
  let mealsArray = responseArray.meals;
  let list = [];

  for (let i = 0; i < mealsArray.length; i++) {
    list.push(
      new Meal(
        mealsArray[i].idMeal,
        mealsArray[i].strMeal,
        mealsArray[i].strMealThumb
      )
    );
  }

  return list;
}

async function createIngredientsList() {
  let responseArray = "";
  responseArray = await mainApi.getIngredients();
  let ingredientsArray = responseArray.meals;

  let list = [];

  for (let i = 0; i < ingredientsArray.length / 15; i++) {
    list.push(
      new Ingredient(
        ingredientsArray[i].idIngredient,
        ingredientsArray[i].strIngredient,
        ingredientsArray[i].strDescription //.split(" ").slice(0, 20).join()
      )
    );
  }
  return list;
}

function assignMealsToHtml(list) {
  let temp = "";
  for (let i = 0; i < list.length; i++) {
    temp += `
      <div class="col-12 col-md-6 col-lg-3">
        <div class="food-card rounded-3 overflow-hidden" id=${list[i].id}>
          <div class="food-image">
            <img class="w-100" src="${list[i].image}" alt="" />
          </div>
          <div class="overlay">
            <p>${list[i].name}</p>
          </div>
        </div>
      </div>            
        `;
  }

  foodSection.innerHTML = temp;

  foodCard = document.querySelectorAll(".food-card");
  foodCard.forEach((element) => {
    element.addEventListener("click", () => {
      creatMealDetailsObject(element.id);
    });
  });
}

function assignAreasToHtml(areas) {
  let temp = "";
  for (let i = 0; i < areas.length; i++) {
    temp += `
        <div class="col-12 col-md-6 col-lg-3">
        <div class="food-card rounded-3 text-center">
        <i class="fa-solid fa-city fa-3x text-danger"></i>
        <p class="lead text-white">${areas[i].areaName}</p>
        </div>
      </div>    
        `;
  }
  foodSection.innerHTML = temp;

  foodCard = document.querySelectorAll(".food-card");
  foodCard.forEach((element) => {
    element.addEventListener("click", async function () {
      assignMealsToHtml(
        await createMealsListFromAreaName(element.querySelector("p").innerHTML)
      );
      showFoodSection();
    });
  });
}

let text =
  "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times. Beef is a source of high-quality protein and nutrients.\r\n\r\nMost beef skeletal muscle meat can be used as is by merely cutting into certain parts, such as roasts, short ribs or steak (filet mignon, sirloin steak, rump steak, rib steak, rib eye steak, hanger steak, etc.), while other cuts are processed (corned beef or beef jerky). Trimmings, on the other hand, are usually mixed with meat from";

// console.log(text.split(" ").slice(0, 20).join());

function assignIngredientsToHtml(ingredientsList) {
  let temp = "";
  for (let i = 0; i < ingredientsList.length; i++) {
    temp += `
    <div class="col-12 col-md-6 col-lg-3">
    <div class="ingredient-card rounded-3 text-center" id=${ingredientsList.id}>
      <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
      <h2 class="lead text-white">${ingredientsList[i].name}</h2>
      <p class="text-white">
      ${
        ingredientsList[i].description
          ? ingredientsList[i].description.split(" ").slice(0, 20).join(" ")
          : ""
      }
      </p>
    </div>
  </div>  
        `;
  }

  ingredientSection.querySelector(".container .row").innerHTML = temp;

  ingredientCard = document.querySelectorAll(".ingredient-card");
  ingredientCard.forEach((element) => {
    element.addEventListener("click", async function () {
      assignMealsToHtml(
        await createMealsListFromIngredientName(
          element.querySelector("h2").innerHTML
        )
      );
      showFoodSection();
      hideIngredientSection();
    });
  });
}

function assignCategoriesToHtml(categories) {
  let temp = "";
  for (let i = 0; i < categories.length; i++) {
    temp += `
    <div class="col-12 col-md-6 col-lg-3">
    <div class="category-card rounded-3 overflow-hidden">
      <div class="category-image">
        <img class="w-100" src="${categories[i].image}" alt="" />
      </div>
      <div class="overlay d-flex flex-column p-2 text-center">
        <h2 class="lead">${categories[i].name}</h2>
        <p class="lead">${categories[i].description
          .split(" ")
          .slice(1, 20)
          .join(" ")}</p>
      </div>
    </div>
  </div>
          `;
  }

  categoriesSection.innerHTML = temp;

  categoryCard = document.querySelectorAll(".category-card");
  categoryCard.forEach((element) => {
    element.addEventListener("click", async function () {
      assignMealsToHtml(
        await createMealsListFromCategoryName(
          element.querySelector(".overlay h2").innerHTML
        )
      );
      showFoodSection();
      hideCategoriesSection();
    });
  });
}

function getIngredients(obj) {
  let mealDetailsObject = Object.entries(obj);
  let ingredients = [];
  let measures = [];
  let ingredientsList = [];
  for (let i = 0; i < mealDetailsObject.length; i++) {
    if (
      mealDetailsObject[i][0].startsWith("strIngredient") &&
      mealDetailsObject[i][1] &&
      mealDetailsObject[i][1] != " "
    ) {
      ingredients.push(mealDetailsObject[i][1]);
    } else if (
      mealDetailsObject[i][0].startsWith("strMeasure") &&
      mealDetailsObject[i][1] &&
      mealDetailsObject[i][1] != " "
    ) {
      measures.push(mealDetailsObject[i][1]);
    }
  }
  for (const [index, item] of ingredients.entries()) {
    ingredientsList.push(measures[index] + " " + item);
  }

  return ingredientsList;
}

function assignMealDetailsToHtml(meal) {
  let receipes = "";
  let tags = "";

  meal.receipes.forEach(
    (element) =>
      (receipes += ` <li class="my-3 mx-1 p-1 alert alert-success rounded-2">${element}</li>`)
  );

  meal.mealTags
    ? meal.mealTags.split(",").forEach((element) => {
        tags += `<li class="my-3 mx-1 p-1 alert alert-danger rounded-2">
         ${element}
    </li>`;
      })
    : "";

  let temp = `
  <div class="col-12 col-md-3">
  <div class="meal-image-and-name text-center">
    <img src="${meal.image}" class="w-100 mb-2" alt="" />
    <h2>${meal.name}</h2>
  </div>
</div>
<div class="col-12 col-md-9">
  <div class="meal-description">
    <h3>Instructions</h3>
    <p class="lead fa-1x">
      ${meal.instructions}
    </p>
    <p><span class="fw-bold">Area : </span>${meal.area}</p>
    <p><span class="fw-bold">Category : </span>${meal.category}</p>
    <div class="recepie-cards">
      <p>Recipes</p>
      <ul class="recepie-card d-flex flex-wrap ps-0">      
        ${receipes}        
      </ul>
      <p>Tags</p>
      <ul class="tags d-flex flex-wrap ps-0">
        ${tags}
      </ul>
      <div class="actions">
      ${
        meal.mealSource
          ? `<a href="${meal.mealSource}" class="btn btn-success" target="_blank">Source</a>`
          : ""
      }
        
      ${
        meal.youtube
          ? `<a href="${meal.youtube}" class="btn btn-danger" target="_blank">YouTube</a>`
          : ""
      }
        
      </div>
    </div>
  </div>
</div>


  `;

  mealDetails.querySelector(".container .row").innerHTML = temp;

  seachSection.classList.add("visually-hidden");
  foodSection.classList.add("visually-hidden");
  mealDetails.classList.remove("visually-hidden");
}

// event listeners

search.addEventListener("click", () => {
  showSearchSection();
  hideCategoriesSection();
  hideMealDetailsSection();
  hideIngredientSection();
  closeAndOpenNav();
});

searchByName.addEventListener("input", async function (e) {
  assignMealsToHtml(await createMealsList(e.target.value));
});
searchByFirstLetter.addEventListener("input", async function (e) {
  assignMealsToHtml(await createMealsList(e.target.value));
});

categories.addEventListener("click", async function () {
  showCategoriesSection();
  hideSearchSection();
  hideFoodSection();
  hideIngredientSection();
  assignCategoriesToHtml(await createCatgoriesList());
  closeAndOpenNav();
});

area.addEventListener("click", async function () {
  hideCategoriesSection();
  showFoodSection();
  hideSearchSection();
  hideIngredientSection();
  assignAreasToHtml(await createAreasList());
  closeAndOpenNav();
});

ingreditent.addEventListener("click", async function () {
  hideCategoriesSection();
  hideFoodSection();
  hideSearchSection();
  showIngredientSection();
  assignIngredientsToHtml(await createIngredientsList());
  closeAndOpenNav();
});
function hideSearchSection() {
  seachSection.classList.add("visually-hidden");
}
function showSearchSection() {
  seachSection.classList.remove("visually-hidden");
}
function hideCategoriesSection() {
  categoriesSection.classList.add("visually-hidden");
}
function showCategoriesSection() {
  categoriesSection.classList.remove("visually-hidden");
}
function hideFoodSection() {
  foodSection.classList.add("visually-hidden");
}
function showFoodSection() {
  foodSection.classList.remove("visually-hidden");
}
function hideMealDetailsSection() {
  mealDetails.classList.add("visually-hidden");
}
function showMealDetailsSection() {
  mealDetails.classList.remove("visually-hidden");
}
function hideIngredientSection() {
  ingredientSection.classList.add("visually-hidden");
}
function showIngredientSection() {
  ingredientSection.classList.remove("visually-hidden");
}

// abstraction
// polymorphism
// inhertance
// encapsulation (data hidding)
// public human

// ahmed

// animal

// abstraction vs encapsulation => black box

// interface vs abstract class
