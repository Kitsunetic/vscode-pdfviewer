export interface DebounceScheduler<Timer> {
  schedule(callback: () => void, delayMs: number): Timer;
  cancel(timer: Timer): void;
}

export class ReloadDebouncer<Timer> {
  private pendingTimer: Timer | undefined;

  constructor(
    private readonly action: () => void,
    private readonly delayMs: number,
    private readonly scheduler: DebounceScheduler<Timer>
  ) {}

  public request(): void {
    this.cancelPendingTimer();

    const timer = this.scheduler.schedule(() => {
      if (this.pendingTimer !== timer) {
        return;
      }
      this.pendingTimer = undefined;
      this.action();
    }, this.delayMs);
    this.pendingTimer = timer;
  }

  public dispose(): void {
    this.cancelPendingTimer();
  }

  private cancelPendingTimer(): void {
    if (this.pendingTimer !== undefined) {
      this.scheduler.cancel(this.pendingTimer);
      this.pendingTimer = undefined;
    }
  }
}
