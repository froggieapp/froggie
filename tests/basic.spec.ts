import { test, expect } from '@playwright/test';
import { FroggiePage } from './froggiePage';

let froggie: FroggiePage

test.beforeAll(async () => {
  froggie = new FroggiePage()
  await froggie.isReady
})

test.afterAll(async () => {
  await froggie.cleanup()
})

test('has title', async () => {
  await expect(froggie.appWindow).toHaveTitle('Froggie');
});