import "isomorphic-fetch";
import * as Account from "./resources/accounts";
import * as Auth from "./auth";
import * as Request from "./common/api/request";
import * as Billing from "./resources/billing";
import * as Containers from "./resources/containers";
import * as Environments from "./resources/environments";
import * as Error from "./common/api/error";
import * as Images from "./resources/images";
import * as Infrastructure from "./resources/infrastructure";
import * as Jobs from "./resources/jobs";
import * as Notifications from "./resources/notifications";
import * as Plans from "./resources/plans";
import * as Projects from "./resources/projects";
import { QueryParams } from "./common/api/query";
import { Settings, ProjectRequiredSettings } from "./common/api/settings";
import * as Stacks from "./resources/stacks";
import * as Structs from "./common/structs";
import * as SuggestionPipeline from "./pipeline";

if (typeof window === "undefined") {
    // tslint:disable-next-line:no-var-requires
    (global as any).WebSocket = require("ws");
}

export {
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
    ProjectRequiredSettings,
    QueryParams,
    Request,
    Settings,
    Stacks,
    Structs,
    SuggestionPipeline,
};
