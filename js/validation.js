document.addEventListener('DOMContentLoaded', () => {
  // LOGIN
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('username').value.trim();
      const pass = document.getElementById('password').value;
      const msg = document.getElementById('login-message');
      msg.innerHTML = '';

      if (user === 'admin' && pass === 'secret') {
        window.location.href = 'prestamo.html';
      } else {
        msg.innerHTML = '<div class="alert alert-danger" role="alert">Credenciales inválidas.</div>';
      }
    });
  }

  // PRÉSTAMO
  const loanForm = document.getElementById('loan-form');
  if (loanForm) {
    const prestados = ['9781234567897']; // Ejemplo de ISBN ya prestado

    loanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const socioId = document.getElementById('socioId').value.trim();
      const isbn = document.getElementById('isbn').value.trim();
      const fechaP = document.getElementById('fechaPrestamo').value;
      const fechaD = document.getElementById('fechaDevolucion').value;
      const msg = document.getElementById('loan-message');
      msg.innerHTML = '';

      const errores = [];
      if (!socioId || !isbn || !fechaP || !fechaD) {
        errores.push('Todos los campos son obligatorios.');
      }
      if (new Date(fechaD) < new Date(fechaP)) {
        errores.push('La fecha de devolución no puede ser anterior a la de préstamo.');
      }
      if (prestados.includes(isbn)) {
        errores.push('El libro ya está prestado.');
      }

      if (errores.length) {
        msg.innerHTML = '<div class="alert alert-danger" role="alert"><ul>' +
          errores.map(e => `<li>${e}</li>`).join('') +
          '</ul></div>';
      } else {
        msg.innerHTML = '<div class="alert alert-success" role="alert">Préstamo registrado con éxito.</div>';
        loanForm.reset();
      }
    });
  }
});
