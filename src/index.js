import { displayContent } from "./modules/dom";
import { hasLocalStorageData, loadDefaultContent, loadTodoListFromLocalStorage } from "./modules/defaultContent";

// inital load of the page
displayContent("All tasks");

if (hasLocalStorageData()) {
    // if there is data in local storage, load it
    loadTodoListFromLocalStorage();
} 
else {
    // otherwise, load default content
    loadDefaultContent();
}
