import { format, isWithinInterval, parseISO } from "date-fns";
import { Category } from "./category";
import { Task } from "./task";

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

    getTasksByDate(date) {
        const filteredTasks = [];
        this.categories.forEach(category => {
            category.getCategoryTasks().forEach(task => {
                const taskDate = format(task.getTaskDate(), "yyyy-MM-dd");
                if (taskDate === date) {
                    filteredTasks.push(task);
                }
            });
        });
        return filteredTasks;
    }

    getTasksInRange(startDate, endDate) {
        const parsedStartDate = parseISO(startDate);
        const parsedEndDate = parseISO(endDate);

        const filteredTasks = [];
        this.categories.forEach(category => {
            category.getCategoryTasks().forEach(task => {
                const taskDate = task.getTaskDate();
                if (isWithinInterval(taskDate, { start: parsedStartDate, end: parsedEndDate })) {
                    filteredTasks.push(task);
                }
            });
        });

        return filteredTasks;
    }

    loadFromLocalStorage(data) {
        if (data && data.categories) {
            this.categories = [];
    
            data.categories.forEach(storedCategory => {
                const categoryName = storedCategory.name;
                const category = new Category(categoryName);
    
                storedCategory.tasks.forEach(storedTask => {
                    const task = new Task(
                        storedTask.name,
                        new Date(storedTask.date),
                        storedTask.priority,
                        storedTask.category
                    );
                    category.addTaskToCategory(task);
                });

                this.categories.push(category);
            });
        }
    }
}

export { TodoList };
