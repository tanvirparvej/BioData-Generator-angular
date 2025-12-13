// biodata-generator.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import html2pdf from 'html2pdf.js';

interface BiodataData {
  name: string;
  dob: string;
  age: string;
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
  religion: string;
  caste: string;
  maritalStatus: string;
  education: string;
  occupation: string;
  income: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyStatus: string;
  presentAddress: string;
  permanentAddress: string;
  hobbies: string;
  mobile: string;
  email: string;
  photoUrl: string;
}

@Component({
  selector: 'app-biodata-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './biodata-main.html',
  styleUrl: './biodata-main.css',
})
export class BiodataMain {
  @ViewChild('biodataPreview') biodataPreview!: ElementRef;

  primaryColor: string = '#8B4513';
  secondaryColor: string = '#D2691E';

  biodata: BiodataData = {
    name: '',
    dob: '',
    age: '',
    height: '',
    weight: '',
    complexion: '',
    bloodGroup: '',
    religion: '',
    caste: '',
    maritalStatus: '',
    education: '',
    occupation: '',
    income: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    siblings: '',
    familyStatus: '',
    presentAddress: '',
    permanentAddress: '',
    hobbies: '',
    mobile: '',
    email: '',
    photoUrl: ''
  };

  updateColors(): void {
    // Colors are bound directly to template
    console.log('Colors updated:', this.primaryColor, this.secondaryColor);
  }

  onPhotoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.biodata.photoUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  downloadPDF(): void {
    const element = this.biodataPreview.nativeElement;
    
    if (!element) {
      console.error('Preview element not found');
      return;
    }

    // Store original styles
    const originalOverflow = element.style.overflow;
    const originalMaxHeight = element.style.maxHeight;
    const originalPosition = element.style.position;
    
    // Temporarily remove constraints for PDF generation
    element.style.overflow = 'visible';
    element.style.maxHeight = 'none';
    element.style.position = 'relative';

    const opt: any = {
      margin: [3, 3, 3, 3] as [number, number, number, number],
      filename: 'marriage-biodata.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2.5, 
        useCORS: true,
        scrollY: 0,
        scrollX: 0,
        windowHeight: element.scrollHeight,
        logging: false,
        letterRendering: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // Restore original styles after PDF generation
      element.style.overflow = originalOverflow;
      element.style.maxHeight = originalMaxHeight;
      element.style.position = originalPosition;
    });
  }
}