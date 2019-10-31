import { Component, OnInit } from '@angular/core';
import { SceneService } from './../scene.service';

@Component({
  selector: 'app-scene-list',
  templateUrl: './scene-list.component.html',
  styleUrls: ['./scene-list.component.scss']
})
export class SceneListComponent implements OnInit {

  private limit = 20;
  private skip = 0;
  public currentPage: number;
  public totalPages: number;
  public currentScenes: any;
  public pageNumbers: number[];
  // base url for building the whole image source
  public baseUrl = 'https://proef.diligentia-uitgeverij.be/';

  constructor(
    private sceneService: SceneService,
  ) { }

  ngOnInit() {
    // load the first set of scenes with startvalue limit and skip
    this.getScenes(true);

  }
  getScenes(firstLoad: boolean) {
    // get scenes acourding to the current limit and skip
    this.sceneService.getScenes(this.limit, this.skip).subscribe(response => {
      // update the components properties
      this.currentScenes = response.scenes;
      this.currentPage = response.page;
      this.totalPages = response.pages;
      // get a collection of all the available pages if firstLoad is true
      if (firstLoad) {
        let page = 1;
        this.pageNumbers = [];
        while (page <= this.totalPages) {
          this.pageNumbers.push(page);
          page++;
        }
      }
    });
  }
  // get the next $limit amount of scenes by adjusting the skip of the API call
  next() {
    this.skip = (this.currentPage + 1) * this.limit;
    this.getScenes(false);
  }
  // get the previous $limit amount of scenes by adjusting the skip of the API call
  previous() {
    this.skip = (this.currentPage - 1) * this.limit;
    this.getScenes(false);
  }
  // go to specific page by adjusting the skip
  goToPage(page) {
    this.skip = (page - 1) * this.limit;
    this.getScenes(false);
  }

}
