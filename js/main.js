// import { Conrollers } from "./Conrollerss";
// import { Meal } from "./Meal";

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

// search inputs
const searchByName = document.querySelector("#searchByName");
const searchByFirstLetter = document.querySelector("#searchByFirstLetter");

// types Enum
// factory design pattern
const queryTypesEnum = {
  name: "name",
  firstLetter: "firstLetter",
  category: "category",
  area: "area",
};

let isHidden = true;
nav.style.left = `-${navClosableAreaOffset}px`;

closeIcon.addEventListener("click", function () {
  closeAndOpenNav();
});

burgerIcon.addEventListener("click", function () {
  closeAndOpenNav();
});

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

class Conrollers {
  constructor() {
    this.baseUrl = `https://www.themealdb.com/api/json/v1/1/`;
  }

  async searchMealsByType(type, query) {
    let endpoint;
    switch (type) {
      case queryTypesEnum.name:
        endpoint = `search.php?s=${query}`;
        break;
      case queryTypesEnum.firstLetter:
        endpoint = `search.php?f=${query}`;
        break;
      case queryTypesEnum.category:
        endpoint = `categories.php`;
        break;
      case queryTypesEnum.area:
        endpoint = `list.php?a=list`;
    }
    let response = await fetch(`${this.baseUrl}${endpoint}`);
    return await response.json();
  }
}

class Meal {
  constructor(
    name,
    area,
    category,
    instruc,
    image,
    source,
    tags,
    youtube,
    receipes
  ) {
    this.name = name;
    this.area = area;
    this.category = category;
    this.instructions = instruc;
    this.image = image;
    this.mealSource = source;
    this.mealTags = tags;
    this.youtube = youtube;
    this.receipes = receipes;
  }
}

class Category {
  constructor(id, name, image, desc) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = desc;
  }
}
class Area {
  constructor(name) {
    this.areaName = name;
  }
}

function showCategories() {
  getCategories("category", null);
}

async function getMeals(apiType, query) {
  if (query != undefined) {
    let meals = new Conrollers();
    let responseArray = await meals.searchMealsByType(apiType, query);
    let mealsArray = responseArray.meals;
    let list = [];
    if (
      apiType == queryTypesEnum.name ||
      apiType == queryTypesEnum.firstLetter
    ) {
      if (mealsArray != null) {
        // map instead of forloop
        for (let i = 0; i < mealsArray.length; i++) {
          let meal = mealsArray[i];
          list.push(
            new Meal(
              // deseralize/seralize objects in js
              mealsArray[i].strMeal,
              mealsArray[i].strArea,
              mealsArray[i].strCategory,
              mealsArray[i].strInstructions,
              mealsArray[i].strMealThumb,
              mealsArray[i].strSource,
              mealsArray[i].strTags,
              mealsArray[i].strYoutube,
              mealsArray[i].strIngredient1
            )
          );
        }
      }
    } else if (apiType == queryTypesEnum.area) {
      for (let i = 0; i < mealsArray.length; i++) {
        list.push(new Area(mealsArray[i].strArea));
      }
    }
    assignMealsToHtml(apiType, list);
  }
}

async function getCategories(apiType) {
  let meals = new Conrollers();
  let responseArray = await meals.searchMealsByType(apiType, null);
  let categoryArray = responseArray.categories;
  let categoriesList = [];
  if (categoryArray != null) {
    for (let i = 0; i < categoryArray.length; i++) {
      categoriesList.push(
        new Category(
          categoryArray[i].idCategory,
          categoryArray[i].strCategory,
          categoryArray[i].strCategoryThumb,
          categoryArray[i].strCategoryDescription
        )
      );
    }
  }
  assignCategoriesToHtml(categoriesList);
}

// getMeals();

function assignMealsToHtml(apiType, list) {
  let temp = "";
  if (apiType == queryTypesEnum.name || apiType == queryTypesEnum.firstLetter) {
    for (let i = 0; i < list.length; i++) {
      temp += `
        <div class="col-12 col-md-6 col-lg-3">
        <div class="food-card rounded-3 overflow-hidden">
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
  } else if (apiType == queryTypesEnum.area) {
    console.log("here");
    for (let i = 0; i < list.length; i++) {
      console.log(list[0].areaName);
      temp += `
          <div class="col-12 col-md-6 col-lg-3">
          <div class="food-card rounded-3 text-center">
          <i class="fa-solid fa-city fa-3x text-danger"></i>
          <p class="lead text-white">${list[i].areaName}</p>
            
            
          </div>
        </div>    
          `;
    }
  }

  foodSection.innerHTML = temp;
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
}

// event listeners

search.addEventListener("click", () => {
  seachSection.classList.remove("visually-hidden");
  categoriesSection.classList.add("visually-hidden");
});

searchByName.addEventListener("input", function (e) {
  getMeals(queryTypesEnum.name, e.target.value);
});
searchByFirstLetter.addEventListener("input", function (e) {
  getMeals(queryTypesEnum.firstLetter, e.target.value);
});

categories.addEventListener("click", () => {
  categoriesSection.classList.remove("visually-hidden");
  seachSection.classList.add("visually-hidden");
  showCategories();
});

area.addEventListener("click", () => {
  getMeals(queryTypesEnum.area, "dummy Text");
});

// abstraction
// polymorphism
// inhertance
// encapsulation (data hidding)
// public human

// ahmed

// animal

// abstraction vs encapsulation => black box

// interface vs abstract class
