import { LoadBalancer } from "./loadbalancer";
import { VPN } from "./vpn";

export interface Services {
  loadbalancer?: LoadBalancer;
  vpn?: VPN;
}
