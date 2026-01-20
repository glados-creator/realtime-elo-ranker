import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateRankingDto } from './createranking.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  private idCounter = 1;

  create(cat: CreateCatDto): Cat {
    console.log('service create');

    const newCat: Cat = {
      id: this.idCounter++,
      name: cat.name,
      age: cat.age,
    };
    this.cats.push(newCat);
    return newCat;
  }

  findAll(): Cat[] {
    console.log('service findall');
    return this.cats;
  }

  findone(id: number): Cat {
    console.log('service findone');
    const cat = this.cats.find((cat) => cat.id == id);
    if (cat) {
      return cat;
    } else {
      throw new NotFoundException(`cat with id ${id} not found`);
    }
  }

  update(id: number, update: Partial<CreateCatDto>): Cat {
    console.log('service update');
    const cat = this.findone(id);
    Object.assign(cat, update);
    return cat;
  }

  delete(id: number): Cat {
    console.log('service delete');
    const cat = this.findone(id);
    const index = this.cats.indexOf(cat);
    this.cats.slice(index, 1);
    return cat;
  }
}
