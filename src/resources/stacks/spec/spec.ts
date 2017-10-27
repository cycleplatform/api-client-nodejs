import { Container } from "./container";

export interface Spec {
    name: string;
    description: string;
    containers: { [key: string]: Container };
    annotations: { [key: string]: string };
}
