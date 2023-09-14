import { todoList, refreshCategoryList } from "./dom";
import { closeModals } from "./modals";

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

    const newCategory = new Category(newCategoryName);
    todoList.addCategory(newCategory);

    document.getElementById("form-new-category").reset();
    closeModals();
    refreshCategoryList();
}

const newCategoryForm = document.getElementById("form-new-category");
newCategoryForm.addEventListener("submit", submitNewCategory);

export { Category, submitNewCategory };
