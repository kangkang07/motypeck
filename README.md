# motypeck

mo-type-ck

利用typescript 类型定义来mock数据。

该库目前仅提供以下功能，其他功能尚在完善中。，

## Example:

```
const MoTypeCk = require('motypeck')
const mock = new MoTypeCk()
// 添加源文件
mock.addFile( __dirname +  '/models.ts')
// 传入接口名或类名，返回mock数据
let res = mock.mock('ITest')
console.log(res)
```

## models.ts 
使用 jsdoc @mock 表达式 来对mock数据进行注解
```
export interface ITest {
    
    // 默认返回3至5位长度的整数，即 d3-d5
    defaultNum: number

    // 默认返回长度为10的随机字符串
    defaultStr: string

    // 指定范围整数
    /** @mock 100-999 */
    pnum: number

    // 指定位数的整数
    /** @mock d3 */
    pnum2: number

    // 指定位数范围
    /** @mock d3-d9 */
    pnum3: number

    // 指定整数范围和小数位数
    /** @mock d3-d4.d3 */
    pnum4: number

    // 注：不支持小数范围

    // 以下分别返回 Number.MAX_VALUE, Number.MIN_VALUE, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY
    /** @mock max */
    pnum5: number
    /** @mock min */
    pnum6: number
    /** @mock max-inf */
    pnum7: number
    /** @mock min-inf */
    pnum8: number

    // 在一个数组中随机返回一个
    /** @mock ["234","6543","sdafs"] */
    pstring: string

    // 指定字符串长度
    /** @mock 8 */
    pstring2: string

    // 指定字符串长度范围
    /** @mock 3-9 */
    pstring3: string
  

    // 指定true的概率。默认为0.5
    /** @mock 0.3 */ 
    pbool: boolean
    
    // 默认返回 now
    ptime: Date


}
```
