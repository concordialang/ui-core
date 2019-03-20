export * from './astProcessor'

export interface Prototyper {
  generate(features: Feature[]): Promise<string>
  //generate(widgets: Widgets[], options: Options): Promise<string[]>
}

export interface Element {
  name?: string
  widget: string
  position: number
  props: { [key: string]: string | number | boolean }
}

export interface Feature {
  name: string
  position: number
  widgets: Element[]
}
