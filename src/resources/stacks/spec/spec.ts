import { Container } from "./container";

export interface Spec {
    name: string;
    version: string;
    description: string;
    containers: { [key: string]: Container };
    annotations: { [key: string]: string };
}
