import { ProcessResult } from './interfaces';
export declare class AstProcessor {
    private filterAstFile;
    private getFeatureFromDoc;
    private buildUiElements;
    processAstFile(filePath: string): Promise<ProcessResult>;
}
