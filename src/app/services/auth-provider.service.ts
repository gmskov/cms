import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {
  isAdmin;
  constructor() { }
}
