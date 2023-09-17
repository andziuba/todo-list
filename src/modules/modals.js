import { deleteCategory } from "./category";
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

function displayDeleteCategoryModal(categoryName) {
    deleteCategoryModal.style.display = "block";

    const modalCategoryName = document.getElementById("modal-category-name");
    modalCategoryName.textContent = categoryName;
    modalCategoryName.style.fontWeight = "700";

    const submitDeleteCategory = document.getElementById("submit-delete-category");
        const cancelDeleteCategory = document.getElementById("cancel-delete-category");

        submitDeleteCategory.addEventListener("click", () => deleteCategory(categoryName));
        cancelDeleteCategory.addEventListener("click", closeModals);
}

function closeModals() {
    newCategoryModal.style.display = "none";
    newTaskModal.style.display = "none";
    deleteCategoryModal.style.display = "none";
}

const newCategoryButton = document.getElementById("button-new-category");
const newTaskButton = document.getElementById("button-new-task");
const closeModalButtons = document.querySelectorAll(".close-button");
const newCategoryModal = document.getElementById("modal-new-category");
const newTaskModal = document.getElementById("modal-new-task");
const deleteCategoryModal = document.getElementById("modal-delete-category");

newCategoryButton.addEventListener("click", displayNewCategoryModal);
newTaskButton.addEventListener("click", displayNewTaskModal);
closeModalButtons.forEach(button => {
    button.addEventListener("click", closeModals);
});

export { displayNewCategoryModal, displayNewTaskModal, displayDeleteCategoryModal, closeModals };
