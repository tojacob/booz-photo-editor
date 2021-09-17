import { downloadZip } from "client-zip";
import { AppControl, ProcessedImage } from "./app.interfaces";

export const appLoader = new window.bootstrap.Modal(document.getElementById('app-loader'), {
  backdrop: 'static',
  keyboard: false
});

export const timer = async (ms: number) => new Promise<void>((done): void => { setTimeout(() => done(void 0), ms); });

export function setFormControlData(
  formEl: HTMLDivElement,
  formId: string,
  control: AppControl
): void {
  // Set: for, id
  const fileControl = <HTMLDivElement>formEl.querySelector(`[data-control='${control.containerSelector}']`);
  const fileControlInput = <HTMLInputElement>fileControl.querySelector(`[name='${control.inputName}']`);
  const fileControlLabel = <HTMLLabelElement>fileControl.querySelector("label");
  fileControlInput.id = `${control.inputName}-${formId}`;
  fileControlLabel.htmlFor = fileControlInput.id;
}

export function getFormInputValue(control: AppControl, formIndex: string): string {
  const inputEl = <HTMLInputElement>document.getElementById(`${control.inputName}-${formIndex}`);
  const value = inputEl.value;

  return value;
}

export async function createZipFromBase64Images(images: ProcessedImage[]): Promise<Blob> {
  const zip = await downloadZip(images).blob();
  return zip;
}

export function prepareDownloadBtn(zip: Blob, batchTimestamp: number): void {
  const link = <HTMLAnchorElement>document.getElementById('app-download-link');
  link.href = URL.createObjectURL(zip);
  link.download = `booz-photos-${batchTimestamp}.zip`;
}

export function showAppFinish(): void {
  const presentation = <HTMLElement>document.getElementById("app-presentation");
  const editor = <HTMLElement>document.getElementById("app-editor");
  const downloader = <HTMLElement>document.getElementById("app-downloader");

  presentation.classList.add('d-none');
  editor.classList.add('d-none');
  downloader.classList.add('d-flex');
  downloader.classList.remove('d-none');
}
