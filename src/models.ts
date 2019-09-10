export interface ITest {

    /** @mock 100-999 */
    pnum: number
    /** @mock d3 */
    pnum2: number
    /** @mock d3-d9 */
    pnum3: number
    /** @mock d3-d4.d3 */
    pnum4: number
    /** @mock max */
    pnum5: number
    /** @mock min */
    pnum6: number
    /** @mock min-inf */
    pnum7: number
    /** @mock max-inf */
    pnum8: number


    /** @mock ["234","6543","sdafs"] */
    pstring: string
    /** @mock 8 */
    pstring2: string
    /** @mock 3-9 */
    pstring3: string
   


    /** @mock 0.3 */ // 表示为true的概率是0.3
    pbool: boolean
    
    /** 默认会mock now */
    ptime: Date

    defaultNum1: number
    defaultNum2: number

    defaultStr1:string
    defaultStr2:string

}

