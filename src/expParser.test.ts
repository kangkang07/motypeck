import { randomSelect, randomChar, isArray, makeNum, makeString, mockNumber, mockString } from "./expParser";

const lg = console.log


test('random select', () => {
    let set = new Set()
    for (let i = 0; i < 20; i++){
        set.add(randomSelect([2,4,5,'32','243']))
    }
    // 这里只是大概率会成功
    expect(set.size).toBeGreaterThan(3)
})
test('random char', () => {
    let set = new Set()

    for (let i = 0; i < 10; i++){
        set.add(randomChar())
    }
    expect(set.size).toBeGreaterThan(8)
})

test('check if a string is an array json', () => {
    expect(isArray('[]')).toBeTruthy()
    expect(isArray('{}')).toBeFalsy()
    expect(isArray('()')).toBeFalsy()
    expect(isArray('[aaa]')).toBeFalsy()
    expect(isArray('[2,4,"234"]')).toBeTruthy()
})

test('make number', () => {
    for (let i = 0; i < 100; i++){
        let v = makeNum(40, 80)
        expect(v).toBeLessThanOrEqual(80)
        expect(v).toBeGreaterThanOrEqual(40)
        let v2 = makeNum(44, 44)
        expect(v2).toEqual(44)
    }
})

test('make string', () => {
    for (let i = 0; i < 100; i++){
        
        let n = makeNum(1, 100)
        let n2 = makeNum(101,101)
        let s = makeString(n)
        expect(s.length).toEqual(n)
        s = makeString(n, n2)
        expect(s.length).toBeLessThanOrEqual(n2)
        expect(s.length).toBeGreaterThanOrEqual(n)


    }

})

describe('mock number', () => {
    test('const number', () => {
        expect(mockNumber('3')).toEqual(3)
    })

    test('n-m', () => {
        let v = mockNumber('3-10')
        expect(v).toBeGreaterThanOrEqual(3)
        expect(v).toBeLessThanOrEqual(10)
    })

    test('digi', () => {
        let v = mockNumber('d3')
  
        expect(v).toBeGreaterThanOrEqual(100)
        expect(v).toBeLessThan(999)
        v = mockNumber('d4')
        
        expect(v % 10000).toEqual(v)
    })

    test('digi range', () => {
        let hc1 = 0, hc2 = 0, hc3 = 0
        // 由于低位的数字出现几率较低，因此循环1000次
        for (let i = 0; i < 1000; i++){
            
            let v = mockNumber('d3-d5')
            expect(v).toBeGreaterThanOrEqual(100)
            expect(v).toBeLessThan(99999)
            if (v < 1000)
                hc1++
            else if(v<10000) {
                hc2++
            } else {
                hc3++
            }
        }
        expect(hc1).toBeGreaterThan(0)
        expect(hc2).toBeGreaterThan(0)
        expect(hc3).toBeGreaterThan(0)
    })

    test('decimal', () => {
        for (let i = 0; i < 10; i++){
            
            let v = mockNumber('3.d3')
            expect(v).toBeGreaterThan(3)
            expect(v).toBeLessThan(4)
        }
        
    })

    test('other consts', () => {
        expect(mockNumber('min')).toBe(Number.MIN_VALUE)
        expect(mockNumber('max')).toBe(Number.MAX_VALUE)
        expect(mockNumber('max-inf')).toBe(Number.POSITIVE_INFINITY)
        expect(mockNumber('min-inf')).toBe(Number.NEGATIVE_INFINITY)
        
    })
})

describe('mock string', () => {
    test('ramdom', () => {
        let v1 = mockString(5)
        let v2 = mockString(5)
        expect(v1).not.toEqual(v2)
    })
    test('length', () => {
        expect(mockString('4').length).toBe(4)
    })
    test('length range', () => {
        let v = mockString('10-20')
        expect(v.length).toBeGreaterThanOrEqual(10)
        expect(v.length).toBeLessThanOrEqual(20)
    })
})

