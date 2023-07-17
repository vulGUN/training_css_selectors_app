import { LayoutScreen } from '../components/layout-screen/layoutScreen';
import { Levels } from '../components/levels/levels';
import { Input } from '../components/input/input';
import { CodeScreen } from '../components/code-screen/codeScreen';
import { checkQuerySelector } from '../utils/checkQuerySelector';
import { GameLevelStore } from '../components/gameLevelStore';

export class App {
  private readonly gameLevelStore: GameLevelStore = new GameLevelStore();

  private readonly layoutScreen: LayoutScreen = new LayoutScreen();

  private readonly levels: Levels = new Levels(this.gameLevelStore);

  private readonly input: Input = new Input(this.levels);

  private readonly codeScreen: CodeScreen = new CodeScreen();

  public init(): void {
    const container: Element = checkQuerySelector('#container');
    const currentLevel: number = this.gameLevelStore.getLocalStorageCurrentLevel();

    container.appendChild(this.layoutScreen.createCodeScreenLayout(currentLevel));
    container.appendChild(this.levels.createLevelsLayout());
    container.appendChild(this.codeScreen.createCodeScreenLayout(currentLevel));
    container.appendChild(this.input.createInputLayout());

    this.input.setInputValue();
    this.input.pressInputBtn();
    this.input.pressHelpBtn();

    this.levels.pressPrevAndNextBtn();
    this.levels.chooseLevel();
    this.gameLevelStore.addBeforeUnloadListener();

    this.codeScreen.hoverEffectForCodeElements();

    this.layoutScreen.hoverEffectForImages();
    this.layoutScreen.addImageAnimation(currentLevel);
  }

  public resetProgress(): void {
    this.levels.LEVELS_RESET.addEventListener('click', () => {
      this.input.addAnimationPressBtn(this.levels.LEVELS_RESET);
      const container: HTMLElement = checkQuerySelector('#container');
      container.innerHTML = '';

      this.gameLevelStore.clearStore();
      this.levels.resetLevels();
      this.input.resetInput();
      this.codeScreen.resetCodeScreen();
      this.layoutScreen.resetLayoutScreen();
      this.init();
    });
  }
}
