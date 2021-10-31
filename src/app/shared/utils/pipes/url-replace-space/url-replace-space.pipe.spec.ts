import { SfrUrlReplaceSpacePipe } from './url-replace-space.pipe';

describe('SfrUrlReplaceSpacePipe', () => {
  const pipe = new SfrUrlReplaceSpacePipe();
  it('should replace the spaces in a recipe name with dashes', () => {
    expect(pipe.transform('Example recipe name')).toEqual(
      'Example-recipe-name'
    );
  });
});
