import File from '../src/utils/file';

describe('File', () => {
  let subject
  const fileName = './test_output/testFile'
  const fileContent = 'some content'
  const fileExtension = '.html'

  beforeAll(() => { subject = new File(fileName, fileContent, fileExtension) })

  describe('save', () => {
    it('should save the file', async () => {
      await expect(subject.save()).resolves.toBe('./test_output/testFile.html')
    })
  })
})
