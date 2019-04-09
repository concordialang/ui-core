import { Connection } from 'database-js'
import { ProcessResult } from './interfaces'
import { Document, UiElement, Feature } from './interfaces/ast-mappings'

export class AstProcessor {
  private async filterAstFile(filePath: string): Promise<any> {
    let connection: Connection

    try {
      connection = new Connection(`json:///${filePath}`)
      let statement = await connection.prepareStatement('SELECT docs')
      let rows = await statement.query()
      return rows
    } catch (error) {
      throw error
    } finally {
      await connection.close()
    }
  }

  private getFeatureFromDoc(doc: Document): Feature {
    const feature: Feature = {
      name: doc.feature.name,
      position: doc.feature.location.line,
      uiElements: this.buildUiElements(doc.feature.uiElements),
    }

    return feature
  }

  private buildUiElements(uiElements: any[]): UiElement[] {
    const TYPE_PROPERTY = 'type'

    let elements : UiElement[] = []

    for (let uiElement of uiElements) {
      const typeProperty = uiElement.items.find(item => item.property === TYPE_PROPERTY)      
      const widget = typeProperty.value && typeProperty.value.value ? typeProperty.value.value : 'textbox'
      const position = uiElement.location.line
      const items = uiElement.items.filter(item => item.property !== TYPE_PROPERTY)

      let element : UiElement = {
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

  public async processAstFile(filePath: string): Promise<ProcessResult> {
    const content = await this.filterAstFile(filePath)
    let { docs } = content.shift()
    docs = docs.filter(doc => doc.feature)

    const features: Feature[] = docs.map(doc => this.getFeatureFromDoc(doc))
    
    return { features }
  }
}
