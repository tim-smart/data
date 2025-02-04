---
title: Either.ts
nav_order: 11
parent: Modules
---

## Either overview

```ts
type Either<E, A> = Left<E> | Right<A>
```

Represents a value of one of two possible types (a disjoint union).

An instance of `Either` is either an instance of `Left` or `Right`.

A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
`None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
dictates that `Left` is used for failure and `Right` is used for success.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combining](#combining)
  - [getFirstLeftMonoid](#getfirstleftmonoid)
  - [getFirstLeftSemigroup](#getfirstleftsemigroup)
  - [getFirstRightSemigroup](#getfirstrightsemigroup)
- [constructors](#constructors)
  - [left](#left)
  - [of](#of)
  - [right](#right)
- [conversions](#conversions)
  - [fromIterable](#fromiterable)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [toRefinement](#torefinement)
- [debugging](#debugging)
  - [inspectLeft](#inspectleft)
  - [inspectRight](#inspectright)
- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [firstSuccessOf](#firstsuccessof)
  - [mapLeft](#mapleft)
  - [orElse](#orelse)
  - [orElseEither](#orelseeither)
  - [orElseFail](#orelsefail)
  - [orElseSucceed](#orelsesucceed)
  - [productMany](#productmany)
  - [tapError](#taperror)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
- [generators](#generators)
  - [gen](#gen)
- [getters](#getters)
  - [getLeft](#getleft)
  - [getOrElse](#getorelse)
  - [getOrNull](#getornull)
  - [getOrUndefined](#getorundefined)
  - [getRight](#getright)
  - [merge](#merge)
- [guards](#guards)
  - [isEither](#iseither)
  - [isLeft](#isleft)
  - [isRight](#isright)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Bicovariant](#bicovariant)
  - [Chainable](#chainable)
  - [Covariant](#covariant)
  - [FlatMap](#flatmap)
  - [Foldable](#foldable)
  - [Invariant](#invariant)
  - [Monad](#monad)
  - [Of](#of)
  - [Pointed](#pointed)
  - [Product](#product)
  - [SemiAlternative](#semialternative)
  - [SemiApplicative](#semiapplicative)
  - [SemiCoproduct](#semicoproduct)
  - [SemiProduct](#semiproduct)
  - [Traversable](#traversable)
- [interop](#interop)
  - [fromThrowable](#fromthrowable)
  - [getOrThrow](#getorthrow)
  - [liftThrowable](#liftthrowable)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [bimap](#bimap)
  - [flap](#flap)
  - [imap](#imap)
  - [map](#map)
  - [tupled](#tupled)
- [models](#models)
  - [Either (type alias)](#either-type-alias)
  - [Left (type alias)](#left-type-alias)
  - [Right (type alias)](#right-type-alias)
- [mutations](#mutations)
  - [reverse](#reverse)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [sequencing](#sequencing)
  - [andThenDiscard](#andthendiscard)
  - [flatMap](#flatmap)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [traverseTap](#traversetap)
- [type lambdas](#type-lambdas)
  - [EitherTypeLambda (interface)](#eithertypelambda-interface)
- [utils](#utils)
  - [andThen](#andthen)
  - [ap](#ap)
  - [composeKleisliArrow](#composekleisliarrow)
  - [elem](#elem)
  - [exists](#exists)
  - [flatten](#flatten)
  - [product](#product)
  - [productAll](#productall)
  - [productFlatten](#productflatten)
  - [struct](#struct)
  - [tap](#tap)
  - [tuple](#tuple)
  - [unit](#unit)

---

# combining

## getFirstLeftMonoid

Monoid returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Monoid`.

The `empty` value is `right(M.empty)`.

**Signature**

```ts
export declare const getFirstLeftMonoid: <A, E>(M: Monoid<A>) => Monoid<Either<E, A>>
```

Added in v1.0.0

## getFirstLeftSemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`.

| x        | y        | x       | > combine(y)  |
| -------- | -------- | ------- | ------------- |
| left(a)  | left(b)  | left(a) |
| left(a)  | right(2) | left(a) |
| right(1) | left(b)  | left(b) |
| right(1) | right(2) | right(1 | > combine(2)) |

**Signature**

```ts
export declare const getFirstLeftSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Either<E, A>>
```

Added in v1.0.0

## getFirstRightSemigroup

Semigroup returning the left-most `Right` value.

| x        | y        | x        | > combine(y) |
| -------- | -------- | -------- | ------------ |
| left(a)  | left(b)  | left(b)  |
| left(a)  | right(2) | right(2) |
| right(1) | left(b)  | right(1) |
| right(1) | right(2) | right(1) |

**Signature**

```ts
export declare const getFirstRightSemigroup: <E, A>() => Semigroup<Either<E, A>>
```

Added in v1.0.0

# constructors

## left

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure.

**Signature**

```ts
export declare const left: <E>(e: E) => Either<E, never>
```

Added in v1.0.0

## of

Alias of `right`.

**Signature**

```ts
export declare const of: <A>(a: A) => Either<never, A>
```

Added in v1.0.0

## right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure.

**Signature**

```ts
export declare const right: <A>(a: A) => Either<never, A>
```

Added in v1.0.0

# conversions

## fromIterable

**Signature**

```ts
export declare const fromIterable: <E>(onEmpty: LazyArg<E>) => <A>(collection: Iterable<A>) => Either<E, A>
```

Added in v1.0.0

## fromNullable

Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => Either<E, NonNullable<A>>
```

**Example**

```ts
import * as E from '@fp-ts/data/Either'

const parse = E.fromNullable(() => 'nullable')

assert.deepStrictEqual(parse(1), E.right(1))
assert.deepStrictEqual(parse(null), E.left('nullable'))
```

Added in v1.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A>(self: Option<A>) => Either<E, A>
```

**Example**

```ts
import * as E from '@fp-ts/data/Either'
import { pipe } from '@fp-ts/data/Function'
import * as O from '@fp-ts/data/Option'

assert.deepStrictEqual(
  pipe(
    O.some(1),
    E.fromOption(() => 'error')
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    O.none,
    E.fromOption(() => 'error')
  ),
  E.left('error')
)
```

Added in v1.0.0

## toRefinement

Returns a `Refinement` from a `Either` returning function.
This function ensures that a `Refinement` definition is type-safe.

**Signature**

```ts
export declare const toRefinement: <A, E, B extends A>(f: (a: A) => Either<E, B>) => Refinement<A, B>
```

Added in v1.0.0

# debugging

## inspectLeft

**Signature**

```ts
export declare const inspectLeft: <E>(onLeft: (e: E) => void) => <A>(self: Either<E, A>) => Either<E, A>
```

Added in v1.0.0

## inspectRight

**Signature**

```ts
export declare const inspectRight: <A>(onRight: (a: A) => void) => <E>(self: Either<E, A>) => Either<E, A>
```

Added in v1.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Either<never, {}>
```

Added in v1.0.0

## andThenBind

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const andThenBind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E2, B>
) => <E1>(self: Either<E1, A>) => Either<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E2, B>
) => <E1>(self: Either<E1, A>) => Either<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(self: Either<E, A>) => Either<E, { readonly [K in N]: A }>
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: Either<E, A>) => Either<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

# error handling

## catchAll

Recovers from all errors.

**Signature**

```ts
export declare const catchAll: <E1, E2, B>(
  onLeft: (e: E1) => Either<E2, B>
) => <A>(self: Either<E1, A>) => Either<E2, B | A>
```

Added in v1.0.0

## firstSuccessOf

**Signature**

```ts
export declare const firstSuccessOf: <E, A>(collection: Iterable<Either<E, A>>) => (self: Either<E, A>) => Either<E, A>
```

Added in v1.0.0

## mapLeft

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(self: Either<E, A>) => Either<G, A>
```

Added in v1.0.0

## orElse

Executes this effect and returns its value, if it succeeds, but otherwise
executes the specified effect.

| x        | y        | x        | > orElse(y) |
| -------- | -------- | -------- | ----------- |
| left(a)  | left(b)  | left(b)  |
| left(a)  | right(2) | right(2) |
| right(1) | left(b)  | right(1) |
| right(1) | right(2) | right(1) |

**Signature**

```ts
export declare const orElse: <E2, B>(that: Either<E2, B>) => <E1, A>(self: Either<E1, A>) => Either<E2, B | A>
```

Added in v1.0.0

## orElseEither

Returns an effect that will produce the value of this effect, unless it
fails, in which case, it will produce the value of the specified effect.

**Signature**

```ts
export declare const orElseEither: <E2, B>(
  that: Either<E2, B>
) => <E1, A>(self: Either<E1, A>) => Either<E2, Either<A, B>>
```

Added in v1.0.0

## orElseFail

Executes this effect and returns its value, if it succeeds, but otherwise
fails with the specified error.

**Signature**

```ts
export declare const orElseFail: <E2>(onLeft: LazyArg<E2>) => <E1, A>(self: Either<E1, A>) => Either<E2, A>
```

Added in v1.0.0

## orElseSucceed

Executes this effect and returns its value, if it succeeds, but otherwise
succeeds with the specified value.

**Signature**

```ts
export declare const orElseSucceed: <B>(onLeft: LazyArg<B>) => <E, A>(self: Either<E, A>) => Either<E, B | A>
```

Added in v1.0.0

## productMany

**Signature**

```ts
export declare const productMany: <E, A>(
  collection: Iterable<Either<E, A>>
) => (self: Either<E, A>) => Either<E, readonly [A, ...A[]]>
```

Added in v1.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, E2, _>(
  onLeft: (e: E1) => Either<E2, _>
) => <A>(self: Either<E1, A>) => Either<E1 | E2, A>
```

Added in v1.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E2>(onNone: LazyArg<E2>) => <E1, A>(self: Either<E1, Option<A>>) => Either<E2 | E1, A>
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E2>): <E1>(
    self: Either<E1, C>
  ) => Either<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: LazyArg<E2>): <E1>(
    self: Either<E1, B>
  ) => Either<E2 | E1, B>
}
```

Added in v1.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: LazyArg<E2>
) => <E1>(self: Either<E1, A>) => Either<E2 | E1, B>
```

Added in v1.0.0

# generators

## gen

**Signature**

```ts
export declare const gen: Gen.Gen<EitherTypeLambda, Gen.Adapter<EitherTypeLambda>>
```

Added in v1.0.0

# getters

## getLeft

Converts a `Either` to an `Option` discarding the Right.

**Signature**

```ts
export declare const getLeft: <E, A>(self: Either<E, A>) => Option<E>
```

**Example**

```ts
import * as O from '@fp-ts/data/Option'
import * as E from '@fp-ts/data/Either'

assert.deepStrictEqual(E.getLeft(E.right('ok')), O.none)
assert.deepStrictEqual(E.getLeft(E.left('err')), O.some('err'))
```

Added in v1.0.0

## getOrElse

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

**Signature**

```ts
export declare const getOrElse: <B>(onLeft: LazyArg<B>) => <E, A>(self: Either<E, A>) => B | A
```

**Example**

```ts
import * as E from '@fp-ts/data/Either'
import { pipe } from '@fp-ts/data/Function'

assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.getOrElse(() => 0)
  ),
  1
)
assert.deepStrictEqual(
  pipe(
    E.left('error'),
    E.getOrElse(() => 0)
  ),
  0
)
```

Added in v1.0.0

## getOrNull

**Signature**

```ts
export declare const getOrNull: <E, A>(self: Either<E, A>) => A | null
```

Added in v1.0.0

## getOrUndefined

**Signature**

```ts
export declare const getOrUndefined: <E, A>(self: Either<E, A>) => A | undefined
```

Added in v1.0.0

## getRight

Converts a `Either` to an `Option` discarding the error.

**Signature**

```ts
export declare const getRight: <E, A>(self: Either<E, A>) => Option<A>
```

**Example**

```ts
import * as O from '@fp-ts/data/Option'
import * as E from '@fp-ts/data/Either'

assert.deepStrictEqual(E.getRight(E.right('ok')), O.some('ok'))
assert.deepStrictEqual(E.getRight(E.left('err')), O.none)
```

Added in v1.0.0

## merge

**Signature**

```ts
export declare const merge: <E, A>(self: Either<E, A>) => E | A
```

Added in v1.0.0

# guards

## isEither

Returns `true` if the specified value is an instance of `Either`, `false`
otherwise.

**Signature**

```ts
export declare const isEither: (u: unknown) => u is Either<unknown, unknown>
```

Added in v1.0.0

## isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise.

**Signature**

```ts
export declare const isLeft: <E, A>(self: Either<E, A>) => self is Left<E>
```

Added in v1.0.0

## isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise.

**Signature**

```ts
export declare const isRight: <E, A>(self: Either<E, A>) => self is Right<A>
```

Added in v1.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<EitherTypeLambda>
```

Added in v1.0.0

## Bicovariant

**Signature**

```ts
export declare const Bicovariant: bicovariant.Bicovariant<EitherTypeLambda>
```

Added in v1.0.0

## Chainable

**Signature**

```ts
export declare const Chainable: chainable.Chainable<EitherTypeLambda>
```

Added in v1.0.0

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<EitherTypeLambda>
```

Added in v1.0.0

## FlatMap

**Signature**

```ts
export declare const FlatMap: flatMap_.FlatMap<EitherTypeLambda>
```

Added in v1.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<EitherTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<EitherTypeLambda>
```

Added in v1.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<EitherTypeLambda>
```

Added in v1.0.0

## Of

**Signature**

```ts
export declare const Of: of_.Of<EitherTypeLambda>
```

Added in v1.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<EitherTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<EitherTypeLambda>
```

Added in v1.0.0

## SemiAlternative

**Signature**

```ts
export declare const SemiAlternative: semiAlternative.SemiAlternative<EitherTypeLambda>
```

Added in v1.0.0

## SemiApplicative

**Signature**

```ts
export declare const SemiApplicative: semiApplicative.SemiApplicative<EitherTypeLambda>
```

Added in v1.0.0

## SemiCoproduct

**Signature**

```ts
export declare const SemiCoproduct: semiCoproduct.SemiCoproduct<EitherTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<EitherTypeLambda>
```

Added in v1.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<EitherTypeLambda>
```

Added in v1.0.0

# interop

## fromThrowable

Constructs a new `Either` from a function that might throw.

**Signature**

```ts
export declare const fromThrowable: <A, E>(f: () => A, onThrow: (error: unknown) => E) => Either<E, A>
```

**Example**

```ts
import * as E from '@fp-ts/data/Either'
import { identity } from '@fp-ts/data/Function'

const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
  if (as.length > 0) {
    return as[0]
  } else {
    throw new Error('empty array')
  }
}

const head = <A>(as: ReadonlyArray<A>): E.Either<unknown, A> => E.fromThrowable(() => unsafeHead(as), identity)

assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
```

Added in v1.0.0

## getOrThrow

**Signature**

```ts
export declare const getOrThrow: <E>(onLeft: (e: E) => unknown) => <A>(self: Either<E, A>) => A
```

Added in v1.0.0

## liftThrowable

Lifts a function that may throw to one returning a `Either`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => Either<E, B>
```

Added in v1.0.0

# lifting

## lift2

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: Either<E1, A>, fb: Either<E2, B>) => Either<E1 | E2, C>
```

Added in v1.0.0

## lift3

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: Either<E1, A>, fb: Either<E2, B>, fc: Either<E3, C>) => Either<E1 | E2 | E3, D>
```

Added in v1.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A) => Either<E, NonNullable<B>>
```

Added in v1.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => Either<E, B>
```

Added in v1.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E>): (c: C) => Either<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: LazyArg<E>): (b: B) => Either<E, B>
}
```

**Example**

```ts
import { liftPredicate, left, right } from '@fp-ts/data/Either'
import { pipe } from '@fp-ts/data/Function'

assert.deepStrictEqual(
  pipe(
    1,
    liftPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  right(1)
)
assert.deepStrictEqual(
  pipe(
    -1,
    liftPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  left('error')
)
```

Added in v1.0.0

# mapping

## as

Maps the Right value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <E, _>(self: Either<E, _>) => Either<E, B>
```

Added in v1.0.0

## asUnit

Returns the effect Eithering from mapping the Right of this effect to unit.

**Signature**

```ts
export declare const asUnit: <E, _>(self: Either<E, _>) => Either<E, void>
```

Added in v1.0.0

## bimap

Returns an effect whose Left and Right channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: Either<E, A>) => Either<G, B>
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(self: Either<E, (a: A) => B>) => Either<E, B>
```

Added in v1.0.0

## imap

**Signature**

```ts
export declare const imap: <A, B>(to: (a: A) => B, from: (b: B) => A) => <E>(self: Either<E, A>) => Either<E, B>
```

Added in v1.0.0

## map

Returns an effect whose Right is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(self: Either<E, A>) => Either<E, B>
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: Either<E, A>) => Either<E, readonly [A]>
```

Added in v1.0.0

# models

## Either (type alias)

**Signature**

```ts
export type Either<E, A> = Left<E> | Right<A>
```

Added in v1.0.0

## Left (type alias)

**Signature**

```ts
export type Left<E> = {
  readonly _tag: 'Left'
  readonly left: E
}
```

Added in v1.0.0

## Right (type alias)

**Signature**

```ts
export type Right<A> = {
  readonly _tag: 'Right'
  readonly right: A
}
```

Added in v1.0.0

# mutations

## reverse

**Signature**

```ts
export declare const reverse: <E, A>(self: Either<E, A>) => Either<A, E>
```

Added in v1.0.0

# pattern matching

## match

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
if the value is a `Right` the inner value is applied to the second function.

**Signature**

```ts
export declare const match: <E, B, A, C = B>(onLeft: (e: E) => B, onRight: (a: A) => C) => (self: Either<E, A>) => B | C
```

**Example**

```ts
import * as E from '@fp-ts/data/Either'
import { pipe } from '@fp-ts/data/Function'

const onLeft = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.strictEqual(pipe(E.right(1), E.match(onLeft, onRight)), 'Ok: 1')
assert.strictEqual(pipe(E.left(['error 1', 'error 2']), E.match(onLeft, onRight)), 'Errors: error 1, error 2')
```

Added in v1.0.0

# sequencing

## andThenDiscard

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const andThenDiscard: <E2, _>(that: Either<E2, _>) => <E1, A>(self: Either<E1, A>) => Either<E2 | E1, A>
```

Added in v1.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, E2, B>(f: (a: A) => Either<E2, B>) => <E1>(self: Either<E1, A>) => Either<E2 | E1, B>
```

Added in v1.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: (a: A) => E2
) => <E1>(self: Either<E1, A>) => Either<E2 | E1, NonNullable<B>>
```

Added in v1.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E2
) => <E1>(self: Either<E1, A>) => Either<E2 | E1, B>
```

Added in v1.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <E, FR, FO, FE, A>(self: Either<E, Kind<F, FR, FO, FE, A>>) => Kind<F, FR, FO, FE, Either<E, A>>
```

Added in v1.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, FR, FO, FE, B>(
  f: (a: A) => Kind<F, FR, FO, FE, B>
) => <E>(self: Either<E, A>) => Kind<F, FR, FO, FE, Either<E, B>>
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>) => <TE>(self: Either<TE, A>) => Kind<F, R, O, E, Either<TE, A>>
```

Added in v1.0.0

# type lambdas

## EitherTypeLambda (interface)

**Signature**

```ts
export interface EitherTypeLambda extends TypeLambda {
  readonly type: Either<this['Out1'], this['Target']>
}
```

Added in v1.0.0

# utils

## andThen

**Signature**

```ts
export declare const andThen: <E2, B>(that: Either<E2, B>) => <E1, _>(self: Either<E1, _>) => Either<E2 | E1, B>
```

Added in v1.0.0

## ap

**Signature**

```ts
export declare const ap: <E2, A>(fa: Either<E2, A>) => <E1, B>(self: Either<E1, (a: A) => B>) => Either<E2 | E1, B>
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: <B, E2, C>(
  bfc: (b: B) => Either<E2, C>
) => <A, E1>(afb: (a: A) => Either<E1, B>) => (a: A) => Either<E2 | E1, C>
```

Added in v1.0.0

## elem

Tests whether a value is a member of a `Either`.

**Signature**

```ts
export declare const elem: <B>(b: B) => <E, A>(self: Either<E, A>) => boolean
```

Added in v1.0.0

## exists

Returns `false` if `Left` or returns the Either of the application of the given predicate to the `Right` value.

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => <E>(self: Either<E, A>) => boolean
```

**Example**

```ts
import * as E from '@fp-ts/data/Either'

const f = E.exists((n: number) => n > 2)

assert.strictEqual(f(E.left('a')), false)
assert.strictEqual(f(E.right(1)), false)
assert.strictEqual(f(E.right(3)), true)
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <E1, E2, A>(self: Either<E1, Either<E2, A>>) => Either<E1 | E2, A>
```

Added in v1.0.0

## product

**Signature**

```ts
export declare const product: <E2, B>(
  that: Either<E2, B>
) => <E1, A>(self: Either<E1, A>) => Either<E2 | E1, readonly [A, B]>
```

Added in v1.0.0

## productAll

**Signature**

```ts
export declare const productAll: <E, A>(collection: Iterable<Either<E, A>>) => Either<E, readonly A[]>
```

Added in v1.0.0

## productFlatten

**Signature**

```ts
export declare const productFlatten: <E2, B>(
  that: Either<E2, B>
) => <E1, A extends readonly any[]>(self: Either<E1, A>) => Either<E2 | E1, readonly [...A, B]>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <R extends Record<string, Either<any, any>>>(
  r: R
) => Either<
  [R[keyof R]] extends [Either<infer E, any>] ? E : never,
  { readonly [K in keyof R]: [R[K]] extends [Either<any, infer A>] ? A : never }
>
```

Added in v1.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, E2, _>(f: (a: A) => Either<E2, _>) => <E1>(self: Either<E1, A>) => Either<E2 | E1, A>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <T extends readonly Either<any, any>[]>(
  ...tuple: T
) => Either<
  [T[number]] extends [Either<infer E, any>] ? E : never,
  Readonly<{ [I in keyof T]: [T[I]] extends [Either<any, infer A>] ? A : never }>
>
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: Either<never, void>
```

Added in v1.0.0
