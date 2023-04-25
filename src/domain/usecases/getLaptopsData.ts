import { Laptop } from '@/domain/models/laptop';
import { IProductPage } from '@/domain/protocols/page';
import { concurrentTaskQueue } from '@/utils/promise';

export class GetLaptopsData {
  constructor(private readonly productPage: IProductPage) {}

  async execute(laptopsURIs: string[]): Promise<Laptop.Model[]> {
    const concurrency = 20;
    const tasks = laptopsURIs.map(
      (uri) => async () => await this.productPage.getLaptopData(uri)
    );
    const laptopsData = await concurrentTaskQueue(tasks, concurrency);
    return laptopsData;
  }
}