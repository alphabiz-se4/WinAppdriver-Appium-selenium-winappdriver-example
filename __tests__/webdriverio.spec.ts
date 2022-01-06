import TestEnvironment from "../TestEnvironment";
import CalculatorPage from '../Pages/CalculatorPage'
import { PageObject, By2 } from "selenium-appium"
const path = require('path')
const wdio = require('webdriverio')
const fs = require('fs')

const GifCamID = path.resolve(__dirname, '../WinAppDriverUIRecorder/WinAppDriverUiRecorder.exe')
// path.resolve(__dirname, '../GifCam.exe')
const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        browserName: '',
        platformName: 'Windows',
        deviceName: 'WindowsPC',
        appWaitDuration: 60000,
        createSessionTimeout: 60000,
        app: GifCamID
    },
    logLevel: 'error'
    // afterTest: function (test) {
    // if (test.error !== undefined) {
    //   const name = 'ERROR-' + Date.now()
    //   browser.saveScreenshot('./errorShots/' + name + '.png')
    // }
    // }
}
let client
function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
jest.setTimeout(60000 * 15)
describe('Use PageObject', () => {
    it('build', async () => {
        client = await wdio.remote(opts)
        expect('1').toBe('1')
    }, 60000)

    it('client title', async () => {
        const title = await client.getTitle()
        console.log(title)
        // expect(title).toBe('Alphabiz')
    })

    it('client screenshot', async () => {
        // 判断该路径是否存在，若不存在，则创建
        var dir = './output/'
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        client.saveScreenshot('output/screenshot.png')

    })
    it.skip('GifCam', async () => {
        // await client.$('//*[@Name="GifCam"]').click()
        await sleep(2000)
        await client.$('//*[@Name="Rec"]').click()

    })
    it('WinAppDriverUi', async () => {
        await client.$('//*[@Name="Record"]').click()
        await client.$('//*[@Name="Clear"]').click()
    })
    it.skip('txt', async () => {
        await client.$('//*[@Name="Text Editor"]').addValue('aabbcc')
        await sleep(2000)
        await client.$('//*[@Name="Edit"]').click()
        await client.$('//Button[@Name="Line down"]').click()
        await sleep(2000)
        await client.$('//Button[@Name="Close"]').click()
        await client.$('//Button[@Name="Save"]').click()

    })
    it('close session', async () => {
        await client.deleteSession()
    })
})