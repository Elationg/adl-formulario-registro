import { test } from '@playwright/test';
import { RegistroPage } from '../pages/registro';
import datos from './fixtures/registro-data.json' assert { type: 'json' };

const BASE_URL = 'http://localhost:5173';

let registro;

test.beforeAll(async () => {
  console.log('Iniciando pruebas de registro...');
});

test.beforeEach(async ({ page }) => {
  registro = new RegistroPage(page);
  await registro.goto(BASE_URL);
  await registro.limpiarCampos();
});

test.afterEach(async () => {
  console.log('Prueba ejecutada');
});

test.afterAll(async () => {
  console.log('Las pruebas de registro han finalizado');
});

// Test inicial para validar carga de la página
test('Página principal carga y contiene texto', async ({ page }) => {
  const registro = new RegistroPage(page);
  await registro.goto(BASE_URL);
  await registro.expectBotonRegistrarseVisible();
});

test.describe('Registro de usuarios', () => {
  datos.forEach((caso, i) => {
    test(`Test (${i + 1}) con: "${caso.titulo}"`, async ({ page }) => {
      const registro = new RegistroPage(page);
      await registro.goto(BASE_URL);

      await registro.registrarUsuario({
        nombre: caso.nombre,
        email: caso.email,
        clave: caso.clave,
        confirmar: caso.confirmar
      });

      if (caso.exito == true) {
        await registro.expectMensajeExito();
        await registro.expectCamposVacios();
      } else {
        await registro.expectErroresMensajes(caso.erroresEsperados);
      }
    });
  });
});