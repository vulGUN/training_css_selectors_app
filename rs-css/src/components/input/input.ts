import './input.css';
import { CodeScreen } from '../code-screen/codeScreen';
import { GAME_LEVELS } from '../levels/gameLevels';
import { Levels } from '../levels/levels';
import { checkQuerySelector } from '../../utils/checkQuerySelector';

// interface Iinput {
//   CODE_SCREEN: CodeScreen,
//   COMPLETE_SELECTOR: string,
//   LEVELS: Levels,
//   INPUT_SELECTOR: string,
//   DIV_SELECTOR: string,
//   inputValue: string,
//   inputContainer: HTMLElement,
//   inputField: HTMLElement,
//   inputBtn: HTMLElement,
// }

export class Input {
  private readonly CODE_SCREEN: CodeScreen = new CodeScreen();

  private readonly COMPLETE_SELECTOR = '.completed';

  private readonly LEVELS: Levels;

  private readonly INPUT_SELECTOR = 'input';

  private readonly DIV_SELECTOR = 'div';

  private inputValue = '';

  // !поменять inputContainer на общий селектор / создать его

  private inputContainer: HTMLElement = this.createInputContainer();

  private inputField: HTMLInputElement = this.createInputFieldElement();

  private inputBtn: HTMLElement = this.createInputBtnElement();

  constructor(levels: Levels) {
    this.LEVELS = levels;
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
    inputText.innerText = '/* Styles would go here. */';

    const inputWrapper: HTMLDivElement = document.createElement('div');
    inputWrapper.classList.add('input__wrapper');

    inputWrapper.append(this.inputField, this.inputBtn);
    inputHeader.append(inputHeaderLeftTitle, inputHeaderRightTitle);
    this.inputContainer.append(inputHeader, inputWrapper, inputText);

    fragment.appendChild(this.inputContainer);

    return fragment;
  }

  public setInputValue(): void {
    this.inputField.addEventListener('input', (event: Event) => {
      // ?разобраться как работает <HTMLInputElement>event.target;

      const { value } = <HTMLInputElement>event.target;
      this.inputValue = value;

      this.removeInputAnimation(value);
    });
  }

  public getInputValue(): string {
    return this.inputValue;
  }

  private removeInputAnimation(value = ''): void {
    if (value.length > 0) this.inputField.classList.remove('flicker');
    else this.inputField.classList.add('flicker');
  }

  public pressInputBtn(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
        this.inputBtn.classList.add('press-down');
        this.inputBtn.addEventListener('animationend', () => {
          this.inputBtn.classList.remove('press-down');
        });
        this.checkAnswer(this.inputValue);
      }
    });

    this.inputBtn.addEventListener('click', (event: Event) => {
      // !исправить строку: const target = event.target as HTMLElement;

      const target = event.target as HTMLElement;

      if (target.className.includes('input__btn')) {
        this.inputBtn.classList.add('press-down');
        this.inputBtn.addEventListener('animationend', () => {
          this.inputBtn.classList.remove('press-down');
        });
        this.checkAnswer(this.inputValue);
      }
    });
  }

  private checkAnswer(value: string): void {
    if (value === GAME_LEVELS[this.LEVELS.getCurrentLevel()].answer) {
      const levelItem = checkQuerySelector('.levels__list');
      const checkmark = levelItem.children[this.LEVELS.getCurrentLevel()].children[0];
      const nextBtn = checkQuerySelector('.levels__header-nav-next');
      checkmark.classList.add('completed');
      this.LEVELS.changeLevel(nextBtn);
      this.inputField.value = '';
      this.removeInputAnimation(this.inputField.value);
      this.checkWin();
    } else {
      this.addJiggleAnimation(this.inputContainer);
    }
  }

  private checkWin(): void {
    const completedLevel: NodeListOf<Element> = document.querySelectorAll(this.COMPLETE_SELECTOR);
    const title: HTMLElement = checkQuerySelector('.layout-screen__title');
    if (completedLevel.length === GAME_LEVELS.length) {
      title.innerText = "🎉Congratulations, you've won!🎉";
    }
  }

  private addJiggleAnimation(element: HTMLElement): void {
    const codeScreenContainer = this.CODE_SCREEN.getcodeScreenContainer();

    element.classList.add('jiggle');
    codeScreenContainer.classList.add('jiggle');
    document.querySelector('.code-screen')?.classList.add('jiggle');

    // !не применяются стили к codeScreenContainer, в консоли все ок.

    element.addEventListener('animationend', () => {
      element.classList.remove('jiggle');
      document.querySelector('.code-screen')?.classList.remove('jiggle');
    });
  }
}
