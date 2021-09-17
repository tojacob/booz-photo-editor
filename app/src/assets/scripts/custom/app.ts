import { addFormEditor, processingEditorForms } from "./form-events";
import { appLoader } from "./form-utilities";

function assingGlobalVariables() {
  window.app = {
    formCounter: 1,
    addFormEditor,
    processingEditorForms,
    appLoader
  };
}

(async function (): Promise<void> {
  assingGlobalVariables();
})();