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
		const name: string = doc.feature.name
		const position: number = doc.feature.location.line
		const uiElements: UiElement[] = this.buildUiElements(doc.feature.uiElements)

		const feature: Feature = { name, position, uiElements }

		return feature
	}

	private buildUiElements(uiElements: any[]): UiElement[] {
		let elements : UiElement[] = []

		for (let uiElement of uiElements) {
			const name: string = uiElement.name
			const widget: string = this.getUiElementType(uiElement) || 'textbox'
			const position: number = uiElement.location.line
			const props: any = this.getUiElementProps(uiElement)

			const element: UiElement = { name, widget, position, props }

			elements.push(element)
		}

		return elements
	}

	private getUiElementType(uiElement: any): string {
		const TYPE_PROPERTY = 'type'
		const UI_ELEMENT_TYPE = 'ui_element_type'

		const entities = uiElement.items.find(item => item.property === TYPE_PROPERTY).nlpResult.entities
		const elementType = entities.find(entity => entity.entity === UI_ELEMENT_TYPE).value
		return elementType
	}

	private valueIsArray(value: string): boolean {
		const regex = /^[a-z]*\s(is in)\s\[.*\]$/
		return !!value.match(regex)
	}

	private extractArrayFromValue(value: string): any[] {
		const regex = /\[.*\]/g
		// get the stringified array definition in the sentence
		const match = regex.exec(value)
		// convert string to array, removing whitespaces
		const values = match[0].replace(/(\[|\"|\])/g, '').split(',').map(value => (value.trim()))
		return values
	}

	private getUiElementProps(uiElement: any): any {
		const TYPE_PROPERTY = 'type'
		const items = uiElement.items.filter(item => item.property !== TYPE_PROPERTY)
		let props = {}

		for (let item of items) {
			if (item.property === 'value' && this.valueIsArray(item.content)) {
				props[item.property] = this.extractArrayFromValue(item.content)
			} else {
				props[item.property] = item.value.value
			}
		}

		return props
	}

	public async processAstFile(filePath: string): Promise<ProcessResult> {
		const content = await this.filterAstFile(filePath)
		let { docs } = content.shift()
		docs = docs.filter(doc => doc.feature)

		const features: Feature[] = docs.map(doc => this.getFeatureFromDoc(doc))

		return { features }
	}
}
