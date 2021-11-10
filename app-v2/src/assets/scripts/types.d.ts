declare global {
  interface Window {
    app: {
      formCounter: number;
      addFormEditor: () => void;
      processingEditorForms: () => void;
      appLoader: any;
    };
    bootstrap: any;
  }
}

export { };