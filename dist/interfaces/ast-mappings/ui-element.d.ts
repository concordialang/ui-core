export interface UiElement {
    name: string;
    widget: string;
    position: number;
    props: {
        [key: string]: string | number | boolean | any[];
    };
}
