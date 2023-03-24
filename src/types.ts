export type EnumMap<E extends string, T> = {
  [key in E]: T;
};


export interface ISelectOption<T extends string = string> {
  value: T;
  label: string;
  subLabel?: string;
  disabled?: boolean;
}


export enum BranchesEnum {
  CSE = 'CSE',
  ECE = 'ECE',
  MECHANICAL = 'MECHANICAL',
  EEE = 'EEE',
  CIVIL = 'CIVIL',
}


