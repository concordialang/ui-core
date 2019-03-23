import { Connection } from 'database-js'
import { Element, Feature } from './interfaces'

export class AstProcessor {
  private async getFileContent(filePath) : Promise<any> {
    const connection = new Connection(`json:///${filePath}`);
    try {
      let statement = await connection.prepareStatement("SELECT docs");
      let rows = await statement.query();
      return rows
    } catch (error) {
      console.log(error);
    } finally {
      await connection.close();
    }
  }

  private getFeatureFromDoc(doc: any) : Feature {
    const feature = {
      name: doc.feature.name,
      position: doc.feature.location.line,
      uiElements: this.getUIElementsFromFeature(doc.feature.uiElements)
    }

    return feature
  }

  private getUIElementsFromFeature(uiElements: Array<any>) : Array<Element> {
    let elements = []

    for (let uiElement of uiElements) {
      const widget = uiElement.items.find(item => item.property === 'type').value.value
      const position = uiElement.location.line
      const items = uiElement.items.filter(item => item.property !== 'type')

      const element = {
        name: uiElement.name,
        widget,
        position,
        props: {}
      }

      for (let item of items) {
        element.props[item.property] = item.value.value
      }

      elements.push(element)
    }

    return elements
  }

  public async process(filePath: string) : Promise<any> {
    const content = await this.getFileContent(filePath)
    let { docs } = content.shift()
    docs = docs.filter(doc => doc.feature)

    let features: Array<Feature> = docs.map(doc => (this.getFeatureFromDoc(doc)))

    return { features }
  }
}
