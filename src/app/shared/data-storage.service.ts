import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

import { RecipeService } from "../recipe-book-feature/recipe.service";
import { Recipe } from "../recipe-book-feature/recipe-list/recipe.model";


@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(
                'https://angular-course-926a4-default-rtdb.firebaseio.com/recipes.json',
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://angular-course-926a4-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap<Recipe[]>(recipes => {
                    this.recipeService.setRecipes(recipes);
            }));
    }
}