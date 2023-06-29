import './layoutScreen.css';

export class LayoutScreen {
  private readonly layoutScreenSelector = 'layout-screen';

  public createCodeScreenLayout(): HTMLElement {
    const layoutScreenWrap = document.createElement('div');
    layoutScreenWrap.classList.add(this.layoutScreenSelector);

    return layoutScreenWrap;
  }
}
