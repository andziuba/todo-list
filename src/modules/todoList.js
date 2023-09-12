import { Category } from "./category";

class TodoList {
    constructor() {
        this.categories = [];
        this.categories.push(new Category("All tasks"));
        this.categories.push(new Category("Important"));
    }

    getCategories() {
        return this.categories;
    }

    getCategoryByName(name) {
        return this.categories.find(category => category.getCategoryName() === name);
    }

    getTasksByCategory(name) {
        const category = this.categories.find(category => category.getCategoryName() === name);
        return category.getCategoryTasks();
    }

    addCategory(newCategory) {
        if (this.categories.find((category) => category.name === newCategory.name)) return;
        this.categories.push(newCategory);
    }

    deleteTaskFromCategory(categoryName, task) {
        const category = this.getCategoryByName(categoryName);
        if (category) {
            category.deleteTask(task);
        }
    }
}

export { TodoList };
