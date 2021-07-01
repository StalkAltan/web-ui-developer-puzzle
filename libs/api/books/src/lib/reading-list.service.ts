import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async reset(): Promise<void> {
    this.storage.update(() => []);
  }

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }

  async markBookAsFinished(id: string): Promise<void> {
    this.storage.update(list => {
      return list.map(x => {
        if (x.bookId === id) {
          return {
            ...x,
            finished: true,
            finishedDate: new Date().toISOString()
          }
        }
        return x;
      })
    })
  }
}
