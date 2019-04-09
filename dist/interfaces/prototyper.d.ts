import { Feature } from './feature';
export interface Prototyper {
    generate(features: Feature[]): Promise<string[]>;
}
