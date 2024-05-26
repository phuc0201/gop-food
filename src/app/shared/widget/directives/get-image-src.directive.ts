import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileService } from 'src/app/core/services/file.service';


@Directive({
  selector: '[appGetImageSrc]',
  standalone: true,
})
export class GetImageSrcDirective implements OnInit {

  @Input() idFile!: string;
  @Output() returnImageResourceUrl: EventEmitter<SafeResourceUrl> = new EventEmitter<SafeResourceUrl>();

  constructor(
    private fileSvc: FileService,
    private sanitizerSvc: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.fileSvc.viewFile(this.idFile).subscribe({
      next: res => {
        if (res.body) {
          const blobFile = new Blob([res.body], { type: 'image/*' });
          this.returnImageResourceUrl.emit(this.sanitizerSvc.bypassSecurityTrustResourceUrl(URL.createObjectURL(blobFile)));
        }
      },
      error: () => this.returnImageResourceUrl.emit(undefined),
    });
  }

}
