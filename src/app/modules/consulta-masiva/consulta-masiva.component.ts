import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-masiva',
  templateUrl: './consulta-masiva.component.html',
  styleUrls: ['./consulta-masiva.component.css']
})
export class ConsultaMasivaComponent implements OnInit {

  showTable = false;
  products: any[] = []; // Aquí se cargará el JSON
  filteredProducts: any[] = []; // Productos filtrados para mostrar en la tabla

  // Propiedades vinculadas a los selects
  selectedMachineType: string = '';
  selectedSystem: string = '';
  selectedVersion: string = '';
  selectedUsage: string = '';

  // Datos simulados, en un caso real podrían venir de un servicio
  machineTypes: string[] = ['Máquina 1', 'Máquina 2', 'Máquina 3', 'Máquina 4', 'Máquina 5', 'Máquina 6', 'Máquina 7', 'Máquina 8', 'Máquina 9', 'Máquina 10'];
  systems: string[] = ['Sistema 1', 'Sistema 2', 'Sistema 3', 'Sistema 4', 'Sistema 5', 'Sistema 6', 'Sistema 7', 'Sistema 8', 'Sistema 9', 'Sistema 10'];
  versions: string[] = ['Versión 1', 'Versión 2', 'Versión 3', 'Versión 4', 'Versión 5', 'Versión 6', 'Versión 7', 'Versión 8', 'Versión 9', 'Versión 10'];
  usages: string[] = ['Uso 1', 'Uso 2', 'Uso 3', 'Uso 4', 'Uso 5', 'Uso 6', 'Uso 7', 'Uso 8', 'Uso 9', 'Uso 10'];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    // Suponiendo que tus productos vienen de un archivo JSON externo, aquí los cargarías.
    // Por simplicidad, asignaremos directamente el array de ejemplo a `products`.
    this.products = [
      // Tus datos JSON van aquí...
    ];
    this.filteredProducts = [...this.products]; // Inicialmente, todos los productos son mostrados
  }

  onSearch() {
    this.filteredProducts = this.products.filter(product => {
      return (!this.selectedMachineType || product.tipo === this.selectedMachineType) &&
             (!this.selectedSystem || product.sistema === this.selectedSystem) &&
             (!this.selectedVersion || product.version === this.selectedVersion) &&
             (!this.selectedUsage || product.uso === this.selectedUsage);
    });
    this.showTable = true;
  }
  breadcrumbs = [
    { text: 'Home', link: '/home' },
    { text: 'Consulta masiva', link: '/consulta-masiva' }
  ];

}


