import './codeScreen.css';
import { GAME_LEVELS } from '../levels/gameLevels';

export class CodeScreen {
  private readonly DIV_SELECTOR = 'div';

  private readonly CODE_SCREEN_SELECTOR: string = 'code-screen';

  private readonly CODE_SCREEN_CONTAINER: HTMLElement = this.createCodeScreenContainer();

  private readonly CODE_SCREEN_BODY_TEXT: HTMLElement = this.createCodeScreenBodyText();

  private createCodeScreenContainer(): HTMLElement {
    const codeScreenContainer = document.createElement(this.DIV_SELECTOR);
    codeScreenContainer.classList.add(this.CODE_SCREEN_SELECTOR);

    return codeScreenContainer;
  }

  private createCodeScreenBodyText(): HTMLElement {
    const CodeScreenBodyText: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    CodeScreenBodyText.classList.add('code-screen__body-text');

    return CodeScreenBodyText;
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
    const CodeScreenBodyTextFragment: DocumentFragment = document.createDocumentFragment();

    GAME_LEVELS[index].code.forEach((item) => {
      const element = document.createElement(this.DIV_SELECTOR);
      element.textContent = item.codeText;
      CodeScreenBodyTextFragment.appendChild(element);
    });

    return CodeScreenBodyTextFragment;
  }

  // public changeLevel(): void {}
}
