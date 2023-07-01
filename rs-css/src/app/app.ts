import { LayoutScreen } from '../components/layout-screen/layoutScreen';
import { Levels } from '../components/levels/levels';
import { Input } from '../components/input/input';
import { CodeScreen } from '../components/code-screen/codeScreen';

export class App {
  private readonly layoutScreen: LayoutScreen = new LayoutScreen();

  private readonly levels: Levels = new Levels();

  private readonly input: Input = new Input(this.levels);

  private readonly codeScreen: CodeScreen = new CodeScreen();

  public init(): void {
    const container = document.querySelector('#container');

    container?.appendChild(this.layoutScreen.createCodeScreenLayout());
    container?.appendChild(this.levels.createLevelsLayout());
    container?.appendChild(this.codeScreen.createCodeScreenLayout());
    container?.appendChild(this.input.createInputLayout());

    this.input.setInputValue();
    this.input.pressInputBtn();

    this.levels.pressPrevAndNextBtn();
  }
}
