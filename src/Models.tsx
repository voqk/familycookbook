import * as moment from 'moment';

export interface User {
    id: string;
}

export class Recipe {

    name: string;
    body: string;
    section: Section;
    lastEditTimeStamp: moment.Moment;

    constructor(recipeDto: RecipeDto, recipeInfoDto: RecipeInfoDto) {
        this.name = recipeInfoDto.name;
        this.body = recipeDto.body;
        this.section = recipeInfoDto.section;
        this.lastEditTimeStamp = recipeInfoDto.lastSaved ? moment(recipeInfoDto.lastSaved) : undefined;
    }
}

export class Section {
    public id: string;
    public name: string;
}

export class RecipeDto {

    public body: string;

    constructor(recipe: Recipe) {
        this.body = recipe.body;
    }
}

export class RecipeInfoDto {

    public name: string;
    public section: Section;
    public lastSaved: string;

    constructor(recipe: Recipe) {
        this.name = recipe.name;
        this.section = recipe.section;
        this.lastSaved = recipe.lastEditTimeStamp ? recipe.lastEditTimeStamp.toISOString() : moment().toISOString();
    }
}