import * as E from "@fp-ts/data/Either"
import { pipe } from "@fp-ts/data/Function"
import * as _ from "@fp-ts/data/Option"
import * as ReadonlyArray from "@fp-ts/data/ReadonlyArray"
import * as String from "@fp-ts/data/String"
import { deepStrictEqual, double } from "@fp-ts/data/test/util"

const p = (n: number): boolean => n > 2

describe.concurrent("Option", () => {
  it("instances and derived exports", () => {
    expect(_.Invariant).exist
    expect(_.imap).exist
    expect(_.tupled).exist
    expect(_.bindTo).exist

    expect(_.Covariant).exist
    expect(_.map).exist
    expect(_.let).exist
    expect(_.flap).exist
    expect(_.as).exist
    expect(_.asUnit).exist

    expect(_.Of).exist
    expect(_.of).exist
    expect(_.Do).exist

    expect(_.Pointed).exist

    expect(_.FlatMap).exist
    expect(_.flatMap).exist
    expect(_.flatten).exist
    expect(_.andThen).exist
    expect(_.composeKleisliArrow).exist

    expect(_.Chainable).exist
    expect(_.bind).exist
    expect(_.tap).exist
    expect(_.andThenDiscard).exist

    expect(_.Monad).exist

    expect(_.SemiProduct).exist
    expect(_.product).exist
    expect(_.productMany).exist

    expect(_.Product).exist
    expect(_.productAll).exist
    expect(_.tuple).exist
    expect(_.struct).exist

    expect(_.SemiApplicative).exist
    expect(_.getFirstNoneSemigroup).exist // liftSemigroup
    expect(_.lift2).exist
    expect(_.lift3).exist
    expect(_.ap).exist
    expect(_.andThenDiscard).exist
    expect(_.andThen).exist

    expect(_.Applicative).exist
    expect(_.getFirstNoneMonoid).exist // liftMonoid

    expect(_.SemiCoproduct).exist
    expect(_.getFirstSomeSemigroup).exist // getSemigroup
    expect(_.coproduct).exist
    expect(_.coproductEither).exist

    expect(_.Coproduct).exist
    expect(_.zero).exist
    expect(_.coproductAll).exist

    expect(_.SemiAlternative).exist

    expect(_.Alternative).exist

    expect(_.Foldable).exist

    expect(_.Traversable).exist
    expect(_.traverse).exist
    expect(_.sequence).exist
    expect(_.traverseTap).exist

    expect(_.Compactable).exist
    expect(_.compact).exist
    expect(_.separate).exist

    expect(_.Filterable).exist
    expect(_.filterMap).exist
    expect(_.filter).exist
  })

  it("toRefinement", () => {
    const f = (
      s: string | number
    ): _.Option<string> => (typeof s === "string" ? _.some(s) : _.none)
    const isString = _.toRefinement(f)
    deepStrictEqual(isString("s"), true)
    deepStrictEqual(isString(1), false)
    type A = { readonly type: "A" }
    type B = { readonly type: "B" }
    type C = A | B
    const isA = _.toRefinement<C, A>((c) => (c.type === "A" ? _.some(c) : _.none))
    deepStrictEqual(isA({ type: "A" }), true)
    deepStrictEqual(isA({ type: "B" }), false)
  })

  it("isOption", () => {
    deepStrictEqual(pipe(_.some(1), _.isOption), true)
    deepStrictEqual(pipe(_.none, _.isOption), true)
    deepStrictEqual(pipe(E.right(1), _.isOption), false)
  })

  it("firstSomeOf", () => {
    deepStrictEqual(pipe(_.some(1), _.firstSomeOf([])), _.some(1))
    deepStrictEqual(pipe(_.none, _.firstSomeOf([])), _.none)
    deepStrictEqual(
      pipe(_.none, _.firstSomeOf([_.none, _.none, _.none, _.some(1)])),
      _.some(1)
    )
    deepStrictEqual(
      pipe(_.none, _.firstSomeOf([_.none, _.none, _.none])),
      _.none
    )
  })

  it("catchAll", () => {
    deepStrictEqual(pipe(_.some(1), _.catchAll(() => _.some(2))), _.some(1))
    deepStrictEqual(pipe(_.some(1), _.catchAll(() => _.none)), _.some(1))
    deepStrictEqual(pipe(_.none, _.catchAll(() => _.some(1))), _.some(1))
    deepStrictEqual(pipe(_.none, _.catchAll(() => _.none)), _.none)
  })

  it("orElseEither", () => {
    expect(pipe(_.some(1), _.orElseEither(_.some(2)))).toEqual(_.some(E.left(1)))
    expect(pipe(_.some(1), _.orElseEither(_.none))).toEqual(_.some(E.left(1)))
    expect(pipe(_.none, _.orElseEither(_.some(2)))).toEqual(_.some(E.right(2)))
    expect(pipe(_.none, _.orElseEither(_.none))).toEqual(_.none)
  })

  it("orElseSucceed", () => {
    deepStrictEqual(pipe(_.some(1), _.orElseSucceed(() => 2)), _.some(1))
    deepStrictEqual(pipe(_.none, _.orElseSucceed(() => 2)), _.some(2))
  })

  it("inspectSome", () => {
    const log: Array<number> = []
    pipe(
      _.some(1),
      _.inspectSome(() => log.push(1))
    )
    pipe(
      _.none,
      _.inspectSome(() => log.push(2))
    )
    deepStrictEqual(
      log,
      [1]
    )
  })

  it("inspectNone", () => {
    const log: Array<number> = []
    pipe(
      _.some(1),
      _.inspectNone(() => log.push(1))
    )
    pipe(
      _.none,
      _.inspectNone(() => log.push(2))
    )
    deepStrictEqual(
      log,
      [2]
    )
  })

  it("getOrThrow", () => {
    expect(pipe(_.some(1), _.getOrThrow(() => new Error("e")))).toEqual(1)
    expect(() => pipe(_.none, _.getOrThrow(() => new Error("e")))).toThrow(
      new Error("e")
    )
  })

  it("of", () => {
    deepStrictEqual(_.of(1), _.some(1))
  })

  it("zero", () => {
    deepStrictEqual(_.zero(), _.none)
  })

  it("coproductAll", () => {
    deepStrictEqual(_.coproductAll([]), _.none)
    deepStrictEqual(_.coproductAll([_.some(1)]), _.some(1))
    deepStrictEqual(_.coproductAll([_.none, _.some(1)]), _.some(1))
    deepStrictEqual(_.coproductAll([_.some(1), _.some(2)]), _.some(1))
  })

  it("unit", () => {
    deepStrictEqual(_.unit, _.some(undefined))
  })

  it("product", () => {
    deepStrictEqual(pipe(_.none, _.product(_.none)), _.none)
    deepStrictEqual(pipe(_.some(1), _.product(_.none)), _.none)
    deepStrictEqual(pipe(_.none, _.product(_.some("a"))), _.none)
    deepStrictEqual(
      pipe(_.some(1), _.product(_.some("a"))),
      _.some([1, "a"] as const)
    )
  })

  it("productMany", () => {
    deepStrictEqual(pipe(_.none, _.SemiProduct.productMany([])), _.none)
    deepStrictEqual(pipe(_.some(1), _.SemiProduct.productMany([])), _.some([1] as const))
    deepStrictEqual(
      pipe(_.some(1), _.SemiProduct.productMany([_.none as _.Option<number>])),
      _.none
    )
    deepStrictEqual(
      pipe(_.some(1), _.SemiProduct.productMany([_.some(2)])),
      _.some([1, 2] as const)
    )
  })

  it("productAll", () => {
    const productAll = _.Applicative.productAll
    deepStrictEqual(productAll([]), _.some([]))
  })

  it("SemiCoproduct", () => {
    const coproduct = _.SemiCoproduct.coproduct
    deepStrictEqual(pipe(_.none, coproduct(_.none)), _.none)
    deepStrictEqual(pipe(_.none, coproduct(_.some(2))), _.some(2))
    deepStrictEqual(pipe(_.some(1), coproduct(_.none)), _.some(1))
    deepStrictEqual(pipe(_.some(1), coproduct(_.some(2))), _.some(1))

    const coproductMany = _.SemiCoproduct.coproductMany
    deepStrictEqual(pipe(_.none, coproductMany([])), _.none)
    deepStrictEqual(pipe(_.none, coproductMany([_.none])), _.none)
    deepStrictEqual(pipe(_.none, coproductMany([_.some(2)])), _.some(2))
    deepStrictEqual(pipe(_.some(1), coproductMany([])), _.some(1))
    deepStrictEqual(pipe(_.some(1), coproductMany([_.none as _.Option<number>])), _.some(1))
    deepStrictEqual(pipe(_.some(1), coproductMany([_.some(2)])), _.some(1))
  })

  it("fromIterable", () => {
    deepStrictEqual(_.fromIterable([]), _.none)
    deepStrictEqual(_.fromIterable(["a"]), _.some("a"))
  })

  it("map", () => {
    deepStrictEqual(pipe(_.some(2), _.map(double)), _.some(4))
    deepStrictEqual(pipe(_.none, _.map(double)), _.none)
  })

  it("flatMap", () => {
    const f = (n: number) => _.some(n * 2)
    const g = () => _.none
    deepStrictEqual(pipe(_.some(1), _.flatMap(f)), _.some(2))
    deepStrictEqual(pipe(_.none, _.flatMap(f)), _.none)
    deepStrictEqual(pipe(_.some(1), _.flatMap(g)), _.none)
    deepStrictEqual(pipe(_.none, _.flatMap(g)), _.none)
  })

  it("orElse", () => {
    const assertAlt = (
      a: _.Option<number>,
      b: _.Option<number>,
      expected: _.Option<number>
    ) => {
      deepStrictEqual(pipe(a, _.orElse(b)), expected)
    }
    assertAlt(_.some(1), _.some(2), _.some(1))
    assertAlt(_.some(1), _.none, _.some(1))
    assertAlt(_.none, _.some(2), _.some(2))
    assertAlt(_.none, _.none, _.none)
  })

  it("compact", () => {
    deepStrictEqual(_.compact(_.none), _.none)
    deepStrictEqual(_.compact(_.some(_.none)), _.none)
    deepStrictEqual(_.compact(_.some(_.some("123"))), _.some("123"))
  })

  it("filterMap", () => {
    const f = (n: number) => (p(n) ? _.some(n + 1) : _.none)
    deepStrictEqual(pipe(_.none, _.filterMap(f)), _.none)
    deepStrictEqual(pipe(_.some(1), _.filterMap(f)), _.none)
    deepStrictEqual(pipe(_.some(3), _.filterMap(f)), _.some(4))
  })

  it("traverse", () => {
    deepStrictEqual(
      pipe(
        _.some("hello"),
        _.traverse(ReadonlyArray.Applicative)(() => [])
      ),
      []
    )
    deepStrictEqual(
      pipe(
        _.some("hello"),
        _.traverse(ReadonlyArray.Applicative)((s) => [s.length])
      ),
      [_.some(5)]
    )
    deepStrictEqual(
      pipe(
        _.none,
        _.traverse(ReadonlyArray.Applicative)((s) => [s])
      ),
      [_.none]
    )
  })

  it("toEither", () => {
    deepStrictEqual(pipe(_.none, _.toEither(() => "e")), E.left("e"))
    deepStrictEqual(pipe(_.some(1), _.toEither(() => "e")), E.right(1))
  })

  it("match", () => {
    const f = () => "none"
    const g = (s: string) => `some${s.length}`
    const match = _.match(f, g)
    deepStrictEqual(match(_.none), "none")
    deepStrictEqual(match(_.some("abc")), "some3")
  })

  it("getOrElse", () => {
    deepStrictEqual(pipe(_.some(1), _.getOrElse(() => 0)), 1)
    deepStrictEqual(pipe(_.none, _.getOrElse(() => 0)), 0)
  })

  it("getOrNull", () => {
    deepStrictEqual(_.getOrNull(_.none), null)
    deepStrictEqual(_.getOrNull(_.some(1)), 1)
  })

  it("getOrUndefined", () => {
    deepStrictEqual(_.getOrUndefined(_.none), undefined)
    deepStrictEqual(_.getOrUndefined(_.some(1)), 1)
  })

  it("liftOrder", () => {
    const OS = _.liftOrder(String.Order)
    deepStrictEqual(pipe(_.none, OS.compare(_.none)), 0)
    deepStrictEqual(pipe(_.some("a"), OS.compare(_.none)), 1)
    deepStrictEqual(pipe(_.none, OS.compare(_.some("a"))), -1)
    deepStrictEqual(pipe(_.some("a"), OS.compare(_.some("a"))), 0)
    deepStrictEqual(pipe(_.some("a"), OS.compare(_.some("b"))), -1)
    deepStrictEqual(pipe(_.some("b"), OS.compare(_.some("a"))), 1)
  })

  it("flatMapNullable", () => {
    interface X {
      readonly a?: {
        readonly b?: {
          readonly c?: {
            readonly d: number
          }
        }
      }
    }
    const x1: X = { a: {} }
    const x2: X = { a: { b: {} } }
    const x3: X = { a: { b: { c: { d: 1 } } } }
    deepStrictEqual(
      pipe(
        _.fromNullable(x1.a),
        _.flatMapNullable((x) => x.b),
        _.flatMapNullable((x) => x.c),
        _.flatMapNullable((x) => x.d)
      ),
      _.none
    )
    deepStrictEqual(
      pipe(
        _.fromNullable(x2.a),
        _.flatMapNullable((x) => x.b),
        _.flatMapNullable((x) => x.c),
        _.flatMapNullable((x) => x.d)
      ),
      _.none
    )
    deepStrictEqual(
      pipe(
        _.fromNullable(x3.a),
        _.flatMapNullable((x) => x.b),
        _.flatMapNullable((x) => x.c),
        _.flatMapNullable((x) => x.d)
      ),
      _.some(1)
    )
  })

  it("getMonoid", () => {
    const M = _.getMonoid(String.Semigroup)
    deepStrictEqual(pipe(_.none, M.combine(_.none)), _.none)
    deepStrictEqual(pipe(_.none, M.combine(_.some("a"))), _.some("a"))
    deepStrictEqual(pipe(_.some("a"), M.combine(_.none)), _.some("a"))
    deepStrictEqual(pipe(_.some("b"), M.combine(_.some("a"))), _.some("ba"))
    deepStrictEqual(pipe(_.some("a"), M.combine(_.some("b"))), _.some("ab"))

    deepStrictEqual(pipe(_.some("a"), M.combineMany([_.some("b")])), _.some("ab"))
    deepStrictEqual(pipe(_.none, M.combineMany([_.some("b")])), _.some("b"))
    deepStrictEqual(pipe(_.some("a"), M.combineMany([_.none])), _.some("a"))

    deepStrictEqual(pipe(M.combineAll([])), _.none)
    deepStrictEqual(pipe(M.combineAll([_.some("a")])), _.some("a"))
    deepStrictEqual(pipe(M.combineAll([_.some("a"), _.some("b")])), _.some("ab"))
    deepStrictEqual(pipe(M.combineAll([_.some("a"), _.none])), _.some("a"))
  })

  it("fromNullable", () => {
    deepStrictEqual(_.fromNullable(2), _.some(2))
    deepStrictEqual(_.fromNullable(null), _.none)
    deepStrictEqual(_.fromNullable(undefined), _.none)
  })

  it("liftPredicate", () => {
    const f = _.liftPredicate(p)
    deepStrictEqual(f(1), _.none)
    deepStrictEqual(f(3), _.some(3))

    type Direction = "asc" | "desc"
    const parseDirection = _.liftPredicate((s: string): s is Direction =>
      s === "asc" || s === "desc"
    )
    deepStrictEqual(parseDirection("asc"), _.some("asc"))
    deepStrictEqual(parseDirection("foo"), _.none)
  })

  it("elem", () => {
    deepStrictEqual(pipe(_.none, _.elem(2)), false)
    deepStrictEqual(pipe(_.some(2), _.elem(2)), true)
    deepStrictEqual(pipe(_.some(2), _.elem(1)), false)
  })

  it("isNone", () => {
    deepStrictEqual(_.isNone(_.none), true)
    deepStrictEqual(_.isNone(_.some(1)), false)
  })

  it("isSome", () => {
    deepStrictEqual(_.isSome(_.none), false)
    deepStrictEqual(_.isSome(_.some(1)), true)
  })

  it("exists", () => {
    const predicate = (a: number) => a === 2
    deepStrictEqual(pipe(_.none, _.exists(predicate)), false)
    deepStrictEqual(pipe(_.some(1), _.exists(predicate)), false)
    deepStrictEqual(pipe(_.some(2), _.exists(predicate)), true)
  })

  it("fromThrowable", () => {
    deepStrictEqual(
      _.fromThrowable(() => JSON.parse("2")),
      _.some(2)
    )
    deepStrictEqual(
      _.fromThrowable(() => JSON.parse("(")),
      _.none
    )
  })

  it("fromEither", () => {
    deepStrictEqual(_.fromEither(E.right(1)), _.some(1))
    deepStrictEqual(_.fromEither(E.left("e")), _.none)
  })

  it("do notation", () => {
    deepStrictEqual(
      pipe(
        _.some(1),
        _.bindTo("a"),
        _.bind("b", () => _.some("b"))
      ),
      _.some({ a: 1, b: "b" })
    )
  })

  it("andThenBind", () => {
    deepStrictEqual(
      pipe(_.some(1), _.bindTo("a"), _.andThenBind("b", _.some("b"))),
      _.some({ a: 1, b: "b" })
    )
  })

  it("productFlatten", () => {
    deepStrictEqual(
      pipe(_.some(1), _.tupled, _.productFlatten(_.some("b"))),
      _.some([1, "b"] as const)
    )
  })

  it("liftNullable", () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : null))
    deepStrictEqual(f(1), _.some(1))
    deepStrictEqual(f(-1), _.none)
  })

  it("liftThrowable", () => {
    const f = _.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error("empty string")
    })
    deepStrictEqual(f("a"), _.some(1))
    deepStrictEqual(f(""), _.none)
  })

  it("liftEither", () => {
    const f = _.liftEither((n: number) => (n > 0 ? E.right(n) : E.left("e")))
    deepStrictEqual(f(1), _.some(1))
    deepStrictEqual(f(-1), _.none)
  })

  it("flatMapEither", () => {
    const f = _.flatMapEither((n: number) => (n > 0 ? E.right(n) : E.left("e")))
    deepStrictEqual(pipe(_.none, f), _.none)
    deepStrictEqual(pipe(_.some(0), f), _.none)
    deepStrictEqual(pipe(_.some(1), f), _.some(1))
  })

  it("guard", () => {
    deepStrictEqual(
      pipe(
        _.Do,
        _.bind("x", () => _.some("a")),
        _.bind("y", () => _.some("a")),
        _.filter(({ x, y }) => x === y)
      ),
      _.some({ x: "a", y: "a" })
    )
    deepStrictEqual(
      pipe(
        _.Do,
        _.bind("x", () => _.some("a")),
        _.bind("y", () => _.some("b")),
        _.filter(({ x, y }) => x === y)
      ),
      _.none
    )
  })
})
