/**
 * This class must be used by plugins to generate UI elements.
 */
export declare abstract class Widget {
    protected name: string;
    protected props: {
        [key: string]: string | number | boolean | any[];
    };
    constructor(props: any, name: string);
    abstract renderToString(): string;
}
