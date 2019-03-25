import { Connection } from 'database-js'
import { Element, Feature } from './interfaces'

export class AstProcessor {
  private props = ['required', 'maxlength', 'minlength', 'type']
  private types = { 'textbox': 'text' }

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
      elements: this.getUIElementsFromFeature(doc.feature.uiElements)
    }

    return feature
  }

  private getUIElementsFromFeature(uiElements: Array<any>) : Array<Element> {
    let elements = []

    for (let uiElement of uiElements) {
      let position = uiElement.location.line
      let widget, props = {}
      
      for (let item of uiElement.items) {
        if(item.property === 'type') {
          widget = (item.property.value || {}).value || 'input'
        }
        
        if (this.props.indexOf(item.property) !== -1) {
          if(item.value) {
            props[item.property] = item.value.value || item.value
          } else {
            const type = item.nlpResult.entities.find(entity => entity.entity == 'ui_property')
            const value = item.nlpResult.entities.find(entity => entity.entity == 'ui_element_type')
            if(type && value) {
              props[type.value] = this.types[value.value] || value.value
            } 
          }
        }
      }
      
      let element = {
        name: uiElement.name,
        widget,
        position,
        props
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
