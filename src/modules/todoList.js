import { Category } from "./category";

class TodoList {
    constructor() {
        this.categories = [];
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

    getAllTasks() {
        let allTasks = [];
        this.categories.forEach(category => {
            allTasks = allTasks.concat(category.getCategoryTasks());
        });
        return allTasks;
    }

    getHighPriorityTasks() {
        let highPriorityTasks = [];
        this.categories.forEach(category => {
            const categoryTasks = category.getCategoryTasks();
            highPriorityTasks = highPriorityTasks.concat(categoryTasks.filter(task => task.getTaskPriority() === "high"));
        });
        return highPriorityTasks;
    }
}

export { TodoList };
