import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeBookFeatureComponent } from "./recipe-book-feature/recipe-book-feature.component";
import { ShoppingListComponent } from "./shopping-list-feature/shopping-list/shopping-list.component";
import { AppComponent } from "./app.component";
import { RecipeStartComponent } from "./recipe-book-feature/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-book-feature/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book-feature/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-book-feature/recipes-resolver.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeBookFeatureComponent, children: [
        { path:'', component: RecipeStartComponent, resolve: [RecipeResolverService] },
        { path: 'new', component: RecipeEditComponent },
        { path:':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
    ] },
    { path: 'shopping-list', component: ShoppingListComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}