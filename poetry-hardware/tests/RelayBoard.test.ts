// File: RelayBoard.test.ts
// Purpose: Unit tests for RelayBoard aggregate
// All Rights Reserved. Arodi Emmanuel

import { RelayBoard } from '../src/domain/relay/RelayBoard';
import { RelayChannel } from '../src/domain/relay/RelayChannel';

describe('RelayBoard', () => {
  let board: RelayBoard;

  beforeEach(() => {
    board = RelayBoard.create();
  });

  test('creates board with 4 inactive channels', () => {
    const channels = board.getAllChannels();
    expect(channels).toHaveLength(4);
    expect(channels.every((ch) => !ch.isActive)).toBe(true);
  });

  test('activates channel successfully', () => {
    board.activateChannel(1);
    const channel = board.getChannel(1);
    expect(channel.isActive).toBe(true);
  });

  test('deactivates channel successfully', () => {
    board.activateChannel(2);
    board.deactivateChannel(2);
    const channel = board.getChannel(2);
    expect(channel.isActive).toBe(false);
  });

  test('throws error for invalid channel id', () => {
    expect(() => board.getChannel(5 as any)).toThrow(
      'relay.channel.notfound'
    );
  });

  test('maintains independent channel states', () => {
    board.activateChannel(1);
    board.activateChannel(3);

    expect(board.getChannel(1).isActive).toBe(true);
    expect(board.getChannel(2).isActive).toBe(false);
    expect(board.getChannel(3).isActive).toBe(true);
    expect(board.getChannel(4).isActive).toBe(false);
  });
});
