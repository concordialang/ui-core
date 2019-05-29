import * as fs from 'fs'
import { format } from 'path'
import { promisify } from 'util'

export async function createFile(name: string, content: string, extension: string, fsLib: any = fs): Promise<string> {
  const writeF = promisify( fsLib.writeFile )
  const fullPath = format({ name: name, ext: extension })
  await writeF(fullPath, content)
  return fullPath
}
