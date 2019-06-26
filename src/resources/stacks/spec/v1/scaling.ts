export type ScalingMetric = "ram";

export interface Scaling {
  auto: AutoScaling | null;
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
