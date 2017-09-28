import * as moment from 'moment';

import { 
    RecipeDto, 
    RecipeInfoDto,
    Recipe
} from './Models';

import * as fb from 'firebase';


class Repo {
    private firebase : firebase.app.App;

    constructor() {
        const config = {
            apiKey: "AIzaSyAr4ud3szMrvHDuAXGTZXB7KUVC8HuqmAY",
            authDomain: "familycookbook-fc6f7",
            databaseURL: "https://familycookbook-fc6f7.firebaseio.com/",
            storageBucket: "gs://familycookbook-fc6f7.appspot.com"
        };

        this.firebase = fb.initializeApp(config);
    }

    public getIndex() : firebase.Promise<{[id: string]: RecipeInfoDto}> {
        return this.firebase.database().ref("/recipeInfos").once('value').then(snapshot => {
            const index = snapshot.val() || {};
            return index;
        });
    }

    public createRecipe(recipe: Recipe) {
        // convert to DTOs
        const recipeDto = new RecipeDto(recipe);
        const recipeInfoDto = new RecipeInfoDto(recipe);

        const recipeId = this.firebase.database().ref().child('recipes').push().key;
        const updates: any = {};
        updates[`/recipes/${recipeId}`] = recipeDto;
        updates[`/recipeInfos/${recipeId}`] = recipeInfoDto;

        return this.firebase.database().ref().update(updates).then(resolve => recipeId);
    }

    public updateRecipe(recipeId: string, recipe: Recipe) {
        const recipeDto = new RecipeDto(recipe);
        const recipeInfoDto = new RecipeInfoDto(recipe);
        const updates: any = {};
        updates[`/recipes/${recipeId}`] = recipeDto;
        updates[`/recipeInfos/${recipeId}`] = recipeInfoDto;
        return this.firebase.database().ref().update(updates).then(resolve => recipeId);
    }

    public getRecipe(id: string) : firebase.Promise<Recipe> {
        // todo: move this into a cloud-function
        return this.firebase.database().ref(`/recipeInfos/${id}`).once('value').then(snapshot => {
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
        updates[`/recipeInfos/${id}`] = null;

        return this.firebase.database().ref().update(updates);
    }
}

const repo = new Repo();
export default repo;