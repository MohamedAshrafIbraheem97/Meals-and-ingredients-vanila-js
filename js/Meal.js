export class Meal {
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
