import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  apiRecipeConstants,
  apiRecipeMessageConstants,
} from '@sfr/data-access/constants';
import {
  CreateRecipeGQL,
  RecipeGQL,
  RecipeQuery,
} from '@sfr/data-access/generated';
import { regexConstants } from '@sfr/shared/utils/constants';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { iif, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'sfr-create-edit-recipe',
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrCreateEditRecipeComponent implements OnInit {
  form!: FormGroup;
  recipeMessageConstants = apiRecipeMessageConstants;
  errorMessage: string = '';
  loading = false;
  title!: string;
  private mutationTypeIsCreate = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private createRecipeGQL: CreateRecipeGQL,
    private urlReplaceSpace: SfrUrlReplaceSpacePipe,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private recipeGQL: RecipeGQL
  ) {}

  ngOnInit(): void {
    this.getTitle();
    this.buildFormFromRoute();
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }
  get cookTime(): FormControl {
    return this.form.get('cookTime') as FormControl;
  }
  get difficulty(): FormControl {
    return this.form.get('difficulty') as FormControl;
  }
  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }
  get instructions(): FormArray {
    return this.form.get('instructions') as FormArray;
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  addIngredient(index: number): void {
    this.ingredients.insert(index + 1, this.fb.control(''));
  }

  removeInstruction(index: number): void {
    this.instructions.removeAt(index);
  }

  addInstruction(index: number): void {
    this.instructions.insert(index + 1, this.fb.control(''));
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    if (this.mutationTypeIsCreate) {
      this.createRecipeGQL
        .mutate(
          {
            recipe: {
              ...this.form.value,
              cookTime: +this.cookTime.value,
              photos: [],
            },
          },
          { errorPolicy: 'all' }
        )
        .subscribe(({ data, errors }) => {
          if (!errors) {
            this.router.navigate([
              'recipes',
              this.urlReplaceSpace.transform(data?.createRecipe.name!),
            ]);
          } else {
            this.errorMessage = errors[0].extensions?.response.message;
            this.cd.detectChanges();
          }
        });
    } else {
    }
  }

  private createForm(recipe?: RecipeQuery['recipe']): FormGroup {
    return this.fb.group({
      name: [
        recipe?.name || '',
        [
          Validators.required,
          Validators.maxLength(apiRecipeConstants.nameMaxLength),
        ],
      ],
      description: [
        recipe?.description || '',
        [
          Validators.required,
          Validators.maxLength(apiRecipeConstants.descriptionMaxLength),
        ],
      ],
      cookTime: [
        recipe?.cookTime || '',
        [Validators.required, Validators.pattern(regexConstants.numbersOnly)],
      ],
      difficulty: [recipe?.difficulty || null, Validators.required],
      ingredients: this.fb.array(
        recipe?.ingredients || [''],
        Validators.required
      ),
      instructions: this.fb.array(
        recipe?.instructions || [''],
        Validators.required
      ),
    });
  }

  private buildFormFromRoute(): void {
    this.route.paramMap
      .pipe(
        take(1),
        map((paramMap) => paramMap.get('name') || ''),
        switchMap((name) => {
          if (name) {
            this.loading = true;
          }
          return iif(
            () => !name,
            of(null),
            this.recipeGQL.fetch({ name }).pipe(
              map(({ data }) => {
                return data.recipe;
              })
            )
          );
        })
      )
      .subscribe((recipe) => {
        this.loading = false;
        if (recipe) {
          this.form = this.createForm(recipe);
        } else {
          this.mutationTypeIsCreate = true;
          this.form = this.createForm();
        }
        this.cd.detectChanges();
      });
  }

  private getTitle(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.title = data.title;
    });
  }
}
