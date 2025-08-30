import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SweetAlertService } from '../../../../core/services';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export default class Home implements OnInit {
  protected formSubmitted: boolean = false;
  protected form!: FormGroup;
  private fb = inject(FormBuilder);
  private sweetAlert = inject(SweetAlertService);

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required]
    });    
  }

  protected onSubmit() {
    this.formSubmitted = true;

    if(this.form.valid) {
      const username = this.form.get('username')?.value;
      this.sweetAlert.showLoading('Joining chat...', 1500, username);
    }
  }
}
