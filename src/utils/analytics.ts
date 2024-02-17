type AnalyticsArgs = {
  retention?: number;
};

type TrackOptions = {
  persists?: boolean;
};

export class Analytics {
  private retention: number = 60 * 60 * 24 * 7;

  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) this.retention = opts.retention;
  }

  async track(namespace: string, event: object = {}, opts?: TrackOptions) {
    let key = `analytics::${namespace}`;

    if (!opts?.persists) {
      key += `::${getDate()}`;
    }

    // to do---  add db credentials and client and getDate() functionality
    // db call to persists the data

    await redis.hincrby(key, JSON.stringify(event), 1);

    // if not persists clear expired keys

    if (!opts?.persists) await redis.expire(key, this.retention);
  }
}

export const analytics = new Analytics();
