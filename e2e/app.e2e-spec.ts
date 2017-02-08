import { AutoCompletePage } from './app.po';

describe('auto-complete App', function() {
  let page: AutoCompletePage;

  beforeEach(() => {
    page = new AutoCompletePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
