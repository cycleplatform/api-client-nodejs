import { Origin, About } from "../../../images";

export type CreateType = "direct";
export interface Create {
  name: string;
  about?: About;
  origin: Origin;
  type: CreateType;
}
