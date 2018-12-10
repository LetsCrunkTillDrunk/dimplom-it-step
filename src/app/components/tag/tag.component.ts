import { Component, OnInit } from '@angular/core';
import { TagService} from '../../services/tag.service'; 

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tags:string[];

  constructor(private tagService:TagService) { 
    this.tagService.getTags().subscribe((tags)=>this.tags=tags);
  }

  ngOnInit() {
  }

}
