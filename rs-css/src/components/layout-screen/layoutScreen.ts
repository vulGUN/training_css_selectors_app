import './layoutScreen.css';
import { GAME_LEVELS, CodeFragment } from '../levels/gameLevels';
import { checkQuerySelector } from '../../utils/checkQuerySelector';

export class LayoutScreen {
  private readonly DIV_SELECTOR = 'div';

  private readonly layoutScreenSelector = 'layout-screen';

  private imageWrapper: HTMLElement = this.createImageWrapper();

  public resetLayoutScreen(): void {
    this.imageWrapper = this.createImageWrapper();
  }

  private createImageWrapper(): HTMLElement {
    const imageWrap: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    imageWrap.classList.add('layout-screen__image-wrap');

    return imageWrap;
  }

  public createCodeScreenLayout(currentLevel: number): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const layoutScreenWrap = document.createElement('div');
    layoutScreenWrap.classList.add(this.layoutScreenSelector);

    const layoutScreenTitle = document.createElement('h2');
    layoutScreenTitle.classList.add('layout-screen__title');
    layoutScreenTitle.textContent = GAME_LEVELS[currentLevel].title || GAME_LEVELS[0].title;

    const imageWrap = this.createImage(currentLevel);

    layoutScreenWrap.append(layoutScreenTitle, imageWrap);
    fragment.appendChild(layoutScreenWrap);

    return fragment;
  }

  private createImage(currentLevel: number): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const imageContainer: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    imageContainer.classList.add('layout-screen__image');

    const image: DocumentFragment = this.generateImageElement(currentLevel);

    this.imageWrapper.appendChild(image);
    imageContainer.appendChild(this.imageWrapper);
    fragment.appendChild(imageContainer);

    return fragment;
  }

  public generateImageElement(index = 0): DocumentFragment {
    const level: CodeFragment = GAME_LEVELS[index].code[0];
    const codeFragment: DocumentFragment = document.createDocumentFragment();
    let dataIndex = 0;

    const generateCodeRecursively = (
      codeElements: CodeFragment[],
      parentElement: DocumentFragment | ChildNode,
    ): void => {
      codeElements.forEach((item: CodeFragment): void => {
        const startElement: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
        startElement.innerHTML = item.startTag;
        const element: ChildNode | null = startElement.firstChild;

        if (element instanceof HTMLElement) {
          element.setAttribute('data-code', `${(dataIndex += 1)}`);
          parentElement.appendChild(element);
        }

        if (element && item.children && item.children.length > 0) {
          generateCodeRecursively(item.children, element);
        }
      });
    };

    if (level.children) {
      generateCodeRecursively(level.children, codeFragment);
    }

    return codeFragment;
  }

  public hoverEffectForImages(): void {
    const codeList: HTMLElement = checkQuerySelector('.code-screen__body-text');
    const imageList: HTMLElement = checkQuerySelector('.layout-screen__image-wrap');

    imageList.addEventListener('mouseover', (event: MouseEvent) => {
      const { target } = event;

      if (target && target instanceof HTMLElement && target !== imageList) {
        target.classList.add('image-hover');
        const dataId: string | null = target.getAttribute('data-code');
        const codeElement: HTMLElement = checkQuerySelector(`[data-code="${dataId}"`, codeList);
        codeElement.classList.add('highlight');
      }
    });

    imageList.addEventListener('mouseout', (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof HTMLElement && target !== imageList) {
        target.classList.remove('image-hover');
        const dataId: string | null = target.getAttribute('data-code');
        const codeElement: HTMLElement = checkQuerySelector(`[data-code="${dataId}"`, codeList);
        codeElement.classList.remove('highlight');
      }
    });
  }

  public addImageAnimation(index = 0): void {
    const circles: NodeListOf<SVGCircleElement> = document.querySelectorAll('circle');
    const fancy: Element | null = document.querySelector('#fancy');
    const smallBungs: NodeListOf<Element> = document.querySelectorAll('.small');
    const smallRectangles: NodeListOf<Element> = document.querySelectorAll('rectangle.small');
    const all: NodeListOf<Element> = document.querySelectorAll('.layout-screen__image-wrap *');
    const everyBung: NodeListOf<Element> = document.querySelectorAll('circle + bung.small, circle + bung');
    const nthChild: Element | null = document.querySelector('circle:nth-of-type(3)');
    const even: NodeListOf<Element> = document.querySelectorAll('square:nth-of-type(even)');
    const squareEmpty: NodeListOf<Element> = document.querySelectorAll('square:empty');
    const bigBungs: NodeListOf<Element> = document.querySelectorAll('bung:not(.small)');

    switch (index) {
      case 0:
        circles.forEach((item: SVGCircleElement): void => item.classList.add('scale'));
        break;
      case 1:
        fancy?.classList.add('scale');
        break;
      case 2:
        smallBungs.forEach((item: Element): void => item.classList.add('scale'));
        break;
      case 3:
        smallRectangles.forEach((item: Element): void => item.classList.add('scale'));
        break;
      case 4:
        all.forEach((item: Element): void => item.classList.add('scale'));
        break;
      case 5:
        everyBung.forEach((item: Element): void => item.classList.add('scale'));
        break;
      case 6:
        nthChild?.classList.add('scale');
        break;
      case 7:
        even.forEach((item: Element): void => item.classList.add('scale'));
        break;
      case 8:
        squareEmpty.forEach((item: Element): void => item.classList.add('scale'));
        break;
      case 9:
        bigBungs.forEach((item: Element): void => item.classList.add('scale'));
        break;
      default:
        console.log('Nothing');
    }
  }
}
