import { ProcessResult } from './interfaces';
export declare class AstProcessor {
    private filterAstFile;
    private getFeatureFromDoc;
    private buildUiElements;
    private getUiElementType;
    private getUiElementProps;
    processAstFile(filePath: string): Promise<ProcessResult>;
}
