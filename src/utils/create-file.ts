import { writeFile } from 'fs'
import { format } from 'path'
import { promisify } from 'util'

export async function createFile(name: string, content: string, extension: string): Promise<string> {
  const writeF = promisify(writeFile)
  const fullPath = format({ name: name, ext: extension })
  await writeF(fullPath, content)
  return fullPath
}
