import {
    Time,
    ResourceId,
    StandardEvents,
    ResourceState,
    UserScope,
} from "../../../common/Structs";
import { Term } from "../Term";
import { Item } from "./Item";
import { Amount } from "../Amount";

export interface Service {
    id: ResourceId;
    owner: UserScope;
    project_id: ResourceId;
    title: string;
    order: Order;
    item: Item;
    events: StandardEvents & {
        billed?: Time;
        paid?: Time;
        payment_attempt?: Time;
        credited?: Time;
        voided?: Time;
    };
    price: Amount;
    term: Term;
    state: ResourceState;
}

export interface Order {
    id: ResourceId;
    item_id: ResourceId;
}

export interface Summary {
    service_id: ResourceId;
    title: string;
    term: Term;
    price: number;
}
