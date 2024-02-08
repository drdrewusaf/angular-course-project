import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeBookFeatureComponent } from "./recipe-book-feature/recipe-book-feature.component";
import { ShoppingListComponent } from "./shopping-list-feature/shopping-list/shopping-list.component";
import { AppComponent } from "./app.component";
import { RecipeStartComponent } from "./recipe-book-feature/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-book-feature/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book-feature/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeBookFeatureComponent, children: [
        { path:'', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path:':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent },
    ] },
    { path: 'shopping-list', component: ShoppingListComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}