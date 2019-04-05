import * as fs from 'fs'

export default class File {
  private fileName: string
  private fileContent: string
  private fileExtension: string

  constructor(fileName: string, fileContent: string, fileExtension: string) {
    this.fileName = fileName
    this.fileContent = fileContent
    this.fileExtension = fileExtension.startsWith('.') ? fileExtension : `.${fileExtension}`
  }

  public save(): Promise<string> {
    const fullPath = this.fileName + this.fileExtension
    return new Promise((resolve, reject) => {
      fs.writeFile(fullPath, this.fileContent, (err) => {
        return err ? reject(err) : resolve(fullPath)
      })
    })
  }
}
