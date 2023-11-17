import Swal from "sweetalert2"

export const alertas = (icono, texto) =>{
    Swal.fire({
        // position: 'top-end',
        icon: icono,
        title: texto,
        showConfirmButton: false,
        timer: 1500
      });
}