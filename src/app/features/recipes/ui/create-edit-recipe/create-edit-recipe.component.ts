import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  apiRecipeConstants,
  apiRecipeMessageConstants,
} from '@sfr/data-access/constants';
import { RecipeQuery } from '@sfr/data-access/generated';
import { regexConstants } from '@sfr/shared/utils/constants';
import { CreateEditRecipe } from '../../utils';

@Component({
  selector: 'sfr-create-edit-recipe',
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrCreateEditRecipeComponent implements OnInit {
  @Input() recipe?: RecipeQuery['recipe'];
  @Output() saveValue: EventEmitter<CreateEditRecipe> =
    new EventEmitter<CreateEditRecipe>();
  form!: FormGroup;
  recipeMessageConstants = apiRecipeMessageConstants;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm(this.recipe);
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
  get imageFiles(): FormControl {
    return this.form.get('imageFiles') as FormControl;
  }
  get currentPhotos(): FormControl {
    return this.form.get('currentPhotos') as FormControl;
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

    this.saveValue.emit({
      ...this.form.value,
      cookTime: +this.cookTime.value,
    });
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
      imageFiles: [[], [Validators.maxLength(3)]],
      currentPhotos: [recipe?.photos || [], [Validators.maxLength(3)]],
    });
  }
}
