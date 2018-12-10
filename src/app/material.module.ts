import { NgModule } from '@angular/core';

import { MatButtonModule, MatCheckboxModule,
  MatIconModule, MatMenuModule, MatSidenavModule,
  MatExpansionModule, MatListModule, MatCardModule, MatChipsModule, MatFormFieldModule,
  MatSelectModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatTabsModule
} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports:[
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule

  ],
  exports:[
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule

  ]
})
export class MaterialModule {
 
}