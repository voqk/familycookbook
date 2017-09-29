import * as moment from 'moment';

export interface User {
    id: string;
}

export class Recipe {

    name: string;
    body: string;
    lastEditTimeStamp: moment.Moment;

    constructor(recipeDto: RecipeDto, recipeInfoDto: RecipeInfoDto) {
        this.name = recipeInfoDto.name;
        this.body = recipeDto.body;
        this.lastEditTimeStamp = recipeInfoDto.lastSaved ? moment(recipeInfoDto.lastSaved) : undefined;
    }
}

export class RecipeDto {

    public body: string;

    constructor(recipe: Recipe) {
        this.body = recipe.body;
    }
}

export class RecipeInfoDto {

    public name: string;
    public lastSaved: string;

    constructor(recipe: Recipe) {
        this.name = recipe.name;
        this.lastSaved = recipe.lastEditTimeStamp ? recipe.lastEditTimeStamp.toISOString() : moment().toISOString();
    }
}