import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeBookFeatureComponent } from './recipe-book-feature.component';

describe('RecipeBookFeatureComponent', () => {
  let component: RecipeBookFeatureComponent;
  let fixture: ComponentFixture<RecipeBookFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeBookFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeBookFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
