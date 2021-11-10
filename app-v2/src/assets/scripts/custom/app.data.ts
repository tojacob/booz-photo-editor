import { AppControls } from "./app.interfaces";

export const formTypes = {
  general: 'general',
  shirt: 'shirt',
  jacket: 'jacket',
  pant: 'pant',
  shoes: 'shoes',
  simple: 'simple'
};

export const controls: AppControls = {
  identification: {
    name: 'identification',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  file: {
    name: 'file',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  type: {
    name: 'type',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `select-${this.name}`; }
  },
  badgePosition: {
    name: 'badge-position',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `select-${this.name}`; }
  },
  shirtSize: {
    name: 'shirt-size',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  shirtSizeDescription: {
    name: 'shirt-size-description',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  jacketSize: {
    name: 'jacket-size',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  jacketSizeDescription: {
    name: 'jacket-size-description',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  pantSize: {
    name: 'pant-size',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  pantCourt: {
    name: 'pant-court',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  pantColor: {
    name: 'pant-color',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  shoesSizeUs: {
    name: 'shoes-size-us',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  shoesSizeMx: {
    name: 'shoes-size-mx',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  price: {
    name: 'price',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  },
  whatsappFilter: {
    name: 'whatsapp-filter',
    get containerSelector() { return `${this.name}-control`; },
    get inputName() { return `input-${this.name}`; }
  }
};