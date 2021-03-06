import {
  Add,
  Choose,
  Factorial,
  Factorisation,
  Fraction,
  Func,
  Int,
  Mult,
  Permute,
  Power,
  PowerFactorisation,
  SigmaSummation,
  Sub,
  Summation,
  Variable,
} from "./index";

test("new", () => {
  const two = new Int(2);
  const three = new Int(3);
  expect(two.simplify().compute()).toBe(2n);
  const summation = new Summation([two, three]);
  expect(summation.simplify().compute()).toBe(5n);
  const add = new Add(two, three);
  expect(add.simplify().compute()).toBe(5n);
  const sub = new Sub(two, three);
  expect(sub.simplify().compute()).toBe(-1n);
  const mult = new Mult(two, three);
  expect(mult.simplify().compute()).toBe(6n);
  const fact = new Factorisation(-12n);
  expect(fact.simplify().compute()).toBe(-12n);
  expect(fact.toPfs().factors.sort()).toEqual([2n, 2n, 3n]);
  const powerFact = new PowerFactorisation({ "4": 1n, "3": 1n }, -1);
  expect(powerFact.simplify().compute()).toBe(-12n);
  expect(powerFact.toPfs().factors).toEqual({ 2: 2n, 3: 1n });
  const frac = new Fraction(two, new Int(-12));
  expect(frac.simplify().compute()).toBe(2 / -12);
  const twoOverThree = new Fraction(two, three);
  const threeOverTwo = new Fraction(three, two);
  const fracSum = new Add(frac, twoOverThree);
  expect(fracSum.simplify().compute()).toBe(1 / 2);
  expect(new Add(twoOverThree, threeOverTwo).simplify().compute()).toBe(13 / 6);
  const fracDouble = new Add(frac, frac);
  expect(fracDouble.simplify().compute()).toBe(-1 / 3);
  const rootTwo = new Power(two, new Fraction(new Int(1), two));
  const rootFrac = new Fraction(new Mult(two, rootTwo), rootTwo);
  expect(rootFrac.simplify().compute()).toBe(2);
  const power = new Power(two, three);
  expect(power.simplify().compute()).toBe(8n);
  const factorial = new Factorial(5n);
  expect(factorial.simplify().compute()).toBe(5n * 4n * 3n * 2n * 1n);
  const choose = new Choose(5n, 2n);
  expect(choose.simplify().compute()).toBe((5n * 4n) / 2n);
  const permute = new Permute(5n, 2n);
  expect(permute.simplify().compute()).toBe(5n * 4n);
  const sigma = new SigmaSummation(two, three, x => new Fraction(x, two));
  expect(sigma.simplify().compute()).toBe(5 / 2);
});

// TODO: from

test("heads/tails", () => {
  const f = ([xi, di]: (Int | Variable)[]) => {
    const x = xi.compute();
    const d = di.compute();
    if (x < 1 || x - d < 1) {
      return new Int(1);
    } else {
      const a = new Choose(x, x - d);
      const b = new Choose(x - 1n, x - d - 1n);
      return new Sub(a, b);
    }
  };

  const term = (
    x: Int | Variable,
    m: number,
    p: number,
    indexSymbol: string,
  ) => {
    const args = [x, new Int(m - p)];
    const num = new Func(f, args, "f", [indexSymbol, `${m - p}`]);
    const den = new Power(new Int(2), x);
    return new Fraction(num, den);
  };

  const sum = (m: number, p: number, q: number, indexSymbol: string) => {
    const lowerBound = new Int(m - p);
    const upperBound = new Int(2 * m - p - q - 1);
    return new SigmaSummation(
      lowerBound,
      upperBound,
      x => term(x, m, p, indexSymbol),
      indexSymbol,
    );
  };

  expect(sum(5, 3, 2, "x").simplify().compute()).toBe(11 / 16);

  const m = 38;
  const p = 7;
  const q = 2;
  const surd = sum(m, p, q, "x");
  const simple = surd.simplify();
  console.log(
    `${surd.katex()} = ${simple.katex()} = ${simple.simplify().katex()}`,
  );
  expect(simple).toEqual(simple.simplify());
  expect(simple.compute()).toBeCloseTo(Number(surd.compute()));
});
