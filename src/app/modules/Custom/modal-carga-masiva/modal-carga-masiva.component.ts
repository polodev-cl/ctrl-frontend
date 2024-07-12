import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild, } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { IUpload } from "@modules/Custom/modal-carga-masiva/domain/interfaces/upload.interface";
import { of } from "rxjs";

@Component({
  selector: 'app-modal-carga-masiva',
  templateUrl: './modal-carga-masiva.component.html',
  styleUrls: [ './modal-carga-masiva.component.css' ],
  standalone: true,
  imports: [ NgIf ],
})
export class ModalCargaMasivaComponent implements AfterViewInit {
  @Output() cerrar = new EventEmitter<void>();
  @Output() errorOcurrido = new EventEmitter<string>();
  @Output() cargaExitosa = new EventEmitter<void>();
  @Output() mostrarModalDuplicados = new EventEmitter<string[]>();

  @ViewChild('fileDropzone', { static: false }) fileDropzone!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  fileName: string = '';
  fileSize: string = '';
  progress: number = 0;
  fileLoading: boolean = false;
  fileLoaded: boolean = false;
  showUploadButton: boolean = false;
  selectedFile?: File;

  constructor(private uploadService: UploadFileService) {
  }

  ngAfterViewInit(): void {
  }

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
      setTimeout(() => {
        this.progress = 50;
      }, 500);

      this.uploadService.uploadFile(this.selectedFile)
        .then((response: IUpload) => {
          if (response.completed) {
            this.fileLoading = false;
            this.fileLoaded = false;
              this.progress = 100;
            this.cargaExitosa.emit();
          }
        })
        .catch((error) => {
          this.fileLoading = false;
          this.fileLoaded = false;
          console.log('error:', error)
          const errorMessages = error.error.errors;
          const errorStep = error.error.step;
          console.log('errorStep:', errorStep)
          console.log('errorMessages:', errorMessages)

          console.log(error)
          if (errorStep === "VALIDATING") {

            this.errorOcurrido.emit(errorMessages);
          } else if (errorStep === "LOOKING_FOR_DUPLICATES") {
            console.log("error step:", errorStep)

            this.mostrarModalDuplicados.emit(errorMessages);
          } else if (errorStep === "UPLOADING") {
            this.errorOcurrido.emit(errorMessages);
          }
          return of({ completed: false, step: 'UPLOAD' } as IUpload);
        })

      // this.uploadService.uploadFile(this.selectedFile).subscribe((response: IUpload) => {
      //
      // });
    }
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }

}
