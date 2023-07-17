export class GameLevelStore {
  private currentLevel: number = this.getLocalStorageCurrentLevel();

  private readonly firstLevel: number = 0;

  public addBeforeUnloadListener(): void {
    window.addEventListener('beforeunload', () => {
      this.setLocalStorage();
    });
  }

  public clearStore(): void {
    localStorage.removeItem('currentLevel');
    localStorage.removeItem('completedLevels');
  }

  private getLocalStorageCurrentLevel(): number {
    const currentLevel: string | null = localStorage.getItem('currentLevel');
    if (currentLevel) this.currentLevel = +currentLevel;
    else this.currentLevel = this.firstLevel;
    return this.currentLevel;
  }

  private setLocalStorage(): void {
    localStorage.setItem('currentLevel', `${this.currentLevel}`);

    const checkmarks = document.querySelectorAll('.levels__header-checkmark');
    const comletedLevels: string[] = [];
    checkmarks.forEach((item) => comletedLevels.push(item.className));

    localStorage.setItem('completedLevels', JSON.stringify(comletedLevels));
  }
}
