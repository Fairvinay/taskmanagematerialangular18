// Import necessary Material modules
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Optional, for icons
import { MatCardModule } from '@angular/material/card'; // Optional, for cards
import { MatInputModule } from '@angular/material/input'; // Optional, for input fields
import { MatFormFieldModule } from '@angular/material/form-field'; // Optional, for form fields
import { MatSelectModule } from '@angular/material/select'; // Optional, for select dropdowns
import { MatDialogModule } from '@angular/material/dialog'; // Optional, for dialog support

// Create an exportable configuration that provides Material modules
export const MATERIAL_MODULES = [
  MatListModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule, // If you plan to use Material icons
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule
];
