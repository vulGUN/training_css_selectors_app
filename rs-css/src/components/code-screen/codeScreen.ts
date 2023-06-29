import './codeScreen.css';

export class CodeScreen {
  private readonly codeScreen = 'code-screen';

  public start(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const codeScreenContainer = document.createElement('div');
    codeScreenContainer.classList.add(this.codeScreen);

    const CodeScreenHeader: HTMLDivElement = document.createElement('div');
    CodeScreenHeader.classList.add('code-screen__header');

    const CodeScreenHeaderLeftTitle: HTMLSpanElement = document.createElement('span');
    CodeScreenHeaderLeftTitle.innerText = 'HTML Viewer';

    const CodeScreenHeaderRightTitle: HTMLSpanElement = document.createElement('span');
    CodeScreenHeaderRightTitle.innerText = 'index.html';

    CodeScreenHeader.append(CodeScreenHeaderLeftTitle, CodeScreenHeaderRightTitle);
    codeScreenContainer.append(CodeScreenHeader);

    fragment.append(codeScreenContainer);

    return fragment;
  }
}
