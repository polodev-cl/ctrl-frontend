import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface SOVersion {
  so: string;
  versiones: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SOService {
  private datosSO: SOVersion[] = [
    { so: 'Linux', versiones: ['Ubuntu 20.04', 'Fedora 34', 'Debian 10', 'Linux Mint 19', 'Arch Linux', 'CentOS 8'] },
    { so: 'MacOS', versiones: ['Mojave', 'Catalina', 'Big Sur', 'Monterey', 'Ventura'] },
    { so: 'Windows', versiones: ['Windows 11','Windows 10', 'Windows 8', 'Windows 7'] },
    { so: 'BSD', versiones: ['FreeBSD', 'OpenBSD', 'NetBSD'] },
    { so: 'Solaris', versiones: ['Solaris 11', 'Solaris 10'] },
    
   
  ];

  getSOData(): Observable<SOVersion[]> {
    return of(this.datosSO);
  }
}
