import { inject, injectable } from "tsyringe";
import { InboxHelper } from "../helpers/InboxHelper";
import { SPTLeaderboard } from "../SPTLeaderboard";
import { ILogger } from "@spt/models/spt/utils/ILogger";

@injectable()
export class LeaderboardInboxCallbacks {
  constructor(
    @inject("InboxHelper") protected inboxHelper: InboxHelper,
    @inject("WinstonLogger") protected logger: ILogger,
  ) { }

  public handleInboxNotChecked(_url: string, _info: any, _sessionId: string): void {
    SPTLeaderboard.sessionsInboxChecks.set(_sessionId, false);
    this.logger.info(`[SPTLeaderboard] Set inbox for session ${_sessionId} to UNCHECKED`);
  }

  public handleInboxChecked(_url: string, _info: any, _sessionId: string): void {
    if (SPTLeaderboard.sessionsInboxChecks.get(_sessionId) == true) {
      return;
    }
    this.inboxHelper.checkInbox(_sessionId);
    SPTLeaderboard.sessionsInboxChecks.set(_sessionId, true);
    this.logger.info(`[SPTLeaderboard] Set inbox check for session ${_sessionId} to CHECKED`);
  }
}
