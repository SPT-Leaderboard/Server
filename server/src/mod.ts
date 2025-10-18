import type { DependencyContainer } from "tsyringe";

import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { Container } from "./di/Container";

class Mod implements IPreSptLoadMod {
  public preSptLoad(container: DependencyContainer): void {
    Container.register(container);
  }
}
export const mod = new Mod();
