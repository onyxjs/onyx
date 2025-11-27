// Type guard for TypedArrays
function isTypedArray(
  obj: unknown,
): obj is
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array {
  return ArrayBuffer.isView(obj) && !(obj instanceof DataView);
}

// Type guard for indexable objects
function isIndexable(obj: unknown): obj is Record<string | number, unknown> {
  return typeof obj === "object" && obj !== null;
}

export function deepEqual(a: unknown, b: unknown): boolean {
  // Fast path
  if (a === b) return true;

  // Correctly treat NaN === NaN
  if (a !== a && b !== b) return true; // both NaN

  // Primitives of different types cannot be equal
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const seen = new WeakMap();
  const work: Array<[unknown, unknown]> = [[a, b]];

  while (work.length) {
    const [x, y] = work.pop()!;

    if (x === y) continue;

    if (x !== x && y !== y) continue; // both NaN

    if (
      typeof x !== "object" ||
      typeof y !== "object" ||
      x === null ||
      y === null
    ) {
      return false;
    }

    // Handle cycles
    const mapped = seen.get(x);
    if (mapped) {
      if (mapped !== y) return false;
      continue;
    }
    seen.set(x, y);

    // Date
    if (x instanceof Date || y instanceof Date) {
      if (
        !(x instanceof Date && y instanceof Date && x.getTime() === y.getTime())
      ) {
        return false;
      }
      continue;
    }

    // RegExp
    if (x instanceof RegExp || y instanceof RegExp) {
      if (
        !(
          x instanceof RegExp &&
          y instanceof RegExp &&
          x.source === y.source &&
          x.flags === y.flags
        )
      ) {
        return false;
      }
      continue;
    }

    // ArrayBuffer views (TypedArrays, DataView)
    if (isTypedArray(x) && isTypedArray(y)) {
      if (x.constructor !== y.constructor || x.byteLength !== y.byteLength)
        return false;
      for (let i = 0; i < x.length; i++) {
        if (x[i] !== y[i]) return false;
      }
      continue;
    }

    // Set
    if (x instanceof Set || y instanceof Set) {
      if (!(x instanceof Set && y instanceof Set && x.size === y.size))
        return false;

      // Optimization: Convert second set to array once
      const yVals = Array.from(y);
      outer: for (const xv of x) {
        for (let i = 0; i < yVals.length; i++) {
          if (deepEqual(xv, yVals[i])) {
            yVals.splice(i, 1);
            continue outer;
          }
        }
        return false;
      }
      continue;
    }

    // Map
    if (x instanceof Map || y instanceof Map) {
      if (!(x instanceof Map && y instanceof Map && x.size === y.size))
        return false;

      const yEntries = Array.from(y.entries());
      outerMap: for (const [xk, xv] of x.entries()) {
        for (let i = 0; i < yEntries.length; i++) {
          const [yk, yv] = yEntries[i];
          if (deepEqual(xk, yk) && deepEqual(xv, yv)) {
            yEntries.splice(i, 1);
            continue outerMap;
          }
        }
        return false;
      }
      continue;
    }

    // Plain object / array
    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y);
    if (xKeys.length !== yKeys.length) return false;

    // Order of keys matter
    for (let i = 0; i < xKeys.length; i++) {
      if (xKeys[i] !== yKeys[i]) return false;
    }

    // Push nested comparisons to the work queue
    if (isIndexable(x) && isIndexable(y)) {
      for (const key of xKeys) {
        if (!Object.prototype.hasOwnProperty.call(y, key)) return false;
        work.push([x[key], y[key]]);
      }
    }
  }

  return true;
}
