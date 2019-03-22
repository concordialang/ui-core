//const Connection = require('database-js').Connection;
import { Connection } from 'database-js'

export class AstProcessor {
  private async getFileContent(filePath) : Promise<any> {
    const connection = new Connection(`json:///${filePath}`);
    try {
      let statement = await connection.prepareStatement("SELECT docs");
      let rows = await statement.query();
      return rows
    } catch (error) {
      console.log(error);
    } finally {
      await connection.close();
    }
  }

  public async process(filePath: string) : Promise<any> {
    const content = await this.getFileContent(filePath)
    let { docs } = content.shift()
    docs = docs.filter(doc => doc.feature)
    //proccess content here
    return docs
  }
}
