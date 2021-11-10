import dayjs from 'dayjs';
import { formTypes, controls } from "./app.data";
import { ProcessedImage } from "./app.interfaces";
import { Merch } from "./form-classes";
import { createZipFromBase64Images, setFormControlData, prepareDownloadBtn, showAppFinish, timer } from "./form-utilities";

const appFormContainer = <HTMLDivElement>document.getElementById('app-editor-forms');
const appFormTypes = Object.values(formTypes);

function formTypeChangeLisener(formContainer: HTMLDivElement): (event: Event) => void {
  return (event: Event) => {
    const selectedType = (<HTMLSelectElement>event.target).value;

    for (const type of appFormTypes) {
      const typeElement = <HTMLDivElement>formContainer.querySelector(`[data-type="${type}-type"]`);
      const priceElement = <HTMLDivElement>formContainer.querySelector(`[data-control="${controls.price.containerSelector}"]`);
      const generalDataType = <HTMLDivElement>formContainer.querySelector(`[data-type="${formTypes.general}-type"]`);
      const badgePosition100 = <HTMLDivElement>formContainer.querySelector('[data-option="badge-position-100"]');
      const badgePosition200 = <HTMLDivElement>formContainer.querySelector('[data-option="badge-position-200"]');
      const badgePosition300 = <HTMLDivElement>formContainer.querySelector('[data-option="badge-position-300"]');
      const badgePosition400 = <HTMLDivElement>formContainer.querySelector('[data-option="badge-position-400"]');

      if (selectedType === type) typeElement.setAttribute('data-type-active', 'true');
      else typeElement.setAttribute('data-type-active', 'false');

      switch (selectedType) {
        case formTypes.general:
          generalDataType.setAttribute('data-type-active', 'true');
          priceElement.classList.add('d-none');
          badgePosition100.classList.remove('d-none');
          badgePosition200.classList.remove('d-none');
          badgePosition300.classList.remove('d-none');
          badgePosition400.classList.remove('d-none');
          break;
        case formTypes.shoes:
          generalDataType.setAttribute('data-type-active', 'true');
          priceElement.classList.remove('d-none');
          badgePosition100.classList.add('d-none');
          badgePosition200.classList.remove('d-none');
          badgePosition300.classList.add('d-none');
          badgePosition400.classList.remove('d-none');
          break;
        case formTypes.simple:
          generalDataType.setAttribute('data-type-active', 'false');
          priceElement.classList.add('d-none');
          badgePosition100.classList.add('d-none');
          badgePosition200.classList.remove('d-none');
          badgePosition300.classList.add('d-none');
          badgePosition400.classList.remove('d-none');
          break;
        default:
          generalDataType.setAttribute('data-type-active', 'true');
          priceElement.classList.remove('d-none');
          badgePosition100.classList.remove('d-none');
          badgePosition200.classList.remove('d-none');
          badgePosition300.classList.add('d-none');
          badgePosition400.classList.add('d-none');
      }
    }
  };
}

function removeFormLisener(formContainer: HTMLDivElement) {
  return (event: Event) => {
    formContainer.remove();
  };
}

export function addFormEditor(): void {
  const template = <HTMLDivElement>document.getElementById('template-form');

  // Config root template
  const formIndex = window.app.formCounter.toString();
  const formContainer = <HTMLDivElement>template.cloneNode(true);
  formContainer.id = `form-container-${formIndex}`;
  window.app.formCounter += 1;

  // Config form
  const formEl = <HTMLFormElement>formContainer.getElementsByTagName('form').item(0);
  formEl.setAttribute('data-form-index', formIndex);

  // Config controls
  for (const control of Object.values(controls)) {
    setFormControlData(formContainer, formIndex, control);
  }

  // Config type listener
  const selectTypeEl = <HTMLSelectElement>formContainer.querySelector(`[name='${controls.type.inputName}']`);
  selectTypeEl.onchange = formTypeChangeLisener(formContainer);

  // Config form remove
  const removeBtnEl = <HTMLButtonElement>formContainer.querySelector('[data-action="remove-form"]');
  removeBtnEl.onclick = removeFormLisener(formContainer);

  // Render
  appFormContainer.appendChild(formContainer);
}

export async function processingEditorForms(): Promise<void> {
  window.scrollTo(0, 0);
  window.app.appLoader.show();
  await timer(3000);

  const forms = <HTMLFormElement[]>Array.from(appFormContainer.getElementsByTagName('form'));
  const batchTimestamp = dayjs().unix();
  const images: ProcessedImage[] = [];

  // Processing
  for (const form of forms) {
    const formIndex = <string>form.getAttribute('data-form-index');
    const merch = new Merch(formIndex, batchTimestamp);
    const processedImage = await merch.createImages();

    images.push(...processedImage);
  }

  if (!images.length) {
    window.app.appLoader.hide();
    return;
  };

  // Download
  const zip = await createZipFromBase64Images(images);

  prepareDownloadBtn(zip, batchTimestamp);
  showAppFinish();
  window.app.appLoader.hide();
}