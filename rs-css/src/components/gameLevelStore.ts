export class GameLevelStore {
  private readonly CURRENT_LEVEL_STORE_KEY: string = 'currentLevel';

  private readonly COMPLETED_LEVELS_STORE_KEY: string = 'completedLevels';

  public currentLevel: number;

  public readonly firstLevel = 0;

  constructor() {
    this.currentLevel = this.getCurrentLevel();
    this.addBeforeUnloadListener();
  }

  private addBeforeUnloadListener(): void {
    window.addEventListener('beforeunload', () => {
      this.setLocalStorage();
    });
  }

  public clearStore(): void {
    localStorage.removeItem(this.CURRENT_LEVEL_STORE_KEY);
    localStorage.removeItem(this.COMPLETED_LEVELS_STORE_KEY);
  }

  private getCurrentLevel(): number {
    const currentLevel: string | null = localStorage.getItem(this.CURRENT_LEVEL_STORE_KEY);
    if (currentLevel) this.currentLevel = +currentLevel;
    else this.currentLevel = this.firstLevel;
    return this.currentLevel;
  }

  private setLocalStorage(): void {
    localStorage.setItem(this.CURRENT_LEVEL_STORE_KEY, `${this.currentLevel}`);

    const checkmarks = document.querySelectorAll('.levels__header-checkmark');
    const comletedLevels: string[] = [];
    checkmarks.forEach((item) => comletedLevels.push(item.className));

    localStorage.setItem('completedLevels', JSON.stringify(comletedLevels));
  }
}
