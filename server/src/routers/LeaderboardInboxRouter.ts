import { RouteAction } from "@spt/di/Router";
import { inject, injectable } from "tsyringe";
import { LeaderboardInboxCallbacks } from "../callbacks/LeaderboardInboxCallbacks";
import { StaticRouterMod } from "@spt/services/mod/staticRouter/StaticRouterMod";

@injectable()
export class LeaderboardInboxRouter extends StaticRouterMod {
  constructor(@inject("LeaderboardInboxCallbacks") protected leaderboardInboxCallbacks: LeaderboardInboxCallbacks) {
    super([
      new RouteAction("/client/match/local/end", async (url: string, info: any, sessionId: string, _output: string): Promise<any> => {
        this.leaderboardInboxCallbacks.handleInboxNotChecked(url, info, sessionId);
        return _output;
      }),
      new RouteAction("/client/game/logout", async (url: string, info: any, sessionId: string, _output: string): Promise<any> => {
        this.leaderboardInboxCallbacks.handleInboxNotChecked(url, info, sessionId);
        return _output;
      }),
      new RouteAction("/client/game/profile/items/moving", async (url: string, info: any, sessionId: string, _output: string): Promise<any> => {
        this.leaderboardInboxCallbacks.handleInboxChecked(url, info, sessionId);
        return _output;
      }),
    ], "aki")
  }
}
