import { todoList } from "./dom";

function displayNewCategoryModal() {
    newCategoryModal.style.display = "block";
}

function displayNewTaskModal() {
    newTaskModal.style.display = "block";

    const taskCategorySelect = document.getElementById("task-category");
    taskCategorySelect.innerHTML = "";

    const categories = todoList.getCategories();
    categories.forEach(category => {
        const categoryName = category.getCategoryName();
        const option = document.createElement("option");
        option.value = categoryName;
        option.textContent = categoryName;
        taskCategorySelect.appendChild(option);
    });
}

function closeModals() {
    newCategoryModal.style.display = "none";
    newTaskModal.style.display = "none";
}

const newCategoryButton = document.getElementById("button-new-category");
const newTaskButton = document.getElementById("button-new-task");
const closeModalButtons = document.querySelectorAll(".close-button");
const newCategoryModal = document.getElementById("modal-new-category");
const newTaskModal = document.getElementById("modal-new-task");

newCategoryButton.addEventListener("click", displayNewCategoryModal);
newTaskButton.addEventListener("click", displayNewTaskModal);
closeModalButtons.forEach(button => {
    button.addEventListener("click", closeModals);
});

export { displayNewCategoryModal, displayNewTaskModal, closeModals };
