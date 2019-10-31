import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fabric } from 'fabric';

import { SceneService } from 'src/app/scene.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  private elements: any[];
  public name: string;
  public slug: string;
  public elementsToDraw: any[] = [];

  constructor(
    private sceneService: SceneService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    try {
      // Load scene by url parameter
      this.sceneService.getScene(this.route.snapshot.paramMap.get('id')).subscribe(response => {
        this.elements = response.elements;
        this.name = response.name;
        this.slug = response.slug;
        this.prepareElements(this.elements);
      });
    } catch (err) {
      console.error(err);
    }
  }
  drawElements() {
    const canvas = new fabric.Canvas('canvas');
    this.elementsToDraw.forEach(element => {
      canvas.add(element);
    });
  }

  async prepareElements(array) {
    // Wait for all elements to be processed in the original order before drawing them on the canvas.
    for (const element of array) {
      try {
        this.elementsToDraw.push(await this.processElement(element));
      } catch(err) {
        console.error(err);
      }
    }
    this.drawElements();
  }
  async processElement(element) {
    // process the element with unique parameters according to its type.
    switch (element.type) {
      case 'rectangle': {
        const rectangle = new fabric.Rect({
          fill: element.properties.fill,
          opacity: element.properties.alpha,
          angle: element.properties.rotation,
          height: element.properties.height,
          width: element.properties.width,
          top: element.properties.y,
          left: element.properties.x
        });
        return rectangle;
      }
      case 'textBox': {
        const textbox = new fabric.Textbox(element.properties.text, {
          fontWeight: element.properties.bold ? 'bold' : 'normal',
          fill: element.properties.fill,
          fontStyle: element.properties.italic ? 'italic' : 'normal',
          fontSize: element.properties.fontSize,
          top: element.properties.y,
          left: element.properties.x,
          // width not included in API so it takes the full width of the canvas. overflow is not visible
          width: 1920,

        });
        return textbox;
      }
      case 'image': {
        /** because we have to work with a callback to process images we start by returning a promise
         *  and reslove it when the image is complete. */
        return new Promise((resolve, reject) => {
          try {
            fabric.Image.fromURL(element.properties.url, image => {
              image.set({
                height: element.properties.height,
                width: element.properties.width,
                top: element.properties.y,
                left: element.properties.x
              });
              resolve(image);
            });
          } catch (err) {
            reject(err);
          }
        });
      }
      default: {
        console.error('unknown element type');
      } break;
    }
  }
}
