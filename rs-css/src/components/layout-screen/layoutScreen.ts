import './layoutScreen.css';
import { GAME_LEVELS, CodeFragment } from '../levels/gameLevels';
import { CodeScreen } from '../code-screen/codeScreen';

export class LayoutScreen {
  private readonly CODE_SCREEN: CodeScreen = new CodeScreen();

  private readonly DIV_SELECTOR = 'div';

  private readonly layoutScreenSelector = 'layout-screen';

  private imageWrapper = this.createImageWrapper();

  private createImageWrapper(): HTMLElement {
    const imageWrap: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    imageWrap.classList.add('layout-screen__image-wrap');

    return imageWrap;
  }

  public createCodeScreenLayout(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const layoutScreenWrap = document.createElement('div');
    layoutScreenWrap.classList.add(this.layoutScreenSelector);

    const layoutScreenTitle = document.createElement('h2');
    layoutScreenTitle.classList.add('layout-screen__title');
    layoutScreenTitle.textContent = 'Select the circles';

    const imageWrap = this.createImage();

    layoutScreenWrap.append(layoutScreenTitle, imageWrap);
    fragment.appendChild(layoutScreenWrap);

    return fragment;
  }

  private createImage(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const imageContainer: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    imageContainer.classList.add('layout-screen__image');

    const image = this.generateImageElement();

    this.imageWrapper.appendChild(image);
    imageContainer.appendChild(this.imageWrapper);
    fragment.appendChild(imageContainer);

    return fragment;
  }

  public generateImageElement(index = 0): DocumentFragment {
    const level = GAME_LEVELS[index].code[0];
    const codeFragment = document.createDocumentFragment();

    const generateCodeRecursively = (
      codeElements: CodeFragment[],
      parentElement: DocumentFragment | ChildNode,
    ): void => {
      codeElements.forEach((item: CodeFragment): void => {
        const startElement = document.createElement(this.DIV_SELECTOR);
        startElement.innerHTML = item.startTag;
        const element = startElement.firstChild;

        if (!element) throw Error('Element is null');

        parentElement.appendChild(element);

        if (item.children && item.children.length > 0) {
          generateCodeRecursively(item.children, element);
        }
      });
    };

    if (!level.children) throw Error('Level.children is null');

    generateCodeRecursively(level.children, codeFragment);
    return codeFragment;
  }
}
