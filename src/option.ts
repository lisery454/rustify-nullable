class BaseOption<T> {
	public isSome(): this is Some<T> {
		return 'data' in this
	}

	public isNone(): this is None<T> {
		return !this.isSome()
	}

	public unwrap(): T {
		return this.expect('option is none, can not unwarp.')
	}

	public expect(msg: string): T {
		if (this.isSome()) {
			return this.data
		} else {
			throw new Error(msg)
		}
	}

	public unwrapOr(def: T): T {
		if (this.isSome()) {
			return this.data
		} else {
			return def
		}
	}

	public unwrapOrElse(getDef: () => T): T {
		if (this.isSome()) {
			return this.data
		} else {
			return getDef()
		}
	}

	public map<G>(func: (t: T) => G): Option<G> {
		if (this.isSome()) {
			return some(func(this.data))
		} else {
			return none()
		}
	}

	public match<R = void>(whenSome: (t: T) => R, whenNone: () => R) {
		if (this.isSome()) {
			return whenSome(this.data)
		} else {
			return whenNone()
		}
	}
}

export class Some<T> extends BaseOption<T> {
	constructor(public data: T) {
		super()
	}
}

export class None<T> extends BaseOption<T> {
	constructor() {
		super()
	}
}

export type Option<T> = Some<T> | None<T>

export function some<T>(data: T): Some<T> {
	return new Some(data)
}

export function none<T>(): None<T> {
	return new None()
}
