import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProducts from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: IProducts): Promise<IProducts> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  public async getAll(): Promise<IProducts[]> {
    const result = await this.connection
      .execute('SELECT * from Trybesmith.Products');

    const [rows] = result;
    return rows as IProducts[];
  }
}