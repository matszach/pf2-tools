export interface TraitsGroups {
  [key: string]: string[]
}

export enum TraitsToggleStateEnum {
  NONE = 0,
  ON = 1,
  OFF = -1
}

export interface TraitsSelection {
  [key: string]: TraitsToggleStateEnum
}