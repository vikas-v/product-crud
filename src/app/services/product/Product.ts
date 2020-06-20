import { generateID } from 'src/app/shared/utils';

export class Product {
    id: string;
    name: string;
    rate: number;
    quality: 1 | 2 | 3;

    constructor(obj: any) {
      if (obj) {
        this.id = generateID();
        this.name = obj.name;
        this.rate = obj.rate;
        this.quality = obj.quality;
      }
    }
}
