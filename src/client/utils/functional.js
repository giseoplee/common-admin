

const hasIter = coll => (!!coll && coll[Symbol.iterator]);
const collIter = coll => hasIter(coll) ?
  coll[Symbol.iterator]() :
  valuesIter(coll);

const curry = f => (a, ..._) => _.length === 0 ? (..._2) => f(a, ..._2) : f(a, ..._);

const trim = (str) => {
  if (typeof str != 'string') return str;
  return str.trim().split(" ").join('');
}

function* valuesIter(obj) {
  for (const k in obj) yield obj[k];
}
function* entriesIter(obj) {
  for (const k in obj) yield [k, obj[k]];
}

const isUndefined = a => a === undefined;

const not = a => !a;

const call = (f, a) => f(a);
const call2 = (a, f) => f(a);

const reduce = curry((f, coll, acc) => {
  const iter = collIter(coll);
  acc = (acc === undefined ? iter.next().value : acc);
  for (const v of iter)
    acc = acc instanceof Promise ? acc.then(acc => f(acc, v)) : f(acc, v);
  return acc;
})

const objPush = (obj, k, v) => ((obj[k] || (obj[k] = [])).push(v), obj);

const groupBy = (f, coll) => reduce((obj, v) => objPush(obj, f(v), v), coll, {});

const push = (obj, v) => (obj.push(v), obj);
const set = (obj, k, v) => (obvj[k] = v, obj);

const baseMF = (f1, f2) => curry((f, coll, acc) => {
  return hasIter(coll) ?
    reduce((acc, a) => go(a, f, b => f1(acc, a, b)), coll, []) :
    reduce((acc, [k, v]) => go(v, f, b => f2(acc, [k, v], b)), coll, entriesIter(coll), {});
})

const map = baseMF(
  (acc, a, b) => push(acc, b),
  (acc, [k, v], b) => set(acc, k, b),
)

const filter = baseMF(
  (acc, a, b) => b ? push(acc, a) : acc,
  (acc, [k, v], b) => b ? set(acc, k, v) : acc,
)

const pipe = (f, ...fs) => (a) => reduce(call2, fs, f(a));

const go = (a, ...fs) => reduce(call2, fs, a)


class Break {
  constructor(value) { this.value = value; }
  static of(value) { return new Break(value); }
}

const reduceB = curry(function (f, coll, acc) {
  const iter = collIter(coll);
  return go(
    arguments.length == 2 ? iter.next().value : acc,
    function recur(acc) {
      var cur;
      while (!(cur = iter.next()).done && !(acc instanceof Break))
        if ((acc = f(acc, cur.value, Break.of)) instanceof Promise)
          return acc.then(recur);
      return acc instanceof Break ? acc.value : acc;
    });
});


const range = (start, end, step) => {
  start = toFinite(start)
  if (end === undefined) {
    end = start
    start = 0
  } else {
    end = toFinite(end)
  }
  step = step === undefined ? (start < end ? 1 : -1) : toFinite(step)
  return baseRange(start, end, step)
}

function baseRange(start, end, step) {
  let index = -1
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0)
  const result = new Array(length)

  while (length--) {
    result[++index] = start
    start += step
  }
  return result
}
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0
  }
  value = toNumber(value)
  if (value === Infinity || value === -Infinity) {
    const sign = (value < 0 ? -1 : 1)
    return sign * MAX_INTEGER
  }
  return value === value ? value : 0
}

function toNumber(value) {
  const NAN = 0 / 0
  const reTrim = /^\s+|\s+$/g
  const reIsBadHex = /^[-+]0x[0-9a-f]+$/i
  const reIsBinary = /^0b[01]+$/i
  const reIsOctal = /^0o[0-7]+$/i

  if (typeof value == 'number') {
    return value
  }
  if (isSymbol(value)) {
    return NAN
  }
  if (isObject(value)) {
    const other = typeof value.valueOf == 'function' ? value.valueOf() : value
    value = isObject(other) ? `${other}` : other
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value
  }
  value = value.replace(reTrim, '')
  const isBinary = reIsBinary.test(value)
  return (isBinary || reIsOctal.test(value))
    ? parseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
}

export {
  trim, curry,
  reduce, reduceB,
  isUndefined,
  not,
  pipe, go,
  map, filter, groupBy, entriesIter,
  range,
}