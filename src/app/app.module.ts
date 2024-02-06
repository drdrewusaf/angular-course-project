import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeListComponent } from './recipe-book-feature/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-book-feature/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-book-feature/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list-feature/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-feature/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeBookFeatureComponent } from './recipe-book-feature/recipe-book-feature.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list-feature/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeBookFeatureComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
