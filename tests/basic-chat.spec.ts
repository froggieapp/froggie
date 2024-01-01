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

test('can insert emotes', async () => {
  if (!process.env.TEST_CHANNEL) throw new Error('Please specify the TEST_CHANNEL env variable')
  await froggie.appWindow.getByTestId('add-channel-modal-btn').click()
  await froggie.appWindow.getByTestId('input-channel-name').fill(process.env.TEST_CHANNEL)
  await froggie.appWindow.getByTestId('add-channel-btn').click()

  await froggie.appWindow.getByTestId('emote-picker-open-btn').click()
  await froggie.appWindow.waitForTimeout(2000);
  const emotePicker = await froggie.appWindow.getByTestId('emote-picker-container')
  await expect(emotePicker).toBeVisible()
  const firstEmoteBtn = await froggie.appWindow.locator('[data-emojibtn]').first()
  await firstEmoteBtn.click()

  await froggie.appWindow.isVisible('.fgr-MessageInput-emote')
  const emoteInInput = await froggie.appWindow.locator('.fgr-MessageInput-emote')
  await expect(emoteInInput).toHaveScreenshot('test-basic-emote.png');

  const messageInput = await froggie.appWindow.getByTestId('message-input')
  await messageInput.focus()
  await messageInput.press('Backspace')
  await messageInput.pressSequentially('Hello World');
  await expect(messageInput).toContainText('Hello World')
  await messageInput.pressSequentially(' ez');

  const suggestion = await froggie.appWindow.getByTestId('suggestion').first()
  await expect(suggestion).toBeVisible()
  await messageInput.press(' ');
  await expect(suggestion).not.toBeVisible()
  await messageInput.pressSequentially('w w w w w w w w w');
  await expect(suggestion).toBeVisible()

  await messageInput.press('ArrowLeft')

  for (let i = 0; i < 100; i += 1) {
    await messageInput.press('ArrowLeft')
    await expect(suggestion).not.toBeVisible()
  }
  for (let i = 0; i < 10; i += 1) {
    await messageInput.press('ArrowRight')
    await expect(suggestion).not.toBeVisible()
  }
  await messageInput.press('Control+A')
  await messageInput.press('Backspace')
  await messageInput.pressSequentially('Froggie ez');
  await expect(suggestion).toBeVisible()
  const body = await froggie.appWindow.locator('body')
  const channelInfo = await froggie.appWindow.locator('.fgr-ChannelInfo')

  await expect(body).toHaveScreenshot(
    'test-suggestions.png',
    { maxDiffPixels: 200, animations: 'disabled', mask: [emotePicker, channelInfo] }
    );
});