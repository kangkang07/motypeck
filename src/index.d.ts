declare namespace motypeck {
  interface MoTypeCk {
    filePath: string
    addFile(filePath: string): void
    mock(typeName: string): any
  }
}
  
export = motypeck
  
