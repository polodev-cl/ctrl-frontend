import { NgIf } from "@angular/common";
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-carga-masiva',
  templateUrl: './modal-carga-masiva.component.html',
  styleUrls: [ './modal-carga-masiva.component.css' ],
  standalone: true,
  imports: [
    NgIf
  ]
})
export class ModalCargaMasivaComponent implements AfterViewInit {
  @Output() cerrar = new EventEmitter<void>();
  @Output() abrirModalDuplicados = new EventEmitter<void>();
  @Output() cargaExitosa = new EventEmitter<void>();
  @ViewChild('fileDropzone', { static: false }) fileDropzone!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  // Add properties to track the file name and size
  fileName: string = '';
  fileSize: string = '';
  progress: number = 0;

  fileLoading: boolean = false;
  fileLoaded: boolean = false;
  showUploadButton: boolean = false;

  ngAfterViewInit(): void {
    // Intentionally blank if not used
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if ( input.files && input.files.length ) {
      const file = input.files[0];
      this.fileName = file.name;
      // Convert bytes to KB and round to 2 decimal places
      this.fileSize = (file.size / 1024).toFixed(2) + ' KB';
      this.simulateFileLoad(file);
    }
  }

  simulateFileLoad(file: File): void {
    this.fileLoading = true;
    this.fileName = file.name;
    this.fileSize = (file.size / 1024).toFixed(2) + ' KB';

    // Reset progress to 0
    this.progress = 0;

    // Start the simulation of the progress
    let interval = setInterval(() => {
      this.progress += 10;
      if ( this.progress >= 100 ) {
        clearInterval(interval);
        this.fileLoading = false;
        this.fileLoaded = true;
        // Set the progress to 100% for the full progress bar
        this.progress = 100;
      }
    }, 200); // Adjust the interval time to control the speed of the progress bar
  }

  deleteFile(): void {
    // Logic to handle file deletion
    this.fileLoaded = false;
    this.fileName = '';
    this.fileSize = '';

    // Clear the input
    const input = this.fileInput.nativeElement;
    input.value = '';
    input.dispatchEvent(new Event('change'));
  }

  onUpload(): void {
    console.log('Archivo listo para la siguiente acción');
    // Simula la lógica de carga aquí, y luego emite el evento de carga exitosa
    this.cargaExitosa.emit(); // Emitir evento al completar la carga exitosamente
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }

  abrirDuplicados(): void {
    this.cerrarModal(); // Cerrar este modal primero
    this.abrirModalDuplicados.emit(); // Luego emitir evento para abrir modal de duplicados
  }
}
