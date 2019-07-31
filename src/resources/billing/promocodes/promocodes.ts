import { Resource, Time, State } from "common/structs";
import { Amount } from "../amount";
import { Expiration } from "../term";

export interface PromoCode extends Resource {
  code: string;
  credit: { amount: Amount; expires: Expiration } | null;
  expires: Time;
  state: State<"live" | "deleted">;
}
