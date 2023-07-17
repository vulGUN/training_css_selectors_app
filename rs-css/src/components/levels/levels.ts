import './levels.css';
import { CodeScreen } from '../code-screen/codeScreen';
import { GAME_LEVELS } from './gameLevels';
import { checkQuerySelector } from '../../utils/checkQuerySelector';
import { LayoutScreen } from '../layout-screen/layoutScreen';
import { GameLevelStore } from '../gameLevelStore';

export class Levels {
  private readonly DIV_SELECTOR: string = 'div';

  private readonly LEVELS_SELECTOR: string = 'levels';

  private readonly CODE_SCREEN: CodeScreen = new CodeScreen();

  private readonly layoutScreen: LayoutScreen = new LayoutScreen();

  private readonly GAME_LEVEL_STORE: GameLevelStore;

  private prevBtn: HTMLElement = this.createLevelsPrevBtn();

  private nextBtn: HTMLElement = this.createLevelsNextBtn();

  private LEVELS_LIST: HTMLElement = this.createLevelList();

  public LEVELS_RESET: HTMLElement = this.createLevelsResetBtn();

  constructor(gameLevelStore: GameLevelStore) {
    this.GAME_LEVEL_STORE = gameLevelStore;
    this.pressPrevAndNextBtn();
  }

  public resetLevels(): void {
    this.GAME_LEVEL_STORE.currentLevel = this.GAME_LEVEL_STORE.firstLevel;
    this.LEVELS_LIST = this.createLevelList();
  }

  private createLevelsResetBtn(): HTMLElement {
    const levelResetBtn: HTMLElement = document.createElement(this.DIV_SELECTOR);
    levelResetBtn.classList.add('levels__reset-btn');
    levelResetBtn.innerText = 'Reset progress';

    return levelResetBtn;
  }

  private createLevelsPrevBtn(): HTMLElement {
    const levelNavigationPrev: HTMLElement = document.createElement(this.DIV_SELECTOR);
    levelNavigationPrev.classList.add('levels__header-nav-prev');

    return levelNavigationPrev;
  }

  private createLevelsNextBtn(): HTMLElement {
    const levelNavigationNext: HTMLElement = document.createElement(this.DIV_SELECTOR);
    levelNavigationNext.classList.add('levels__header-nav-next');

    return levelNavigationNext;
  }

  public getCurrentLevel(): number {
    return this.GAME_LEVEL_STORE.currentLevel;
  }

  private createLevelList(): HTMLElement {
    const levelsList: HTMLElement = document.createElement(this.DIV_SELECTOR);
    levelsList.classList.add('levels__list');

    return levelsList;
  }

  public createLevelsLayout(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const levelsContainer: HTMLElement = document.createElement('div');
    levelsContainer.classList.add(this.LEVELS_SELECTOR);

    const levelHeaderLeftSide: HTMLElement = document.createElement('div');
    levelHeaderLeftSide.classList.add('levels__left-side');

    const levelsHeader: HTMLElement = document.createElement('div');
    levelsHeader.classList.add('levels__header');

    const levelsText: HTMLElement = document.createElement('div');
    levelsText.classList.add('levels__header-text');
    levelsText.textContent = `Level ${this.GAME_LEVEL_STORE.currentLevel + 1} of ${GAME_LEVELS.length}`;

    const levelHeaderRightSide: HTMLElement = document.createElement('div');
    levelHeaderRightSide.classList.add('levels__right-side');

    const levelNavigation: HTMLElement = document.createElement('div');
    levelNavigation.classList.add('levels__header-nav');

    const levelListItems: DocumentFragment = this.generateLevelsList();

    levelHeaderLeftSide.append(levelsText);
    levelHeaderRightSide.append(this.prevBtn, this.nextBtn);

    levelsHeader.append(levelHeaderLeftSide, levelHeaderRightSide);

    this.LEVELS_LIST.appendChild(levelListItems);

    levelsContainer.append(levelsHeader, this.LEVELS_LIST, this.LEVELS_RESET);

    fragment.appendChild(levelsContainer);

    return fragment;
  }

  private generateLevelsList(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const levelsSelectors: string | null = localStorage.getItem('completedLevels');

    GAME_LEVELS.forEach((item, index) => {
      const levelListItem: HTMLElement = document.createElement(this.DIV_SELECTOR);
      levelListItem.classList.add('levels__list-item');

      const levelsCheckmark: HTMLElement = document.createElement(this.DIV_SELECTOR);

      if (levelsSelectors && levelsSelectors !== '[]') {
        const comletedLevels: string[] = JSON.parse(levelsSelectors);
        comletedLevels[index].split(' ').forEach((selector: string) => levelsCheckmark.classList.add(selector));
      } else levelsCheckmark.classList.add('levels__header-checkmark');

      const levelListItemNumber: HTMLElement = document.createElement(this.DIV_SELECTOR);
      levelListItemNumber.classList.add('levels__list-item-number');
      levelListItemNumber.textContent = item.level;

      const levelListItemTitle: HTMLElement = document.createElement(this.DIV_SELECTOR);
      levelListItemTitle.classList.add('levels__list-item-title');
      levelListItemTitle.textContent = item.menuTitle;

      if (index === this.GAME_LEVEL_STORE.currentLevel) {
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

  public chooseLevel(): void {
    this.LEVELS_LIST.addEventListener('click', (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof HTMLElement) {
        const clickedItem = target.closest('.levels__list-item');
        if (clickedItem) {
          const itemList = Array.from(this.LEVELS_LIST.querySelectorAll('.levels__list-item'));
          const itemIndex = itemList.indexOf(clickedItem);

          if (this.GAME_LEVEL_STORE.currentLevel !== itemIndex) {
            this.GAME_LEVEL_STORE.currentLevel = itemIndex;
            this.nextOrPrevLevel();
          }
        }
      }
    });
  }

  private changeCurrentClass(): void {
    const levelListItems: NodeListOf<Element> = document.querySelectorAll('.levels__list-item');

    levelListItems.forEach((item, index) => {
      if (index === this.GAME_LEVEL_STORE.currentLevel) {
        item.classList.add('current');
      } else item.classList.remove('current');
    });
  }

  public changeLevel(button: HTMLElement): void {
    if (
      button.classList.contains('levels__header-nav-next') &&
      this.GAME_LEVEL_STORE.currentLevel < GAME_LEVELS.length - 1
    ) {
      this.GAME_LEVEL_STORE.currentLevel += 1;
    } else if (button.classList.contains('levels__header-nav-prev') && this.GAME_LEVEL_STORE.currentLevel > 0) {
      this.GAME_LEVEL_STORE.currentLevel -= 1;
    }

    this.nextOrPrevLevel();
  }

  private nextOrPrevLevel(): void {
    const codeScreenBodyText: HTMLElement = checkQuerySelector('.code-screen__body-text');
    const layoutImageWrapper: HTMLElement = checkQuerySelector('.layout-screen__image-wrap');
    const levelNumberText: HTMLElement = checkQuerySelector('.levels__header-text');
    const title: HTMLElement = checkQuerySelector('.layout-screen__title');

    this.changeCurrentClass();

    codeScreenBodyText.innerHTML = '';
    layoutImageWrapper.innerHTML = '';
    levelNumberText.innerText = `Level ${this.GAME_LEVEL_STORE.currentLevel + 1} of ${GAME_LEVELS.length}`;
    title.innerText = GAME_LEVELS[this.GAME_LEVEL_STORE.currentLevel].title;

    const newCodeScreenBodyText = this.CODE_SCREEN.generateCodeScreenBodyText(this.GAME_LEVEL_STORE.currentLevel);
    const newImage = this.layoutScreen.generateImageElement(this.GAME_LEVEL_STORE.currentLevel);

    layoutImageWrapper.appendChild(newImage);
    codeScreenBodyText.appendChild(newCodeScreenBodyText);

    this.layoutScreen.addImageAnimation(this.GAME_LEVEL_STORE.currentLevel);
  }
}
