export function mapObject<
  S extends { [key: string]: any },
  D extends { [key: string]: any },
>(
  source: S,
  destination: D,
  options?: {
    strict?: boolean;
    exclude?: (keyof S)[];
    include?: (keyof S)[];
  },
) {
  if (options === undefined) options = {};
  if (options?.strict === undefined) options.strict = true;

  let result = Object.entries(source);
  result = options.exclude
    ? result.filter(([key]) => !options.exclude?.includes(key))
    : result;
  result = options.include
    ? result.filter(([key]) => options.include?.includes(key))
    : result;

  // if (options.strict)
  //   result = result.filter(([key]) => (key as keyof D) in KeyOfDest);

  result.forEach(([key, value]) => (destination[key as keyof D] = value));
}
