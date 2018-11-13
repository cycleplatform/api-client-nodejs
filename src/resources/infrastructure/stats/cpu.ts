export interface CPUStats {
  cores?: number;
  processors?: Proc[];
}

export interface Proc {
  model?: string;
  speed?: number;
}
