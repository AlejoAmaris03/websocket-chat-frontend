import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class SweetAlertService {
  public showLoading(title: string, time: number, username: string) {
    Swal.fire({
      title: title,
      timer: time,
      timerProgressBar: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      window.location.href = `/chat?username=${username}`;
    });
  }

  public showSimpleMessage(title: string, text: string, icon: SweetAlertIcon, confirmButtonText: string) {
    Swal.fire({
      title: title,
      text: text,
      confirmButtonText: confirmButtonText
    });
  }
}
