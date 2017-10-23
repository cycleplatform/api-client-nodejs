import "isomorphic-fetch";
import * as Account from "./resources/accounts";
import * as Auth from "./auth";
import * as API from "./common/Api";
import * as Billing from "./resources/billing";
import * as Containers from "./resources/containers";
import * as Environments from "./resources/environments";
import * as Error from "./common/Error";
import * as Images from "./resources/images";
import * as Infrastructure from "./resources/infrastructure";
import * as Jobs from "./resources/jobs";
import * as Notifications from "./resources/notifications";
import * as Plans from "./resources/plans";
import * as Projects from "./resources/projects";
import { QueryParams } from "./common/QueryParams";
import * as Stacks from "./resources/stacks";
import * as Structs from "./common/Structs";
import * as SuggestionPipeline from "./pipeline";

if (typeof window === "undefined") {
    // tslint:disable-next-line:no-var-requires
    (global as any).WebSocket = require("ws");
}

export {
    API,
    Auth,
    Account,
    Billing,
    Containers,
    Environments,
    Error,
    Images,
    Infrastructure,
    Jobs,
    Notifications,
    Plans,
    Projects,
    QueryParams,
    Stacks,
    Structs,
    SuggestionPipeline,
};
