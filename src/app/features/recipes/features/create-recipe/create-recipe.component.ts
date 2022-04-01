import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CloudinaryUploadedImage } from '@sfr/data-access/cloudinary';
import { CreateRecipeGQL, RecipeInput } from '@sfr/data-access/generated';
import { SfrImageUploaderComponent } from '@sfr/shared/ui/intelligent';
import { SfrUrlReplaceSpacePipe } from '@sfr/shared/utils/pipes';
import { SfrCloudinaryService } from '@sfr/shared/utils/services';
import { CloudinaryProgressResult } from '@sfr/shared/utils/types';
import { Observable, of, zip } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CreateEditRecipe } from '../../utils';

@Component({
  selector: 'sfr-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrCreateRecipeComponent {
  errorMessage: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly createRecipeGQL: CreateRecipeGQL,
    private readonly urlReplaceSpace: SfrUrlReplaceSpacePipe,
    private readonly cd: ChangeDetectorRef,
    private readonly dialog: MatDialog,
    private readonly cloudinary: SfrCloudinaryService,
    private readonly snackBar: MatSnackBar
  ) {}

  createRecipe(createEditRecipe: CreateEditRecipe): void {
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
          return this.createRecipeGQL.mutate(
            {
              recipe: this.formatRecipeForMutation(
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
              this.urlReplaceSpace.transform(data?.createRecipe.name!),
            ]);
            this.snackBar.open('Recipe successfully created');
          } else {
            this.deleteUploadedImage(deleteTokens);
            this.errorMessage =
              errors[0].extensions?.response.message || errors[0].message;
            this.cd.detectChanges();
          }
        },
        () => {
          this.deleteUploadedImage(deleteTokens);
        }
      );
  }

  private deleteUploadedImage(deleteTokens: string[]): void {
    zip(
      ...deleteTokens.map((token) => {
        return this.cloudinary.deleteImageByToken$(token);
      })
    ).subscribe();
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

  private formatRecipeForMutation(
    recipe: CreateEditRecipe,
    imageData: CloudinaryUploadedImage[]
  ): RecipeInput {
    return {
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      cookTime: recipe.cookTime,
      difficulty: recipe.difficulty,
      photos: imageData.map((image) => {
        return {
          path: image.secure_url,
          cloudinaryPublicId: image.public_id,
        };
      }),
    };
  }
}
