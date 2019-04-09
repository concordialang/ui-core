import { Feature } from './ast-mappings';
export interface Prototyper {
    generate(features: Feature[]): Promise<string[]>;
}
