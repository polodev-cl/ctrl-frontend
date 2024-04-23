import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router'; // Importa el Router
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let router: Router; // Declara una variable para el Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router); // Obtiene la instancia del Router
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).toBeTruthy();
    expect(compiled.querySelector('button')?.textContent).toContain('Ir a Login');
  });

  it('should redirect to login when button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigateByUrl'); // Utiliza router en lugar de app.router
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith('/login'); // Utiliza navigateByUrl en lugar de navigate
  });
});
