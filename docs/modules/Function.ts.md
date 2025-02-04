---
title: Function.ts
nav_order: 13
parent: Modules
---

## Function overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [type lambdas](#type-lambdas)
  - [FunctionTypeLambda (interface)](#functiontypelambda-interface)
- [utils](#utils)
  - [FunctionN (interface)](#functionn-interface)
  - [LazyArg (interface)](#lazyarg-interface)
  - [SK](#sk)
  - [absurd](#absurd)
  - [apply](#apply)
  - [compose](#compose)
  - [constFalse](#constfalse)
  - [constNull](#constnull)
  - [constTrue](#consttrue)
  - [constUndefined](#constundefined)
  - [constVoid](#constvoid)
  - [constant](#constant)
  - [flip](#flip)
  - [flow](#flow)
  - [hole](#hole)
  - [identity](#identity)
  - [pipe](#pipe)
  - [tupled](#tupled)
  - [unsafeCoerce](#unsafecoerce)
  - [untupled](#untupled)

---

# instances

## getMonoid

Unary functions form a monoid as long as you can provide a monoid for the codomain.

**Signature**

```ts
export declare const getMonoid: <M>(Monoid: monoid.Monoid<M>) => <A>() => monoid.Monoid<(a: A) => M>
```

**Example**

```ts
import { Predicate } from '@fp-ts/data/Predicate'
import { getMonoid, pipe } from '@fp-ts/data/Function'
import * as B from '@fp-ts/data/Boolean'

const f: Predicate<number> = (n) => n <= 2
const g: Predicate<number> = (n) => n >= 0

const M1 = getMonoid(B.MonoidAll)<number>()

assert.deepStrictEqual(pipe(f, M1.combine(g))(1), true)
assert.deepStrictEqual(pipe(f, M1.combine(g))(3), false)

const M2 = getMonoid(B.MonoidAny)<number>()

assert.deepStrictEqual(pipe(f, M2.combine(g))(1), true)
assert.deepStrictEqual(pipe(f, M2.combine(g))(3), true)
```

Added in v1.0.0

## getSemigroup

Unary functions form a semigroup as long as you can provide a semigroup for the codomain.

**Signature**

```ts
export declare const getSemigroup: <S>(Semigroup: semigroup.Semigroup<S>) => <A>() => semigroup.Semigroup<(a: A) => S>
```

**Example**

```ts
import { Predicate } from '@fp-ts/data/Predicate'
import { pipe, getSemigroup } from '@fp-ts/data/Function'
import * as B from '@fp-ts/data/Boolean'

const f: Predicate<number> = (n) => n <= 2
const g: Predicate<number> = (n) => n >= 0

const S1 = getSemigroup(B.SemigroupAll)<number>()

assert.deepStrictEqual(pipe(f, S1.combine(g))(1), true)
assert.deepStrictEqual(pipe(f, S1.combine(g))(3), false)

const S2 = getSemigroup(B.SemigroupAny)<number>()

assert.deepStrictEqual(pipe(f, S2.combine(g))(1), true)
assert.deepStrictEqual(pipe(f, S2.combine(g))(3), true)
```

Added in v1.0.0

# type lambdas

## FunctionTypeLambda (interface)

**Signature**

```ts
export interface FunctionTypeLambda extends TypeLambda {
  readonly type: (a: this['In']) => this['Target']
}
```

Added in v1.0.0

# utils

## FunctionN (interface)

**Signature**

```ts
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
  (...args: A): B
}
```

**Example**

```ts
import { FunctionN } from '@fp-ts/data/Function'

export const sum: FunctionN<[number, number], number> = (a, b) => a + b
```

Added in v1.0.0

## LazyArg (interface)

A lazy argument

**Signature**

```ts
export interface LazyArg<A> {
  (): A
}
```

Added in v1.0.0

## SK

`SK` function (SKI combinator calculus).

**Signature**

```ts
export declare const SK: <A, B>(_: A, b: B) => B
```

Added in v1.0.0

## absurd

**Signature**

```ts
export declare const absurd: <A>(_: never) => A
```

Added in v1.0.0

## apply

**Signature**

```ts
export declare const apply: <A>(a: A) => <B>(self: (a: A) => B) => B
```

Added in v1.0.0

## compose

**Signature**

```ts
export declare const compose: <B, C>(bc: (b: B) => C) => <A>(ab: (a: A) => B) => (a: A) => C
```

Added in v1.0.0

## constFalse

A thunk that returns always `false`.

**Signature**

```ts
export declare const constFalse: LazyArg<boolean>
```

Added in v1.0.0

## constNull

A thunk that returns always `null`.

**Signature**

```ts
export declare const constNull: LazyArg<null>
```

Added in v1.0.0

## constTrue

A thunk that returns always `true`.

**Signature**

```ts
export declare const constTrue: LazyArg<boolean>
```

Added in v1.0.0

## constUndefined

A thunk that returns always `undefined`.

**Signature**

```ts
export declare const constUndefined: LazyArg<undefined>
```

Added in v1.0.0

## constVoid

A thunk that returns always `void`.

**Signature**

```ts
export declare const constVoid: LazyArg<void>
```

Added in v1.0.0

## constant

**Signature**

```ts
export declare const constant: <A>(a: A) => LazyArg<A>
```

Added in v1.0.0

## flip

Flips the arguments of a curried function.

**Signature**

```ts
export declare const flip: <A, B, C>(f: (a: A) => (b: B) => C) => (b: B) => (a: A) => C
```

**Example**

```ts
import { flip } from '@fp-ts/data/Function'

const f = (a: number) => (b: string) => a - b.length

assert.strictEqual(flip(f)('aaa')(2), -1)
```

Added in v1.0.0

## flow

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

**Signature**

```ts
export declare function flow<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B
export declare function flow<A extends ReadonlyArray<unknown>, B, C>(
  ab: (...a: A) => B,
  bc: (b: B) => C
): (...a: A) => C
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...a: A) => E
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...a: A) => F
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...a: A) => G
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...a: A) => H
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...a: A) => I
export declare function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...a: A) => J
```

**Example**

```ts
import { flow } from '@fp-ts/data/Function'

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
```

Added in v1.0.0

## hole

Type hole simulation

**Signature**

```ts
export declare const hole: <T>() => T
```

Added in v1.0.0

## identity

**Signature**

```ts
export declare const identity: <A>(a: A) => A
```

Added in v1.0.0

## pipe

Pipes the value of an expression into a pipeline of functions.

**Signature**

```ts
export declare function pipe<A>(a: A): A
export declare function pipe<A, B>(a: A, ab: (a: A) => B): B
export declare function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export declare function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
export declare function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
export declare function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F
export declare function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): G
export declare function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): H
export declare function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): I
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): J
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K
): K
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L
): L
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M
): M
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N
): N
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O
): O
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P
): P
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q
): Q
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R
): R
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S
): S
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
  st: (s: S) => T
): T
```

**Example**

```ts
import { pipe } from '@fp-ts/data/Function'

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

// without pipe
assert.strictEqual(double(len('aaa')), 6)

// with pipe
assert.strictEqual(pipe('aaa', len, double), 6)
```

Added in v1.0.0

## tupled

Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.

**Signature**

```ts
export declare const tupled: <A extends readonly unknown[], B>(f: (...a: A) => B) => (a: A) => B
```

**Example**

```ts
import { tupled } from '@fp-ts/data/Function'

const add = tupled((x: number, y: number): number => x + y)

assert.strictEqual(add([1, 2]), 3)
```

Added in v1.0.0

## unsafeCoerce

**Signature**

```ts
export declare const unsafeCoerce: <A, B>(a: A) => B
```

Added in v1.0.0

## untupled

Inverse function of `tupled`

**Signature**

```ts
export declare const untupled: <A extends readonly unknown[], B>(f: (a: A) => B) => (...a: A) => B
```

Added in v1.0.0
