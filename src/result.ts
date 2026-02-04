import { none, some, type Option } from '@/index'

class BaseResult<T, E> {
	public isOk(): this is Ok<T, E> {
		return 'data' in this
	}

	public isErr(): this is Err<T, E> {
		return 'err' in this
	}

	public unwrap(): T {
		if (this.isOk()) {
			return this.data
		} else {
			throw (this as unknown as Err<T, E>).err
		}
	}

	public expect(msg: string): T {
		if (this.isOk()) {
			return this.data
		} else {
			throw new Error(msg)
		}
	}

	public unwrapOr(def: T): T {
		if (this.isOk()) {
			return this.data
		} else {
			return def
		}
	}

	public unwrapOrElse(getDef: () => T): T {
		if (this.isOk()) {
			return this.data
		} else {
			return getDef()
		}
	}

	public map<G>(func: (t: T) => G): Result<G, E> {
		if (this.isOk()) {
			return ok(func(this.data))
		} else {
			return err((this as unknown as Err<T, E>).err)
		}
	}

	public match<R = void>(whenOk: (t: T) => R, whenErr: (e: E) => R) {
		if (this.isOk()) {
			return whenOk(this.data)
		} else {
			return whenErr((this as unknown as Err<T, E>).err)
		}
	}

	public toOption(): Option<T> {
		if (this.isOk()) {
			return some(this.data)
		} else {
			return none()
		}
	}
}

export class Ok<T, E> extends BaseResult<T, E> {
	constructor(public data: T) {
		super()
	}
}

export class Err<T, E> extends BaseResult<T, E> {
	constructor(public err: E) {
		super()
	}
}

export type Result<T, E = Error> = Ok<T, E> | Err<T, E>

export function ok<T, E = Error>(data: T): Ok<T, E> {
	return new Ok(data)
}

export function err<T, E = Error>(err: E): Err<T, E> {
	return new Err(err)
}

export function wrap<T>(func: () => T): Result<T, Error> {
	try {
		return ok(func())
	} catch (e) {
		return err(e as Error)
	}
}
