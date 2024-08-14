import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private readonly key: string = 'fundR@1$ingD0nate'; // Replace with your secret key

  constructor() { }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.key).toString();
  }

  decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
