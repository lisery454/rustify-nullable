import { err, ok, wrap, type Result } from '@/result'

describe('result', () => {
	test('inside value', () => {
		let o: Result<number> = ok(3)
		expect(o.data).toBe(3)
		let e = new Error()
		o = err(e)
		expect(o.err).toBe(e)
	})

	test('isOk', () => {
		let o: Result<number> = ok(5)
		expect(o.isOk()).toBe(true)
		o = err(new Error())
		expect(o.isOk()).toBe(false)
	})

	test('isNone', () => {
		let o: Result<number> = ok(5)
		expect(o.isErr()).toBe(false)
		o = err(new Error())
		expect(o.isErr()).toBe(true)
	})

	test('unwrap', () => {
		let o: Result<number> = ok(5)
		expect(o.unwrap()).toBe(5)
		o = err(new Error())
		expect(() => o.unwrap()).toThrow(Error)
	})

	test('expect', () => {
		let o: Result<number> = ok(5)
		expect(o.expect('aaa')).toBe(5)
		o = err(new Error())
		expect(() => o.expect('aaa')).toThrow('aaa')
	})

	test('unwrapOr', () => {
		let o: Result<number> = ok(5)
		expect(o.unwrapOr(0)).toBe(5)
		o = err(new Error())
		expect(o.unwrapOr(0)).toBe(0)
	})

	test('unwrapOrElse', () => {
		let o: Result<number> = ok(5)
		expect(o.unwrapOrElse(() => 0)).toBe(5)
		o = err(new Error())
		expect(o.unwrapOrElse(() => 0)).toBe(0)
	})

	test('map', () => {
		let o: Result<number> = ok(5)
		let a = o.map((t) => t.toString())
		expect(a.isOk()).toBe(true)
		expect(a.unwrap()).toBe('5')
		o = err(new Error())
		a = o.map((t) => t.toString())
		expect(a.isOk()).toBe(false)
	})

	test('match', () => {
		let o: Result<number> = ok(5)
		let a = o.match(
			(t) => 'ok',
			(e) => 'err',
		)
		expect(a).toBe('ok')
		o = err(new Error())
		a = o.match(
			(t) => 'ok',
			(e) => 'err',
		)
		expect(a).toBe('err')
	})

	test('wrap', () => {
		let f1 = () => {
			return 5
		}

		let a = wrap(f1)
		expect(a.isOk()).toBe(true)
		expect(a.unwrap()).toBe(5)

		let f2 = (): number => {
			throw new Error()
		}

		let b = wrap(f2)
		expect(b.isOk()).toBe(false)
	})

	test('toOption', () => {
		let a: Result<number> = ok(1)
		let b = a.toOption()
		expect(b.isSome()).toBe(true)
		expect(b.unwrap()).toBe(1)
		a = err(new Error())
		b = a.toOption()
		expect(b.isNone()).toBe(true)
	})
})
