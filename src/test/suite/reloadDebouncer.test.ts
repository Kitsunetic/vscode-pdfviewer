import * as assert from 'assert';
import { DebounceScheduler, ReloadDebouncer } from '../../reloadDebouncer';

type Timer = {
  readonly callback: () => void;
  cancelled: boolean;
};

suite('ReloadDebouncer', () => {
  test('Given repeated changes when the quiet period ends then reloads once', () => {
    const timers: Timer[] = [];
    const scheduler: DebounceScheduler<Timer> = {
      schedule(callback: () => void): Timer {
        const timer: Timer = { callback, cancelled: false };
        timers.push(timer);
        return timer;
      },
      cancel(timer: Timer): void {
        timer.cancelled = true;
      },
    };
    let reloadCount = 0;
    const debouncer = new ReloadDebouncer(
      () => {
        reloadCount += 1;
      },
      300,
      scheduler
    );

    debouncer.request();
    debouncer.request();

    assert.strictEqual(timers.length, 2);
    assert.strictEqual(timers[0].cancelled, true);
    timers[1].callback();
    assert.strictEqual(reloadCount, 1);
  });
});
