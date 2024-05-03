import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-modal-carga-masiva',
  templateUrl: './modal-carga-masiva.component.html',
  styleUrls: ['./modal-carga-masiva.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class ModalCargaMasivaComponent implements AfterViewInit {
  @Output() cerrar = new EventEmitter<void>();
  @Output() abrirModalDuplicados = new EventEmitter<void>();
  @Output() errorOcurrido = new EventEmitter<string>();
  @Output() cargaExitosa = new EventEmitter<void>();
  @ViewChild('fileDropzone', { static: false }) fileDropzone!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  fileName: string = '';
  fileSize: string = '';
  progress: number = 0;
  fileLoading: boolean = false;
  fileLoaded: boolean = false;
  showUploadButton: boolean = false;
  selectedFile?: File;

  constructor(private uploadService: UploadFileService) {}

  ngAfterViewInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.selectedFile = file;
      this.fileName = file.name;
      this.fileSize = (file.size / 1024).toFixed(2) + ' KB';
      this.fileLoading = true;
      this.fileLoaded = true;
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.fileLoading = true;
      this.progress = 33;  
  
      this.uploadService.uploadFile(this.selectedFile).subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            const calculatedProgress = Math.round((100 * event.loaded) / event.total);
            if (calculatedProgress >= 50 && calculatedProgress < 100) {
              this.progress = 50;
            } else if (calculatedProgress < 50) {
              this.progress = 33;
            }
          } else if (event.type === HttpEventType.Response) {
            setTimeout(() => {
              this.progress = 100;
              this.fileLoaded = true; 
              this.cargaExitosa.emit(); 
              this.fileLoading = false;
            }, 500);
          }
        },
        error: (error) => {
          this.fileLoading = false;
          this.fileLoaded = false;
          const errorMessages = error.error.message.errors.join(", ");
          this.errorOcurrido.emit(errorMessages); 
        },
      });
    }
  }
  
  cerrarModal(): void {
    this.cerrar.emit();
  }

  abrirDuplicados(): void {
    this.cerrarModal();
    this.abrirModalDuplicados.emit();
  }
}
