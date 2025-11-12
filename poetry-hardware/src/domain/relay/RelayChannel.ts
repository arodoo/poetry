// File: RelayChannel.ts
// Purpose: Domain model for individual relay channel
// All Rights Reserved. Arodi Emmanuel

export type RelayChannelId = 1 | 2 | 3 | 4;

export interface RelayChannelState {
  readonly id: RelayChannelId;
  readonly isActive: boolean;
  readonly lastToggled: Date;
}

export class RelayChannel {
  private constructor(
    public readonly id: RelayChannelId,
    private _isActive: boolean,
    private _lastToggled: Date
  ) {}

  static create(id: RelayChannelId): RelayChannel {
    if (id < 1 || id > 4) {
      throw new Error('relay.channel.invalid');
    }
    return new RelayChannel(id, false, new Date());
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get lastToggled(): Date {
    return this._lastToggled;
  }

  activate(): RelayChannel {
    return new RelayChannel(this.id, true, new Date());
  }

  deactivate(): RelayChannel {
    return new RelayChannel(this.id, false, new Date());
  }

  toState(): RelayChannelState {
    return {
      id: this.id,
      isActive: this._isActive,
      lastToggled: this._lastToggled,
    };
  }
}
