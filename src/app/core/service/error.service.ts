import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  renderApiException(e: unknown): void {
    // Check if 'e' is an object and has the 'error' property
    const response = (e as { error?: { message: string[] } })?.error?.message;

    if (Array.isArray(e)) {
      for (let msg of e) {
        alert(msg);
      }
    } else if (response) {
      // If 'e' has an 'error' with a 'message' property, alert each message
      for (let msg of response) {
        alert(msg);
      }
    } else {
      // Handle cases where the error structure is not as expected
      console.error('Unexpected error format:', e);
    }
  }
}
