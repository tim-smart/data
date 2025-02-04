/**
 * @since 1.0.0
 */
import type { LazyArg } from "@fp-ts/core/internal/Function"
import type { Either, Left, Right } from "@fp-ts/data/Either"
import * as option from "@fp-ts/data/internal/Option"
import type { Option } from "@fp-ts/data/Option"

/** @internal */
export const isEither = (u: unknown): u is Either<unknown, unknown> =>
  typeof u === "object" && u != null && "_tag" in u &&
  (u["_tag"] === "Left" || u["_tag"] === "Right")

/** @internal */
export const isLeft = <E, A>(ma: Either<E, A>): ma is Left<E> => ma._tag === "Left"

/** @internal */
export const isRight = <E, A>(ma: Either<E, A>): ma is Right<A> => ma._tag === "Right"

/** @internal */
export const left = <E>(e: E): Either<E, never> => ({ _tag: "Left", left: e })

/** @internal */
export const right = <A>(a: A): Either<never, A> => ({ _tag: "Right", right: a })

/** @internal */
export const getLeft = <E, A>(
  self: Either<E, A>
): Option<E> => (isRight(self) ? option.none : option.some(self.left))

/** @internal */
export const getRight = <E, A>(
  self: Either<E, A>
): Option<A> => (isLeft(self) ? option.none : option.some(self.right))

/** @internal */
export const fromNullable = <E>(onNullable: LazyArg<E>) =>
  <A>(a: A): Either<E, NonNullable<A>> =>
    a == null ? left(onNullable()) : right(a as NonNullable<A>)

/** @internal */
export const fromOption = <E>(onNone: () => E) =>
  <A>(fa: Option<A>): Either<E, A> => option.isNone(fa) ? left(onNone()) : right(fa.value)
