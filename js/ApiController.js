const BASE_URL = `https://www.themealdb.com/api/json/v1/1/`;

export class ApiController {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async requestDataFromServerByEndpoint(endpoint) {
    let response = await fetch(`${this.baseUrl}${endpoint}`);
    return await response.json();
  }

  getMealsByName(mealName) {
    let endpoint = `search.php?s=${mealName}`;
    return this.requestDataFromServerByEndpoint(endpoint);
  }
  getMealsByFirstLetter(firstLetter) {
    let endpoint = `search.php?f=${firstLetter}`;
    return this.requestDataFromServerByEndpoint(endpoint);
  }
  getCategories() {
    let endpoint = `categories.php`;
    return this.requestDataFromServerByEndpoint(endpoint);
  }
  getAreas() {
    let endpoint = `list.php?a=list`;
    return this.requestDataFromServerByEndpoint(endpoint);
  }

  getIngredients() {
    let endpoint = `list.php?i=list`;
    return this.requestDataFromServerByEndpoint(endpoint);
  }

  getMealById(mealId) {
    let endpoint = `lookup.php?i=${mealId}`;
    return this.requestDataFromServerByEndpoint(endpoint);
  }

  filterMealsByCategoryName(categoryName) {
    let endpoint = `filter.php?c=${categoryName}`;
    return this.requestDataFromServerByEndpoint(endpoint);
  }

  filterMealsByAreaName(areaName) {
    let endpoint = `filter.php?a=${areaName}`;
    return this.requestDataFromServerByEndpoint(endpoint);
  }

  async filterMealsByIngredientName(ingredientName) {
    let endpoint = `filter.php?i=${ingredientName}`;
    return this.requestDataFromServerByEndpoint(endpoint);
  }
}
