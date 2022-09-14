import connection from '../models/connection';
import ProductModel from '../models/product.model';
import IProducts from '../interfaces/product.interface';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public create(product: IProducts): Promise<IProducts> {
    return this.model.create(product);
  }
}