export interface Element {
    name?: string;
    widget: string;
    position: number;
    props: {
        [key: string]: string | number | boolean;
    };
}
