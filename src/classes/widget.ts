/**
 * This class must be used by plugins to generate UI elements.
 */
export abstract class Widget {
  protected name?: string | undefined
  protected props: { [key: string]: string | number | boolean | any[] }

  constructor(props: any, name?: string) {
    this.props = props
    this.name = name
  }

  public abstract renderToString(): string
}
