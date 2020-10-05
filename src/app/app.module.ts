import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  imports: [BrowserModule, FormsModule, InfiniteScrollModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [ApiService]
})
export class AppModule {}
