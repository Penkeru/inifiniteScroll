import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ResultModel } from "../models/result.model";

@Injectable()
export class ApiService {
  private currentPage: number;
  private nextPage: number;
  private nextBufferResults: ResultModel[];
  private hasBuffer: boolean;
  constructor() {}

  public getPageResults(size: number, page: number): Observable<ResultModel[]> {
    if (!this.hasBuffer) {
      let results = [];
      this.currentPage = page;
      this.nextPage = page + 1;
      for (
        let i = this.currentPage * size - size + 1;
        i <= size * this.nextPage;
        i++
      ) {
        results.push({ id: i, value: "val" + i });
      }
      const half = results.length / 2;
      const curentResult = results.splice(0, half);
      this.nextBufferResults = results.splice(-half);
      this.hasBuffer = true;
      return of(curentResult);
    } else {
      this.hasBuffer = false;
      return of(this.nextBufferResults);
    }
  }

  public isBufferResult() {
    return this.hasBuffer;
  }
}
