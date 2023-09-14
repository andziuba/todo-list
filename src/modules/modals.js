import { todoList } from "./dom";

const newCategoryModal = document.getElementById("modal-new-category");
const newTaskModal = document.getElementById("modal-new-task");

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

export { displayNewCategoryModal, displayNewTaskModal, closeModals };
