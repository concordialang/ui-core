/**
 * This class must be used by plugins to generate UI elements.
 */
export declare abstract class Widget {
    protected name?: string | undefined;
    protected props: {
        [key: string]: string | number | boolean;
    };
    constructor(props: any, name?: string);
    abstract renderToString(): string;
}
