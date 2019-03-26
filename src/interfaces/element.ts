export interface Element {
  name?: string
  widget: string // The type of the UI element
  position: number // The position that the UI element appears in the ast
  props: { [key: string]: string | number | boolean } // Aditional properties of the UI element
}
