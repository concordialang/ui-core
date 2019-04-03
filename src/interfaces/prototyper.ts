import { Feature } from './ast-mappings'
import { HtmlElement } from '../../../ui-html/src/classes/html-elements';

export interface Prototyper {
  generate(features: Feature[]): Promise<HtmlElement[]>
  //generate(widgets: Widgets[], options: Options): Promise<string[]>
}
