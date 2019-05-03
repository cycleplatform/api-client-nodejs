import { ContainerIdentifier } from "../../../../common/structs";

export type ScalingMetric = "ram";

export interface Scaling {
  auto?: AutoScaling;
  orchestrator?: ContainerIdentifier;
}

export interface AutoScaling {
  instances: Instances;
  rules: AutoScalingRule[];
}

export interface AutoScalingRule {
  metric: ScalingMetric;
  threshold: string;
}

export interface Instances {
  min: number;
  max: number;
}
