import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryUploadedImage } from '@sfr/data-access/cloudinary';
import {
  EditRecipeGQL,
  RecipeEditInput,
  RecipeGQL,
  RecipeQuery,
} from '@sfr/data-access/generated';
import { SfrImageUploaderComponent } from '@sfr/shared/ui/intelligent';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import {
  SfrCloudinaryService,
  SfrTitleService,
} from '@sfr/shared/utils/services';
import { CloudinaryProgressResult } from '@sfr/shared/utils/types';
import { Observable, of, zip } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CreateEditRecipe } from '../../utils';

interface RecipeOrError {
  recipe: RecipeQuery['recipe'];
  error: string;
}

@Component({
  selector: 'sfr-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrEditRecipeComponent implements OnInit {
  recipeOrError$!: Observable<RecipeOrError | null>;
  errorMessage: string | null = null;

  constructor(
    private editRecipeGQL: EditRecipeGQL,
    private route: ActivatedRoute,
    private router: Router,
    private urlReplaceSpace: SfrUrlReplaceSpacePipe,
    private cd: ChangeDetectorRef,
    private recipeGQL: RecipeGQL,
    private readonly dialog: MatDialog,
    private readonly cloudinary: SfrCloudinaryService,
    private readonly titleService: SfrTitleService
  ) {}

  ngOnInit(): void {
    this.recipeOrError$ = this.getRecipeFromRoute$();
  }

  editRecipe(recipeId: number, createEditRecipe: CreateEditRecipe): void {
    this.errorMessage = null;
    const deleteTokens: string[] = [];

    of(createEditRecipe.imageFiles)
      .pipe(
        mergeMap((imageFiles) =>
          !imageFiles.length ? of([]) : this.uploadImages$(imageFiles)
        ),
        mergeMap((imageResults) => {
          if (imageResults!.length) {
            imageResults!.forEach((imageResult) => {
              deleteTokens.push(imageResult.result!.delete_token);
            });
          }
          return this.editRecipeGQL.mutate(
            {
              recipe: this.formatRecipeForMutation(
                recipeId,
                createEditRecipe,
                imageResults!.map((imageResult) => imageResult.result!)
              ),
            },
            { errorPolicy: 'all' }
          );
        })
      )
      .subscribe(
        ({ data, errors }) => {
          if (!errors) {
            this.router.navigate([
              'recipes',
              this.urlReplaceSpace.transform(data?.editRecipe.name!),
            ]);
          } else {
            this.deleteUploadedImage(deleteTokens);
            this.errorMessage = errors[0].extensions?.response.message;
            this.cd.detectChanges();
          }
        },
        () => {
          this.deleteUploadedImage(deleteTokens);
        }
      );
  }

  private uploadImages$(
    imageFiles: File[]
  ): Observable<CloudinaryProgressResult[] | undefined> {
    return this.dialog
      .open<SfrImageUploaderComponent, File[], CloudinaryProgressResult[]>(
        SfrImageUploaderComponent,
        {
          data: imageFiles,
          disableClose: true,
        }
      )
      .afterClosed();
  }

  private deleteUploadedImage(deleteTokens: string[]): void {
    zip(
      ...deleteTokens.map((token) => {
        return this.cloudinary.deleteImageByToken$(token);
      })
    ).subscribe();
  }

  private formatRecipeForMutation(
    id: number,
    recipe: CreateEditRecipe,
    imageData: CloudinaryUploadedImage[]
  ): RecipeEditInput {
    const photos = [
      ...imageData.map((image) => {
        return {
          path: image.secure_url,
          cloudinaryPublicId: image.public_id,
        };
      }),
      ...recipe.currentPhotos.map((photo) => {
        return {
          id: photo.id,
          path: photo.path,
          cloudinaryPublicId: photo.cloudinaryPublicId,
        };
      }),
    ];
    return {
      id,
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      cookTime: recipe.cookTime,
      difficulty: recipe.difficulty,
      photos,
    };
  }

  private getRecipeFromRoute$(): Observable<RecipeOrError | null> {
    return this.route.paramMap.pipe(
      map((paramMap) => {
        return paramMap.get('name') || '';
      }),
      mergeMap((name) => {
        return this.recipeGQL.fetch({ name }, { errorPolicy: 'all' }).pipe(
          map(({ data, errors }) => {
            return {
              recipe: data?.recipe,
              error: errors ? errors[0]?.extensions?.response.message : null,
            };
          })
        );
      }),
      tap((recipeOrError) => {
        if (recipeOrError.recipe) {
          this.titleService.setTabTitle(`Edit ${recipeOrError.recipe.name}`);
        } else {
          this.titleService.setTabTitle('Edit Recipe Not Found');
        }
      })
    );
  }
}
