import { Feature } from './ast-mappings'

export interface Prototyper {
  generate(features: Feature[]): Promise<string[]>
  //generate(widgets: Widgets[], options: Options): Promise<string[]>
}
