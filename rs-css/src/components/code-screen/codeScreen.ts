import './codeScreen.css';
import { GAME_LEVELS, GameLevelType, CodeFragment } from '../levels/gameLevels';
import { checkQuerySelector } from '../../utils/checkQuerySelector';

export class CodeScreen {
  private readonly DIV_SELECTOR = 'div';

  private readonly HIGHLIGHT_SELECTOR = 'highlight';

  private readonly CODE_SCREEN_SELECTOR: string = 'code-screen';

  private readonly CODE_SCREEN_CONTAINER: HTMLElement = this.createCodeScreenContainer();

  private readonly CODE_SCREEN_BODY_TEXT: HTMLElement = this.createCodeScreenBodyText();

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

    function generateCodeRecursively(
      codeElements: CodeFragment[],
      parentElement: HTMLElement | DocumentFragment,
    ): void {
      codeElements.forEach((item) => {
        const element = document.createElement('div');
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
    console.log(this);
  }

  public hoverEffectForCodeElements(): void {
    const codeList = checkQuerySelector('.code-screen__body-text');

    codeList.addEventListener('mouseover', (event: MouseEvent) => {
      const { target } = event;

      if (!target) throw new Error('Target element not found.');

      if (target && (target as HTMLElement).firstChild?.textContent !== '<div class="container">') {
        (target as HTMLElement).classList.add(this.HIGHLIGHT_SELECTOR);
      }
    });

    codeList.addEventListener('mouseout', (event: MouseEvent) => {
      const { target } = event;

      if (!target) throw new Error('Target element not found.');

      (target as HTMLElement).classList.remove(this.HIGHLIGHT_SELECTOR);
    });
  }
}
