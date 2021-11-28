export type Mapped<Type> = {
  [Property in keyof Type]: Type[Property];
};
