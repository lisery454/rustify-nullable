# Rustify Nullable

This is a custom-made `Result<T, E>` and `Option<T>` library.

There are many similar libraries on npm; this is a version I wrote myself.

It's purely for learning purposes.

```ts
let o: Option<number> = some(5)
console.log(o.isSome()) // true
console.log(o.unwrap()) // 5
let a = o.match(
	(t) => 'some',
	() => 'none',
)

let r: Result<number> = err(new Error())
console.log(r.unwrapOrElse(() => 5)) // 5
```
