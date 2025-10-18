import { DependencyContainer, Lifecycle } from "tsyringe";
import { SPTLeaderboard } from "../SPTLeaderboard";
import { LeaderboardInboxRouter } from "../routers/LeaderboardInboxRouter";
import { LeaderboardInboxCallbacks } from "../callbacks/LeaderboardInboxCallbacks";
import { LeaderboardItemRouter } from "../routers/LeaderboardItemRouter";
import { LeaderboardItemCallbacks } from "../callbacks/LeaderboardItemCallbacks";
import { InboxHelper } from "../helpers/InboxHelper";
import { LeaderboardItemHelper } from "../helpers/LeaderboardItemHelper";
import { LeaderboardRagfairHelper } from "../helpers/LeaderboardRagfairHelper";

export class Container {
  public static register(container: DependencyContainer): void {
    Container.registerStaticRoutes(container);
    Container.registerListTypes(container);
    container.register<SPTLeaderboard>("SPTLeaderboard", SPTLeaderboard, { lifecycle: Lifecycle.Singleton });
  }

  private static registerListTypes(container: DependencyContainer): void {
    container.registerType("StaticRoutes", "LeaderboardInboxRouter");
    container.registerType("StaticRoutes", "LeaderboardItemRouter");
  }

  private static registerStaticRoutes(container: DependencyContainer): void {
    container.register<LeaderboardInboxRouter>("LeaderboardInboxRouter", LeaderboardInboxRouter);
    container.register<LeaderboardInboxCallbacks>("LeaderboardInboxCallbacks", LeaderboardInboxCallbacks);
    container.register<LeaderboardItemRouter>("LeaderboardItemRouter", LeaderboardItemRouter);
    container.register<LeaderboardItemCallbacks>("LeaderboardItemCallbacks", LeaderboardItemCallbacks);
    container.register<InboxHelper>("InboxHelper", InboxHelper);
    container.register<LeaderboardItemHelper>("LeaderboardItemHelper", LeaderboardItemHelper);
    container.register<LeaderboardRagfairHelper>("LeaderboardRagfairHelper", LeaderboardRagfairHelper);
  }

}
