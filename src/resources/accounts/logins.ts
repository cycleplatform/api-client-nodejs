import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  Time,
  ResourceId,
} from "../../common/structs";
import { PublicAccount } from "./account";

export type Collection = CollectionDoc<Login, LoginIncludes>;
/**
 * The type of login used
 */
export type LoginType = "password" | "employee";
export type LoginQuery = QueryParams<keyof LoginIncludes>;

/**
 * Information about a login event
 */
export interface BaseLogin extends Resource {
  account: AccountInfo;
  time: Time;
  type: LoginType;
  /** A boolean where true represents a successful login */
  success: boolean;
}

export interface PasswordLogin extends BaseLogin {
  type: "password";
}

export interface EmployeeLogin extends BaseLogin {
  type: "employee";
  employee: PublicAccount;
}

export type Login = PasswordLogin | EmployeeLogin;

/**
 * Account information
 */
export interface AccountInfo {
  /** The account ID */
  id: ResourceId;
  /** The IP of the computer used during login */
  ip: string;
}

export interface LoginIncludes {
  accounts: {
    [key: string]: PublicAccount;
  };
}

export async function getCollection(params: StandardParams<LoginQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.account().logins(),
  });
}
