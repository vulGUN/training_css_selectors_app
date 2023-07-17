import './input.css';
import { CodeScreen } from '../code-screen/codeScreen';
import { GAME_LEVELS } from '../levels/gameLevels';
import { Levels } from '../levels/levels';
import { checkQuerySelector } from '../../utils/checkQuerySelector';

export class Input {
  private CODE_SCREEN: CodeScreen = new CodeScreen();

  private readonly COMPLETE_SELECTOR: string = '.completed';

  private readonly LEVELS: Levels;

  private readonly WIN_TITLE: string = "🎉Congratulations, you've won!🎉";

  private readonly TEXT_HELP: string = '/* Styles would go here. */';

  private readonly INPUT_SELECTOR = 'input';

  private readonly DIV_SELECTOR = 'div';

  private inputValue = '';

  private inputContainer: HTMLElement = this.createInputContainer();

  private inputField: HTMLInputElement = this.createInputFieldElement();

  private inputBtn: HTMLElement = this.createInputBtnElement();

  private helpBtn: HTMLElement = this.createHelpBtnElement();

  constructor(levels: Levels) {
    this.LEVELS = levels;
  }

  private readonly handleKeyPress = (event: KeyboardEvent): void => {
    if (event.code === 'Enter') {
      this.addAnimationPressBtn(this.inputBtn);
      this.checkAnswer(this.inputValue);
    }
  };

  private readonly handleClick = (event: Event): void => {
    const { target } = event;

    if (target instanceof HTMLElement && target.className.includes('input__btn')) {
      this.checkAnswer(this.inputValue);
      this.addAnimationPressBtn(this.inputBtn);
    }
  };

  private readonly handleHelpClick = async (event: Event): Promise<void> => {
    const { target } = event;
    const correctAnswer = GAME_LEVELS[this.LEVELS.getCurrentLevel()].answer;
    const valueArr: string[] = correctAnswer.split('');
    this.addAnimationPressBtn(this.helpBtn);

    if (
      target instanceof HTMLElement &&
      target.className.includes('input__help-btn') &&
      this.inputField.value !== correctAnswer
    ) {
      this.inputField.value = '';

      const appendValues = (index: number): Promise<void> =>
        new Promise((resolve) => {
          setTimeout(() => {
            this.inputField.value += valueArr[index];
            this.inputValue = this.inputField.value;
            this.removeInputAnimation(this.inputField.value);

            if (index < valueArr.length - 1) {
              resolve(appendValues(index + 1));
            } else {
              resolve();
            }
          }, 150);
        });
      appendValues(this.inputField.value.length);
    }
  };

  public addAnimationPressBtn(element: HTMLElement): void {
    const animationEndHandler = (): void => {
      element.classList.remove('press-down');
      element.removeEventListener('animationend', animationEndHandler);
    };

    element.classList.add('press-down');
    element.addEventListener('animationend', animationEndHandler);
  }

  public resetInput(): void {
    this.inputContainer = this.createInputContainer();
    this.inputField = this.createInputFieldElement();
    this.inputBtn = this.createInputBtnElement();
    this.removeInputBtnListeners();
  }

  public getInputField(): HTMLElement {
    return this.inputField;
  }

  private createInputContainer(): HTMLElement {
    const inputContainer: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    inputContainer.classList.add('input');

    return inputContainer;
  }

  private createInputFieldElement(): HTMLInputElement {
    const input: HTMLInputElement = document.createElement(this.INPUT_SELECTOR);
    input.classList.add('input__field', 'flicker');
    input.type = 'text';
    input.setAttribute('placeholder', 'Type in a CSS selector');

    return input;
  }

  private createInputBtnElement(): HTMLElement {
    const inputBtn: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    inputBtn.classList.add('input__btn');
    inputBtn.innerText = 'enter';

    return inputBtn;
  }

  private createHelpBtnElement(): HTMLElement {
    const helpBtn: HTMLDivElement = document.createElement(this.DIV_SELECTOR);
    helpBtn.classList.add('input__help-btn');
    helpBtn.innerText = 'help';

    return helpBtn;
  }

  public createInputLayout(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const inputHeader: HTMLDivElement = document.createElement('div');
    inputHeader.classList.add('input__header');

    const inputHeaderLeftTitle: HTMLSpanElement = document.createElement('span');
    inputHeaderLeftTitle.innerText = 'CSS Editor';

    const inputHeaderRightTitle: HTMLSpanElement = document.createElement('span');
    inputHeaderRightTitle.innerText = 'style.css';

    const inputText: HTMLElement = document.createElement('div');
    inputText.classList.add('input__help-text');
    inputText.innerText = this.TEXT_HELP;

    const inputWrapper: HTMLDivElement = document.createElement('div');
    inputWrapper.classList.add('input__wrapper');

    inputWrapper.append(this.inputField, this.inputBtn);
    inputHeader.append(inputHeaderLeftTitle, inputHeaderRightTitle);
    this.inputContainer.append(inputHeader, inputWrapper, inputText, this.helpBtn);

    fragment.appendChild(this.inputContainer);

    return fragment;
  }

  public setInputValue(): void {
    this.inputField.addEventListener('input', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const { value } = event.target;
        this.inputValue = value;

        this.removeInputAnimation(value);
      }
    });
  }

  public getInputValue(): string {
    return this.inputValue;
  }

  private removeInputAnimation(value = ''): void {
    if (value.length > 0) this.inputField.classList.remove('flicker');
    else this.inputField.classList.add('flicker');
  }

  public pressHelpBtn(): void {
    this.helpBtn.addEventListener('click', this.handleHelpClick);
  }

  public pressInputBtn(): void {
    document.addEventListener('keydown', this.handleKeyPress);
    this.inputBtn.addEventListener('click', this.handleClick);
  }

  private removeInputBtnListeners(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
    this.inputBtn.removeEventListener('click', this.handleClick);
    this.helpBtn.removeEventListener('click', this.handleHelpClick);
  }

  private checkAnswer(inputAnswer: string): void {
    const currentAnswer = GAME_LEVELS[this.LEVELS.getCurrentLevel()].answer;
    if (inputAnswer === currentAnswer) {
      this.addFadeAnimation();
    } else {
      this.addJiggleAnimation(this.inputContainer);
    }
  }

  private addFadeAnimation(): void {
    const elements: NodeListOf<Element> = document.querySelectorAll('.scale');
    let animationCount = 0;

    const fadeAnimationEnd = (): void => {
      animationCount += 1;

      if (animationCount === elements.length) {
        elements.forEach((item) => {
          item.classList.remove('fade');
          item.removeEventListener('animationend', fadeAnimationEnd);
        });
        this.nextLevel();
      }
    };

    elements.forEach((item) => {
      item.classList.add('fade');
      item.addEventListener('animationend', fadeAnimationEnd);
    });
  }

  private nextLevel(): void {
    const levelItem: HTMLElement = checkQuerySelector('.levels__list');
    const checkmark: Element = levelItem.children[this.LEVELS.getCurrentLevel()].children[0];
    const nextBtn: HTMLElement = checkQuerySelector('.levels__header-nav-next');
    checkmark.classList.add('completed');
    this.LEVELS.changeLevel(nextBtn);
    this.inputField.value = '';
    this.removeInputAnimation(this.inputField.value);
    this.checkWin();
  }

  private checkWin(): void {
    const completedLevel: NodeListOf<Element> = document.querySelectorAll(this.COMPLETE_SELECTOR);
    const title: HTMLElement = checkQuerySelector('.layout-screen__title');
    if (completedLevel.length === GAME_LEVELS.length) {
      title.innerText = this.WIN_TITLE;
    }
  }

  private addJiggleAnimation(element: HTMLElement): void {
    const codeScreenContainer = this.CODE_SCREEN.getcodeScreenContainer();

    element.classList.add('jiggle');
    codeScreenContainer.classList.add('jiggle');
    checkQuerySelector('.code-screen').classList.add('jiggle');

    element.addEventListener('animationend', () => {
      element.classList.remove('jiggle');
      checkQuerySelector('.code-screen').classList.remove('jiggle');
    });
  }
}
