import { Element } from './element'

export interface Feature {
  name: string
  position: number
  uiElements: Array<Element>
}
