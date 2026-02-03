import { none, some, type Option } from '@/option'

describe('option', () => {
	test('some has a value inside', () => {
		let s = some(3)
		expect(s.data).toBe(3)
	})

	test('isSome', () => {
		let o: Option<number> = some(5)
		expect(o.isSome()).toBe(true)
		o = none()
		expect(o.isSome()).toBe(false)
	})

	test('isNone', () => {
		let o: Option<number> = some(5)
		expect(o.isNone()).toBe(false)
		o = none()
		expect(o.isNone()).toBe(true)
	})

	test('unwrap', () => {
		let o: Option<number> = some(5)
		expect(o.unwrap()).toBe(5)
		o = none()
		expect(o.unwrap).toThrow(Error)
	})

	test('expect', () => {
		let o: Option<number> = some(5)
		expect(o.expect('aaa')).toBe(5)
		o = none()
		expect(() => o.expect('aaa')).toThrow('aaa')
	})

	test('unwrapOr', () => {
		let o: Option<number> = some(5)
		expect(o.unwrapOr(0)).toBe(5)
		o = none()
		expect(o.unwrapOr(0)).toBe(0)
	})

	test('unwrapOrElse', () => {
		let o: Option<number> = some(5)
		expect(o.unwrapOrElse(() => 0)).toBe(5)
		o = none()
		expect(o.unwrapOrElse(() => 0)).toBe(0)
	})

	test('map', () => {
		let o: Option<number> = some(5)
		let a = o.map((t) => t.toString())
		expect(a.isSome()).toBe(true)
		expect(a.unwrap()).toBe('5')
		o = none()
		a = o.map((t) => t.toString())
		expect(a.isSome()).toBe(false)
	})

	test('match', () => {
		let o: Option<number> = some(5)
		let a = o.match(
			(t) => 'some',
			() => 'none',
		)
		expect(a).toBe('some')
		o = none()
		a = o.match(
			(t) => 'some',
			() => 'none',
		)
		expect(a).toBe('none')
	})
})
