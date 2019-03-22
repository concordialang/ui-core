import { AstProcessor } from '../src/astProcessor';

describe('AstProcessor', () => {
  let subject
  beforeAll(() => { subject = new AstProcessor() })

  describe('process', () => {
    const filePath = process.env.AST_FILE_PATH

    it('should return an array', () => {
      subject.process(filePath).then(data => {
        expect(data).toBeInstanceOf(Array)
      })
    })

    it('should not be an empty array', () => {
      subject.process(filePath).then(data => {
        expect(data).toHaveLength(1)
      })
    })
  })
})
