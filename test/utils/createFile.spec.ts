import { createFile } from '../../src/utils/createFile';

describe('createFile', () => {
  const name = './test_output/testFile'
  const content = 'some content'
  const extension = '.html'

  it('should create the file', async () => {
    await expect(createFile(name, content, extension)).resolves.toBe('./test_output/testFile.html')
  })
})
