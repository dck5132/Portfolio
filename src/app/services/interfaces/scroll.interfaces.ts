export interface ScrollPosition {
  readonly yAxis: number;
}

export interface ScrollState {
  readonly offset: number;
  readonly windowHeight: number;
  readonly sections: ScrollSection[];
}

export interface ScrollSection {
  readonly id: string;
  readonly top: number;
  readonly height: number;
}