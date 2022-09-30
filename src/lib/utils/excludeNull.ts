type excludeNullType<T> = Exclude<T, null | undefined>;

export const excludeNull = <T>(arr: T[]): excludeNullType<T>[] => {
  return arr.filter(
    (val) => val !== null && val !== undefined,
  ) as excludeNullType<T>[];
};
