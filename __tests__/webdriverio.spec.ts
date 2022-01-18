import TestEnvironment from "../TestEnvironment";
import CalculatorPage from '../Pages/CalculatorPage'
import { iterator } from "core-js/fn/symbol";
const path = require('path')
const wdio = require('webdriverio')
const fs = require('fs')

const GifCamID = path.resolve(__dirname, './alphabiz/electron/Alphabiz-win32-x64/Alphabiz.exe')
// 'C:/electron/Alphabiz-win32-x64/Alphabiz.exe'
// 'C:/Program Files (x86)/AccessibilityInsights/1.1/AccessibilityInsights.exe'
// 'C:/Users/alphabiz/Downloads/crystaldiskinfo8_12_7/DiskInfo64.exe'
// path.resolve(__dirname, '../XYplorerPortable/XYplorerPortable.exe')
// path.resolve(__dirname, '../HD Tune Pro5.75/HD Tune Pro5.75.exe')
// path.resolve(__dirname, '../WinAppDriverUIRecorder/WinAppDriverUiRecorder.exe')
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
        await client.$("//SplitButton[@ClassName=\"TButton\"][@Name=\"Rec\"]").click()
        await client.$('//*[@Name="Save"]').click()
        await sleep(2000)
    })
    it.skip('XYplorer', async () => {
        await client.$('//*[@Name="Edit"]').click()
        await sleep(2000)
    })
    it.skip('WinAppDriverUi', async () => {
        await client.$('//*[@Name="Record"]').click()
        await client.$('//*[@Name="C# Code"]').click()
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
    it.skip('HD Tune Pro5.75', async () => {
        await client.$('//*[@Name="\u9000\u51fa"]').click()
        await sleep(2000)
    })
    it.skip('AccessibilityInsights', async () => {
        client.saveScreenshot('output/screenshot1.png')
        if (await client.$('//*[@Name="We need your help"]').isDisplayed()) {
            await client.$('//*[@Name="OK"]').click()
        }
        await client.$('//*[@Name="Get Started"]').click()
        await sleep(3000)
        client.saveScreenshot('output/screenshot2.png')
        await client.$('//Image[@ClassName="FabricIconControl"][@Name="Photo"]').click()
        await client.$('//Image[@ClassName="FabricIconControl"][@Name="Pause"]').click()
        await client.$('//Button[@AutomationId="MainWinSettingsButton"]/Text[@ClassName="TextBlock"][@Name="_c"]').click()
        await sleep(2000)
    })
    it('Alphabiz', async () => {
        await sleep(5000)
        if (await client.$('//*[@Name="Windows Security Alert"]').isDisplayed()) {
            await client.$('//*[@Name="Allow access"]').click()
          }
        await client.saveScreenshot('output/screenshot1.png')
        await client.$('//*[@Name="Alphabiz"]').click()
        await client.$('//Button[@Name="Maximize"]').click()
        await client.saveScreenshot('output/screenshot2.png')
        await client.$('//Text[@Name="Alphabiz"]').click()
        await client.$('//*[@Name="DOWNLOAD"]').click()
        await client.saveScreenshot('output/screenshot3.png')
        await sleep(2000)
    })
    it('close session', async () => {
        await client.deleteSession()
    })
})