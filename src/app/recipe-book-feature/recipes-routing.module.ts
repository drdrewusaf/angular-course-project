import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeBookFeatureComponent } from "./recipe-book-feature.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeResolverService } from "./recipes-resolver.service";

const routes: Routes = [
    { 
        path: '', 
        component: RecipeBookFeatureComponent,
        canActivate: [AuthGuard], 
        children: [
            { path:'', 
                component: RecipeStartComponent, 
                resolve: [RecipeResolverService] 
            },
            { path: 'new', 
                component: RecipeEditComponent 
            },
            { path:':id', 
                component: RecipeDetailComponent, 
                resolve: [RecipeResolverService] 
            },
            { path: ':id/edit', 
                component: RecipeEditComponent, 
                resolve: [RecipeResolverService] 
            },
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule {

}