import { UiElement } from './ui-element'

export interface Feature {
  name: string
  position: number // The position that the feature appears in the ast
  uiElements: UiElement[] // The UI elements that compose the feature
}
