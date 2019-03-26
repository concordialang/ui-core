import { AstProcessor } from '../src/astProcessor';

describe('AstProcessor', () => {
  let subject
  beforeAll(() => { subject = new AstProcessor() })

  describe('processAstFile', () => {
    const filePath = process.env.AST_FILE_PATH

    it('should return an array of features', async () => {
      const expectedResult = expect.objectContaining({
        features: expect.any(Array)
      })
      const processResult = await subject.processAstFile(filePath)
      expect(processResult).toEqual(expectedResult)
    })

    it('should return an array of Features', async () => {
      const featureInterface = expect.objectContaining({
        name: expect.any(String),
        position: expect.any(Number),
        elements: expect.any(Array)
      })

      const features = await subject.processAstFile(filePath)

      for (let feature of features) {
        expect(feature).toEqual(featureInterface)
      }
    })

    it('should return an array of Elements in each feature', async () => {
      const elementInterface = expect.objectContaining({
        name: expect.any(String),
        widget: expect.any(String),
        position: expect.any(Number)
      })

      const features = await subject.processAstFile(filePath)

      for (let feature of features) {
        for (let uiElement of feature.elements) {
          expect(uiElement).toEqual(elementInterface)
        }
      }
    })
  })
})
