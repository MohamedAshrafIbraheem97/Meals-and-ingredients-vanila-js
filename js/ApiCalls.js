const BASE_URL = `https://www.themealdb.com/api/json/v1/1/`;

export class Conrollers {
  constructor() {
    this.baseUrl = BASE_URL;
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
