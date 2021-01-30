import { LocalSource } from "./local-source";
export interface RepoSource extends LocalSource, Repo {
  tag?: string;
}
export type RepoProtocol = "http" | "https" | "ssh";
export interface Repo {
  url: string;
  protocol: RepoProtocol;
  private_key?: string;
  private_key_url?: string;
}
