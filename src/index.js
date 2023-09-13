import { displayContent, loadDefaultContent } from "./modules/dom";
import { displayNewCategoryModal, displayNewTaskModal, closeModals } from "./modules/modals";
import { submitNewCategory } from "./modules/category";
import { submitNewTask } from "./modules/task";

displayContent("All tasks");
loadDefaultContent();

const newCategoryButton = document.getElementById("button-new-category");
const newTaskButton = document.getElementById("button-new-task");
const closeModalButtons = document.querySelectorAll(".close-button");

const newCategoryForm = document.getElementById("form-new-category");
const newTaskForm = document.getElementById("form-new-task");

const allTasksButton = document.getElementById("all-tasks");
const importantButton = document.getElementById("important");

newCategoryButton.addEventListener("click", displayNewCategoryModal);
newTaskButton.addEventListener("click", displayNewTaskModal);

closeModalButtons.forEach(button => {
    button.addEventListener("click", closeModals);
});

newCategoryForm.addEventListener("submit", submitNewCategory);
newTaskForm.addEventListener("submit", submitNewTask);

allTasksButton.addEventListener("click", () => displayContent("All tasks"));
importantButton.addEventListener("click", () => displayContent("Important"));
