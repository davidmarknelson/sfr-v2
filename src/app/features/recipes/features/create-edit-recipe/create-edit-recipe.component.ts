import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateRecipeGQL } from '@sfr/data-access/generated';

@Component({
  selector: 'sfr-create-edit-recipe',
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.scss'],
})
export class SfrCreateEditRecipeComponent implements OnInit {
  form: FormGroup = this.createForm();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private createRecipeGQL: CreateRecipeGQL
  ) {}

  ngOnInit(): void {}

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(256)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      cookTime: [''],
      difficulty: [''],
    });
  }
}
