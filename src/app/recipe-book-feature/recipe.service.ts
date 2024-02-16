import { Injectable } from "@angular/core";

import { Recipe } from "./recipe-list/recipe.model";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list-feature/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Lasagna',
            'Big flat noodles!',
            'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
            [
                new Ingredient('Flat Noodles', 5),
                new Ingredient('Tomato Sauce', 10)
            ]),

        new Recipe('Hamburger',
            'Look at that!',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/1920px-Hamburger_%28black_bg%29.jpg',
            [
                new Ingredient('Beef', 5),
                new Ingredient('Bun', 2)
            ])
    ];

    constructor(private slService: ShoppingListService) {

    }
    getRecipies() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice());
    }
}