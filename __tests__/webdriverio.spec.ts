import TestEnvironment from "../TestEnvironment";
import CalculatorPage from '../Pages/CalculatorPage'
import { PageObject, By2 } from "selenium-appium"
const path = require('path')
const wdio = require('webdriverio')
const fs = require('fs')

const GifCamID = path.resolve(__dirname, '../GifCam.exe')

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
    it('GifCam', async () => {
        await client.$('//*[@Name="Frame"]').click()
        await client.$('//*[@Name="Edit"]').click()

    })
    it('close session', async () => {
        await client.deleteSession()
    })
})