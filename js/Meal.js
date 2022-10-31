export class Meal {
  constructor(
    id,
    name,
    image,
    area,
    category,
    instruc,
    source,
    tags,
    youtube,
    receipes
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.area = area;
    this.category = category;
    this.instructions = instruc;
    this.mealSource = source;
    this.mealTags = tags;
    this.youtube = youtube;
    this.receipes = receipes;
  }
}
