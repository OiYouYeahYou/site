// @ts-ignore
import supertest from 'supertest'
import { test } from 'ava'

import { app } from '../../lib/app'

async function routeTester(t, path) {
	const res = await supertest(app)
		.get('/api/vx/' + path)
		.expect('Content-Type', /html/)
		.expect(200)

	t.snapshot(res.text)

	t.pass()

	return res
}

test('index', t => routeTester(t, '/'))
