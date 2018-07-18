// @ts-ignore
import supertest from 'supertest'
import { test } from 'ava'

import { app } from '../lib/app'

async function routeTester(t, path) {
	const res = await supertest(app)
		.get(path)
		.expect('Content-Type', /html/)
		.expect(200)

	// TODO: make feed more reliable
	// t.snapshot(res.text)

	t.pass()

	return res
}

test('index', t => routeTester(t, '/'))
test('about', t => routeTester(t, '/about'))
test('portfolio', t => routeTester(t, '/portfolio'))
test('feed', t => routeTester(t, '/feed'))
test('contact', t => routeTester(t, '/contact'))
test('status', t => routeTester(t, '/status'))
