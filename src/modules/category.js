import { todoList, refreshCategoryList, displayContent } from "./dom";
import { closeModals } from "./modals";
import { saveTodoListToLocalStorage } from "./defaultContent";

class Category {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    getCategoryName() {
        return this.name;
    }

    getCategoryTasks() {
        return this.tasks;
    }

    addTaskToCategory(task) {
        this.tasks.push(task);
    }

    deleteTaskfromCategory(task) {
        const index = this.tasks.findIndex((i) => i === task);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
}

function submitNewCategory(e) {
    e.preventDefault();

    const newCategoryNameInput = document.getElementById("category-name");
    const newCategoryName = newCategoryNameInput.value.trim();

    // check if a category with the same name already exists
    if (todoList.getCategories().some(category => category.getCategoryName() === newCategoryName)) {
        alert("A category with the same name already exists. Please choose a different name.");
        return;
    }

    const newCategory = new Category(newCategoryName);
    todoList.addCategory(newCategory);
    console.log("Categories after adding new one:", todoList.getCategories());

    document.getElementById("form-new-category").reset();
    
    saveTodoListToLocalStorage();
    
    closeModals();
    refreshCategoryList();
}

function deleteCategory(categoryName) {
    const updatedCategories = todoList.getCategories().filter(category => category.getCategoryName() !== categoryName);

    todoList.categories = updatedCategories;

    saveTodoListToLocalStorage();

    closeModals();
    refreshCategoryList();
    displayContent("All tasks");
}

const newCategoryForm = document.getElementById("form-new-category");
newCategoryForm.addEventListener("submit", submitNewCategory);

export { Category, submitNewCategory, deleteCategory };
