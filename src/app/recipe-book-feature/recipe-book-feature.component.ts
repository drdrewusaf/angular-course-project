import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-book-feature',
  templateUrl: './recipe-book-feature.component.html',
  styleUrl: './recipe-book-feature.component.css',
  providers: [RecipeService]
})
export class RecipeBookFeatureComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      });
  }

}
