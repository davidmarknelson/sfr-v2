import { SfrRecipePhotoPipe } from './recipe-photo.pipe';

describe('RecipePhotoPipe', () => {
  const pipe = new SfrRecipePhotoPipe();

  it('should return the provided value if it there is text', () => {
    expect(pipe.transform('photo-path')).toEqual('photo-path');
  });

  it('should return the default recipe photo path if it there is not text', () => {
    expect(pipe.transform(undefined)).toEqual(
      '/assets/images/defaults/default-recipe-pic.jpg'
    );
  });
});
