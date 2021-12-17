import TestEnvironment from "../TestEnvironment";
import CalculatorPage from '../Pages/CalculatorPage'
import { PageObject, By2 } from "selenium-appium"
beforeAll(async () => {
    return await TestEnvironment.setup();;
})

afterAll(() => {
    return TestEnvironment.teardown();
})

describe('Use PageObject', () => {
    beforeEach(() => {
        // CalculatorPage.clear();
    })
    test('click', async () => {
        // await By2.nativeXpath('//*[@Name="Frame"]').click()
        await By2.nativeXpath('//*[@Name="Rec"]').click()
        await By2.nativeXpath('//*[@Name="Stop"]').click()
    })
    test.skip('Plus', async () => {
        await CalculatorPage.waitForPageLoaded();
        expect(await CalculatorPage.plus('11', '12')).toBe('23');
    })

    test.skip('Minus', async () => {
        await CalculatorPage.waitForPageLoaded();
        expect(await CalculatorPage.minus('11', '12')).toBe('-1');
    })

    test.skip('Multiply', async () => {
        await CalculatorPage.waitForPageLoaded();
        expect(await CalculatorPage.multiply('11', '12')).toBe('132');
    })

    test.skip('Divid', async () => {
        await CalculatorPage.waitForPageLoaded();
        expect(await CalculatorPage.divide('144', '12')).toBe('12');
    })
})