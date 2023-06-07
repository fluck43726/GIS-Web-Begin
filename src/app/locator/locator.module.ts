import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { LocatorComponent } from './locator.component';

@NgModule({
  declarations: [LocatorComponent],
  imports: [ButtonModule, InputNumberModule, FormsModule],
  exports: [LocatorComponent],
})
export class LocatorModule {}
