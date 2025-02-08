import { Component } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  uploadStatus: string = '';

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(file).subscribe(
        (response) => {
          this.uploadStatus = 'File uploaded successfully!';
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'output.xlsx'; 
          link.click();
        },
        (error) => {
          this.uploadStatus = 'File upload failed. Please try again.';
          console.error(error);
        }
      );
    }
  }
}
