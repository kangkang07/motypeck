// import mockjs from 'mockjs'
const numberPattens = [/(d*)[0-9]+/, /(d*)[0-9]+-(d*)[0-9]+/, /max/, /min/,]
const strDic = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const randomSelect = (arr) => {
  let index = (Math.round(Math.random() * (arr.length - 1)))
  // console.log('random seelct,', index, arr, typeof arr)
  return arr[index]
  
}
export const randomChar = () => {
  return randomSelect(strDic)
}


export const isNum = val => {
  return val !== '' && !isNaN(Number(val))
}
export const isArray = val => {
  try {
    let r = JSON.parse(val)
    if (Array.isArray(r)) {
      return r
    }
    return false
  }catch(e){}
  return false
}

export const makeNum = (min, max) => {
  return Math.round(Math.random() * (max-min) + min)
}
export const makeDeci = (min, max) => {
  return 
}

export const makeString = (min, max?) => {
  if (!max) max = min
  
  let end = Math.random() * (max - min) + min
  let str = ''
  for (let i = 0; i < end; i++){
    str += randomChar()
  }
  return str
  
}

export const parseRange = (exp:string) => {
  let range = {
    range: [],
    type:''
  }
  let arr = exp.split('-').map(d => {
    if (d.startsWith('d')) {
      range.type = 'digi'
      return Number(d.substr(1))
    } else if (isNum(d)) {
      range.type = 'range'
      return Number(d)
    }
  })
  range.range = arr
  return range    
}
export const mockNumber = exp => {
  const intPart: (part:string)=>number  = part => {
    if (part.indexOf('-') > 0) {
      let range = parseRange(part)
      const [min, max] = range.range
      if (range.type === 'range') {
        return makeNum(min, max)
      } else { // digi
        return makeNum(Math.pow(10, min - 1), Math.pow(10, max) - 1)
      }
    } else {
      if (part.startsWith('d')) {
        let digi = Number(part.substr(1)) 
        return makeNum(Math.pow(10, digi - 1 ), Math.pow(10, digi) - 1)
      } else {
        return Number(part)
      }
    }
  }
  const deciPart = part => {
    let v = intPart(part)
    return Number('0.' + v.toString())
  }
  if (exp === 'max') {
    return Number.MAX_VALUE
  } 
  if (exp === 'min') {
    return Number.MIN_VALUE
  }
  if(exp==='max-inf')
  {
    return Number.POSITIVE_INFINITY
  }
  if (exp === 'min-inf') {
    return Number.NEGATIVE_INFINITY
  }
  if (exp.indexOf('.') > -1) {
    let arr = exp.split('.')
    return intPart(arr[0]) + deciPart(arr[1])
  } else {
    return intPart(exp)
  }
}

export const mockString = exp => {

  if (isNum(exp)) {
    return makeString(Number(exp))
  } else {
    let arr = isArray(exp)
    if (arr !== false) {
      return randomSelect(arr)
    } else if (exp.indexOf('-')) {
      let arr = exp.split('-').map(d => Number(d))
      return makeString(arr[0], arr[1])
    } else if (exp === 'email') {
      
    } else if (exp === 'name') {
      
    }

  }
}

export const mockBool = exp => {
  let r = 0.5
  if (isNum(r)) {
    r = Number(r)
  }
  return Math.random() < r
}

export const mockTime = exp => {
  // if (exp === '') {
    return new Date()
  // }
}



export const mockByExpression = (exp: string, type: string) => {
  // default exp
  if (exp === '') {
    exp = {
      number: 'd3-d5',
      string: '10',
    }[type] || ''
  }
    let value: any
    if (exp.endsWith('[]')) {
      let range = [0, 5]
      let itemType = type.replace('[]', '')
      if (exp.indexOf('|')) {
        let [oriExp, rangeExp ] = exp.split('|')
        range = parseRange(rangeExp).range
        exp = oriExp
      }
      let arr = []
      for (let i = 0; i < range[0] + Math.random() * (range[1] - range[0]); i++){
        arr.push(this.mockByExpression(exp, itemType))
      }
      value = arr
    }
  if (isArray(exp)) {
      value = randomSelect(JSON.parse(exp))
    } else if (type === 'Date') {
      value = mockTime(exp)
    } else if(type.endsWith('\'') && type.startsWith('\'') || type.endsWith('"') && type.startsWith('"') || type.endsWith('`') && type.startsWith('`')){
      value = type
    } else {
      type = type.toLowerCase()
      if (type === 'string') {
        value = mockString(exp)
      } else if (type === 'number') {
        value = mockNumber(exp)
      } else if (type === 'boolean') {
        value = mockBool(exp)
      } else if (type === 'any') {
        value = ''
      } else if (type === 'null') {
        value = null
      } else if (type === 'undefined') {
        value = undefined
      } else if (!isNaN(Number(type))) {
        value = Number(type)
      } 
    }
  // console.log(type, exp, value)
    return value
  }