/**
 * 先不考虑多维数组、定长数组
 */

import { Project, SourceFile, InterfaceDeclaration, ClassDeclaration } from 'ts-morph'
import { mockByExpression, randomSelect } from './expParser';
const path = require('path')
// const mockjs = require('mockjs')

// import mockjs from 'mockjs'
// const Project = require('ts-morph').Project


export default class TsMock {
  private project: Project
  filePath: string
  private file: SourceFile
  
  constructor(filePath?:string) {
    this.project = new Project()
    if (filePath) {
      this.addFile(filePath)
    }
  }

  addFile(filePath: string) {
    this.filePath = filePath
    this.project.addExistingSourceFile(filePath)
    this.file = this.project.getSourceFile(this.filePath) as SourceFile
  }
  
  
  mock(typeName: string) {
    let it :InterfaceDeclaration | ClassDeclaration | undefined = this.file.getInterface(typeName)
    if (!it) {
      it = this.file.getClass(typeName)
    }
    if (!it) {
      throw 'type not found'
    }
    const props = it.getProperties()
    let mockObj: any = {}
    for (let p of props) {
      let pName = p.getName()
      let jsDocs = p.getJsDocs()
      let type = p.getType().getText()
      if (type.indexOf('|')>-1) {
        const arr = type.split('|').filter(t=>t!=='')
        type = randomSelect(arr) // 随机取一个
      }
      let mockExp = ''
      jsDocs.forEach(d => {
        // console.log(d.getInnerText())
      })
      if (jsDocs && jsDocs[0]) {
        
        let doc = jsDocs[0].getInnerText()
        if (doc.trim().indexOf('@mock ') === 0) {
          mockExp = doc.substr(5).trim()
        }
      }
      let value: any = mockByExpression(mockExp, type)
      mockObj[pName] = value
      // console.log(mockExp, type, value)
    }
    return mockObj
  }
}

const mock = new TsMock()
console.log(__dirname)
mock.addFile( __dirname +  '/models.ts')
let res = mock.mock('ITest')
console.log(res)
