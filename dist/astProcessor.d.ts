import { ProcessResult } from './interfaces';
export declare class AstProcessor {
    private filterAstFile;
    private getFeatureFromDoc;
    private buildElements;
    processAstFile(filePath: string): Promise<ProcessResult>;
}
