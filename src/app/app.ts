import { Component, signal } from '@angular/core';
import { BiodataMain } from './biodata-main/biodata-main';

@Component({
  selector: 'app-root',
  imports: [BiodataMain ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bio-generator');
}
