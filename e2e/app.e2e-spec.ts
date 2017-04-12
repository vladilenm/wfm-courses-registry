import { WfmCoursesPage } from './app.po';

describe('wfm-courses App', () => {
  let page: WfmCoursesPage;

  beforeEach(() => {
    page = new WfmCoursesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
