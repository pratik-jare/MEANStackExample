import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() posts = [];
  // posts = [
  //   {
  //     title: 'First Post', content: 'This is first post'
  //   },
  //   {
  //     title: 'Second Post', content: 'This is Second post'
  //   },
  //   {
  //     title: 'Third Post', content: 'This is Third post'
  //   },
  // ];
  constructor() { }

  ngOnInit(): void {
  }

}
