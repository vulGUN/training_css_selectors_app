import './codeScreen.css';
import { GAME_LEVELS, GameLevelType, CodeFragment } from '../levels/gameLevels';
import { checkQuerySelector } from '../../utils/checkQuerySelector';

export class CodeScreen {
  private readonly DIV_SELECTOR = 'div';

  private readonly HIGHLIGHT_SELECTOR = 'highlight';

  private readonly CODE_SCREEN_SELECTOR: string = 'code-screen';

  private CODE_SCREEN_CONTAINER: HTMLElement = this.createCodeScreenContainer();

  private CODE_SCREEN_BODY_TEXT: HTMLElement = this.createCodeScreenBodyText();

  public resetCodeScreen(): void {
    this.CODE_SCREEN_CONTAINER = this.createCodeScreenContainer();
    this.CODE_SCREEN_BODY_TEXT = this.createCodeScreenBodyText();
  }

  private createCodeScreenContainer(): HTMLElement {
    const codeScreenContainer = document.createElement(this.DIV_SELECTOR);
    codeScreenContainer.classList.add(this.CODE_SCREEN_SELECTOR);

    return codeScreenContainer;
  }

  private createCodeScreenBodyText(): HTMLElement {
    const codeScreenBodyText: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    codeScreenBodyText.classList.add('code-screen__body-text');

    return codeScreenBodyText;
  }

  public getcodeScreenContainer(): HTMLElement {
    return this.CODE_SCREEN_CONTAINER;
  }

  public createCodeScreenLayout(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const CodeScreenHeader: HTMLDivElement = document.createElement('div');
    CodeScreenHeader.classList.add('code-screen__header');

    const CodeScreenHeaderLeftTitle: HTMLSpanElement = document.createElement('span');
    CodeScreenHeaderLeftTitle.innerText = 'HTML Viewer';

    const CodeScreenHeaderRightTitle: HTMLSpanElement = document.createElement('span');
    CodeScreenHeaderRightTitle.innerText = 'index.html';

    const CodeScreenBody: HTMLDivElement = document.createElement('div');
    CodeScreenBody.classList.add('code-screen__body');

    CodeScreenHeader.append(CodeScreenHeaderLeftTitle, CodeScreenHeaderRightTitle);
    this.CODE_SCREEN_BODY_TEXT.appendChild(this.generateCodeScreenBodyText());

    CodeScreenBody.append(this.CODE_SCREEN_BODY_TEXT);
    this.CODE_SCREEN_CONTAINER.append(CodeScreenHeader, CodeScreenBody);

    fragment.append(this.CODE_SCREEN_CONTAINER);

    return fragment;
  }

  public generateCodeScreenBodyText(index = 0): DocumentFragment {
    const level: GameLevelType = GAME_LEVELS[index];
    const codeFragment = document.createDocumentFragment();
    let dataIndex = 0;

    function generateCodeRecursively(
      codeElements: CodeFragment[],
      parentElement: HTMLElement | DocumentFragment,
    ): void {
      codeElements.forEach((item) => {
        const element = document.createElement('div');
        element.setAttribute('data-code', `${dataIndex}`);
        dataIndex += 1;
        element.textContent = item.startTag;
        parentElement.appendChild(element);

        if (item.children && item.children.length > 0) {
          generateCodeRecursively(item.children, element);
        }

        element.insertAdjacentText('beforeend', item.endTag);
      });
    }

    generateCodeRecursively(level.code, codeFragment);
    return codeFragment;
  }

  public hoverEffectForCodeElements(): void {
    const codeList = checkQuerySelector('.code-screen__body-text');

    codeList.addEventListener('mouseover', (event: MouseEvent) => {
      const { target } = event;

      if (target && target instanceof HTMLElement && target.firstChild?.textContent !== '<div class="container">') {
        target.classList.add(this.HIGHLIGHT_SELECTOR);
        const dataId: string | null = target.getAttribute('data-code');
        const image: HTMLElement = checkQuerySelector(`[data-code="${dataId}"`);
        image.classList.add('image-hover');
      }
    });

    codeList.addEventListener('mouseout', (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof HTMLElement) {
        target.classList.remove(this.HIGHLIGHT_SELECTOR);
        const dataId: string | null = target.getAttribute('data-code');
        const image: HTMLElement = checkQuerySelector(`[data-code="${dataId}"`);
        image.classList.remove('image-hover');
      }
    });
  }
}
