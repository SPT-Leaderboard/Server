import { injectable } from "tsyringe";
import config from "../config.json";

@injectable()
export class SPTLeaderboard {
  public static sessionsInboxChecks: Map<string, boolean> = new Map();
  public static apiUrl: URL = new URL(config.api_url);
}
