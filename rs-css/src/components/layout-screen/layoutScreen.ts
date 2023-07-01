import './layoutScreen.css';
import { GAME_LEVELS } from '../levels/gameLevels';
import { CodeScreen } from '../code-screen/codeScreen';
import { Levels } from '../levels/levels';

export class LayoutScreen {
  private readonly CODE_SCREEN: CodeScreen = new CodeScreen();

  private readonly DIV_SELECTOR = 'div';

  private readonly LEVELS: Levels = new Levels();

  private readonly layoutScreenSelector = 'layout-screen';

  private readonly GAME_LEVELS_ARR = GAME_LEVELS;

  public createCodeScreenLayout(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const layoutScreenWrap = document.createElement('div');
    layoutScreenWrap.classList.add(this.layoutScreenSelector);

    const layoutScreenTitle = document.createElement('h2');
    layoutScreenTitle.classList.add('layout-screen__title');
    layoutScreenTitle.textContent = this.GAME_LEVELS_ARR[this.LEVELS.getCurrentLevel()].title;

    const imageWrap = this.createImage();

    layoutScreenWrap.append(layoutScreenTitle, imageWrap);
    fragment.appendChild(layoutScreenWrap);

    return fragment;
  }

  private createImage(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const image: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    image.classList.add('layout-screen__image');

    const imageWrap: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    imageWrap.classList.add('layout-screen__image-wrap');

    image.appendChild(imageWrap);
    fragment.appendChild(image);

    return fragment;
  }
}
