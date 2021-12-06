import { BetterStacy } from "../Bot";
import { EventEmitter } from "events";
export interface RunFunction {
  (client: BetterStacy, ...params: unknown[]): Promise<unknown>;
}

export interface FunctionForEE {
  (client: BetterStacy): EventEmitter;
}
export interface Event {
  name: string;
  run: RunFunction;
  emitter?: EventEmitter | FunctionForEE;
}
