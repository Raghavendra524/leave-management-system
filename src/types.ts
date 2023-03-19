export type EnumMap<E extends string, T> = {
  [key in E]: T;
};
