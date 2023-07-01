import './levels.css';
import { CodeScreen } from '../code-screen/codeScreen';
import { GAME_LEVELS } from './gameLevels';
import { checkQuerySelector } from '../../utils/checkQuerySelector';

export class Levels {
  private readonly DIV_SELECTOR: string = 'div';

  private readonly LEVELS_SELECTOR: string = 'levels';

  private readonly CODE_SCREEN: CodeScreen = new CodeScreen();

  private prevBtn: HTMLElement = this.createLevelsPrevBtn();

  private nextBtn: HTMLElement = this.createLevelsNextBtn();

  private currentLevel = 0;

  private createLevelsPrevBtn(): HTMLElement {
    const levelNavigationPrev = document.createElement(this.DIV_SELECTOR);
    levelNavigationPrev.classList.add('levels__header-nav-prev');

    return levelNavigationPrev;
  }

  private createLevelsNextBtn(): HTMLElement {
    const levelNavigationNext = document.createElement(this.DIV_SELECTOR);
    levelNavigationNext.classList.add('levels__header-nav-next');

    return levelNavigationNext;
  }

  public getCurrentLevel(): number {
    return this.currentLevel;
  }

  public createLevelsLayout(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const levelsContainer = document.createElement('div');
    levelsContainer.classList.add(this.LEVELS_SELECTOR);

    const levelHeaderLeftSide = document.createElement('div');
    levelHeaderLeftSide.classList.add('levels__left-side');

    const levelsHeader = document.createElement('div');
    levelsHeader.classList.add('levels__header');

    const levelsText = document.createElement('div');
    levelsText.classList.add('levels__header-text');
    levelsText.textContent = `Level ${this.currentLevel + 1} of ${GAME_LEVELS.length}`;

    const levelHeaderRightSide = document.createElement('div');
    levelHeaderRightSide.classList.add('levels__right-side');

    const levelNavigation = document.createElement('div');
    levelNavigation.classList.add('levels__header-nav');

    const levelList = document.createElement('div');
    levelList.classList.add('levels__list');

    const levelListItems = this.generateLevelsList();

    const levelListItemTitle = document.createElement('div');
    levelListItemTitle.classList.add('levels__list-item-title');
    levelListItemTitle.textContent = '#ID';

    levelHeaderLeftSide.append(levelsText);
    levelHeaderRightSide.append(this.prevBtn, this.nextBtn);

    levelsHeader.append(levelHeaderLeftSide, levelHeaderRightSide);

    levelList.appendChild(levelListItems);

    levelsContainer.append(levelsHeader, levelList);

    fragment.appendChild(levelsContainer);

    return fragment;
  }

  private generateLevelsList(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    GAME_LEVELS.forEach((item, index) => {
      const levelListItem = document.createElement(this.DIV_SELECTOR);
      levelListItem.classList.add('levels__list-item');

      const levelsCheckmark = document.createElement(this.DIV_SELECTOR);
      levelsCheckmark.classList.add('levels__header-checkmark');

      const levelListItemNumber = document.createElement(this.DIV_SELECTOR);
      levelListItemNumber.classList.add('levels__list-item-number');
      levelListItemNumber.textContent = item.level;

      const levelListItemTitle = document.createElement(this.DIV_SELECTOR);
      levelListItemTitle.classList.add('levels__list-item-title');
      levelListItemTitle.textContent = item.menuTitle;

      if (index === this.currentLevel) {
        levelListItem.classList.add('current');
      }

      levelListItem.append(levelsCheckmark, levelListItemNumber, levelListItemTitle);

      fragment.appendChild(levelListItem);
    });

    return fragment;
  }

  public pressPrevAndNextBtn(): void {
    this.nextBtn.addEventListener('click', () => {
      this.changeLevel(this.nextBtn);
    });
    this.prevBtn.addEventListener('click', () => {
      this.changeLevel(this.prevBtn);
    });
  }

  private changeCurrentClass(): void {
    const levelListItems: NodeListOf<Element> = document.querySelectorAll('.levels__list-item');

    levelListItems.forEach((item, index) => {
      if (index === this.currentLevel) {
        item.classList.add('current');
      } else item.classList.remove('current');
    });
  }

  private changeLevel(button: HTMLElement): void {
    if (button.classList.contains('levels__header-nav-next') && this.currentLevel < GAME_LEVELS.length - 1) {
      this.currentLevel += 1;
    } else if (button.classList.contains('levels__header-nav-prev') && this.currentLevel > 0) {
      this.currentLevel -= 1;
    }

    this.correctAnswer();
  }

  public correctAnswer(): void {
    const codeScreenBodyText: HTMLElement = checkQuerySelector('.code-screen__body-text');
    const levelNumberText: HTMLElement = checkQuerySelector('.levels__header-text');
    const title: HTMLElement = checkQuerySelector('.layout-screen__title');

    this.changeCurrentClass();

    codeScreenBodyText.innerHTML = '';
    levelNumberText.innerText = `Level ${this.currentLevel + 1} of ${GAME_LEVELS.length}`;
    title.innerText = GAME_LEVELS[this.currentLevel].title;

    const newCodeScreenBodyText = this.CODE_SCREEN.generateCodeScreenBodyText(this.currentLevel);
    codeScreenBodyText.appendChild(newCodeScreenBodyText);
  }
}
