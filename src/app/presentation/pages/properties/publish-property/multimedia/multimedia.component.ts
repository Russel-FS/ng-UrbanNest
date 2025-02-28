import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-multimedia',
  imports: [CommonModule],
  templateUrl: './multimedia.component.html',
  styleUrl: './multimedia.component.css',
})
export class MultimediaComponent implements OnInit, OnDestroy {
  files: File[] = [];
  previews: String[] = [];
  ngOnInit(): void {}
  ngOnDestroy(): void {}

  onFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.files = Array.from(files);
      const previewUrls = this.files.map((file) => URL.createObjectURL(file));
      this.previews.push(...previewUrls);
    }
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.previews.splice(index, 1);
  }
}
