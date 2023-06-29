import './levels.css';

export class Levels {
  private readonly levelsSelector = 'levels';

  public start(): HTMLElement {
    const levels = document.createElement('div');
    levels.classList.add(this.levelsSelector);

    return levels;
  }
}
