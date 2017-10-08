import * as moment from 'moment';

import { 
    RecipeDto, 
    RecipeInfoDto,
    Recipe,
    Section
} from '../Models';

import firebase from './firebase';


class Repo {
    private firebase : firebase.app.App;

    constructor() {
        this.firebase = firebase.app;
    }

    public getIndex() : firebase.Promise<{[id: string]: RecipeInfoDto}> {
        return this.firebase.database().ref("/index").once('value').then(snapshot => {
            const index = snapshot.val() || {};
            return index;
        });
    }

    public getSections(): firebase.Promise<{[id: string]: Section}> {
        return this.firebase.database().ref("/sections").once('value').then(snapshot => {
            const sections = snapshot.val() || {};
            return sections;
        })
    }

    public createRecipe(recipe: Recipe) {
        const updates: any = {};

        if(!recipe.section.id) {
            const sectionId = this.firebase.database().ref().child('sections').push().key;
            recipe.section.id = sectionId;
            updates[`/sections/${sectionId}`] = recipe.section;
        }

        // convert to DTOs
        const recipeDto = new RecipeDto(recipe);
        const recipeInfoDto = new RecipeInfoDto(recipe);

        const recipeId = this.firebase.database().ref().child('recipes').push().key;
        updates[`/recipes/${recipeId}`] = recipeDto;
        updates[`/index/${recipeId}`] = recipeInfoDto;

        return this.firebase.database().ref().update(updates).then(resolve => recipeId);
    }

    public updateRecipe(recipeId: string, recipe: Recipe) {
        const updates: any = {};
        if(!recipe.section.id) {
            const sectionId = this.firebase.database().ref().child('sections').push().key;
            recipe.section.id = sectionId;
            updates[`/sections/${sectionId}`] = recipe.section;
        }
        const recipeDto = new RecipeDto(recipe);
        const recipeInfoDto = new RecipeInfoDto(recipe);
        updates[`/recipes/${recipeId}`] = recipeDto;
        updates[`/index/${recipeId}`] = recipeInfoDto;
        return this.firebase.database().ref().update(updates).then(resolve => recipeId);
    }

    public getRecipe(id: string) : firebase.Promise<Recipe> {
        // todo: move this into a cloud-function
        return this.firebase.database().ref(`/index/${id}`).once('value').then(snapshot => {
            const recipeInfoDto = snapshot.val();
            if(recipeInfoDto) {
                return this.firebase.database().ref(`/recipes/${id}`).once('value').then(recipeSnapshot => {
                    const recipeDto = recipeSnapshot.val();
                    return new Recipe(recipeDto, recipeInfoDto);
                });
            }
        });
    }

    public deleteRecipe(id: string) {
        const updates: any = {};
        updates[`/recipes/${id}`] = null;
        updates[`/index/${id}`] = null;

        return this.firebase.database().ref().update(updates);
    }
}

export const repo = new Repo();