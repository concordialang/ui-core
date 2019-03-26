import { Element } from './element'

export interface Feature {
  name: string
  position: number // The position that the feature appears in the ast
  elements: Element[] // The UI elements that compose the feature
}
