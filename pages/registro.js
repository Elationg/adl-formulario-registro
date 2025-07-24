import { expect } from '@playwright/test';

export class RegistroPage {
  constructor(page) {
    this.page = page;
    this.inputNombre = page.locator('#name');
    this.inputEmail = page.locator('#email');
    this.inputClave = page.locator('#password');
    this.inputConfirmacion = page.locator('#confirmPassword');
    this.botonRegistrar = page.getByRole('button', { name: 'Registrarse' });
    this.mensajeExito = page.getByText('¡Registro exitoso! Datos enviados correctamente.');
    this.mensajeErrorGeneral = page.getByText('Por favor, corrige los errores en el formulario.');
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async expectBotonRegistrarseVisible() {
    await expect(this.botonRegistrar).toBeVisible();
  }

  async registrarUsuario({ nombre, email, clave, confirmar }) {
    await this.inputNombre.fill(nombre);
    await this.inputEmail.fill(email);
    await this.inputClave.fill(clave);
    await this.inputConfirmacion.fill(confirmar);
    await this.botonRegistrar.click();
  }

  async expectMensajeExito() {
    await expect(this.mensajeExito).toBeVisible();
  }

  async expectCamposVacios() {
    await expect(this.inputNombre).toHaveValue('');
    await expect(this.inputEmail).toHaveValue('');
    await expect(this.inputClave).toHaveValue('');
    await expect(this.inputConfirmacion).toHaveValue('');
  }

  async expectErrorCampo(mensaje) {
    const locator = this.page.getByText(mensaje, { exact: true });
    await expect(locator.first()).toBeVisible();
  }

  async expectErroresMensajes(mensajes = []) {
    await Promise.all(mensajes.map(msg => this.expectErrorCampo(msg)));
  }

  async limpiarCampos() {
    await this.inputNombre.fill('');
    await this.inputEmail.fill('');
    await this.inputClave.fill('');
    await this.inputConfirmacion.fill('');
  }
}
