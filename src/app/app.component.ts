import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
import { ResultModel } from "./models/result.model";
import { ApiService } from "./services/api.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("content") elementView: ElementRef;
  public contentHeight: number;
  public readonly itemSize = 100;
  public resultsPerPage: number;
  public results: ResultModel[];
  public currentSection: number;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
    this.currentSection = 1;
    this.results = [];
  }

  ngAfterViewInit(): void {
    this.contentHeight = this.elementView.nativeElement.offsetHeight;
    this.resultsPerPage = this.contentHeight / this.itemSize;
    this.getItems();
  }

  private getItems() {
    this.apiService
      .getPageResults(this.resultsPerPage, this.currentSection)
      .subscribe(results => {
        this.results = this.results.concat(results);
        this.cdr.detectChanges();
      });
  }

  public onScrollDown() {
    if (!this.apiService.isBufferResult()) {
      this.currentSection = this.currentSection + 2;
    }
    this.getItems();
  }
}
