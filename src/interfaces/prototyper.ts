import { Feature } from './feature'

export interface Prototyper {
  generate(features: Feature[]): Promise<string[]>
  //generate(widgets: Widgets[], options: Options): Promise<string[]>
}
