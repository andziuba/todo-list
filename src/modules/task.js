import { parse } from "date-fns";
import { todoList } from "./dom";
import { closeModals } from "./modals";
import { refreshDisplay } from "./dom";

class Task {
    constructor(name, date, priority, category) {
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.category = category;
    }

    getTaskName() {
        return this.name;
    }

    getTaskDate() {
        return this.date;
    }

    getTaskPriority() {
        return this.priority;
    }

    getTaskCategory() {
        return this.category;
    }
}

function addNewTaskToCategories(newTask, category, priority) {
    // add to "All tasks"
    const allTasksCategory = todoList.getCategoryByName("All tasks");
    allTasksCategory.addTaskToCategory(newTask);

    // add to "Imporant" if its priority is high
    const importantCategory = todoList.getCategoryByName("Important");
    if (priority === "high") {
        importantCategory.addTaskToCategory(newTask);
    }
    
    // add to its category
    const categoryToAddTask = todoList.getCategoryByName(category);
    categoryToAddTask.addTaskToCategory(newTask);
}

function submitNewTask(e) {
    e.preventDefault();

    const newTaskName = document.getElementById("task-name").value;
    const newTaskDateInput = document.getElementById("task-date").value;
    const newTaskDate = parse(newTaskDateInput, "yyyy-MM-dd", new Date());
    const newTaskPriority = document.getElementById("task-priority").value;
    const newTaskCategory = document.getElementById("task-category").value;
    const newTask = new Task(newTaskName, newTaskDate, newTaskPriority, newTaskCategory);

    addNewTaskToCategories(newTask, newTaskCategory, newTaskPriority);

    document.getElementById("form-new-task").reset();
    closeModals();
    refreshDisplay();
}

function deleteTask(task) {
    const categoryName = task.getTaskCategory();
    const category = todoList.getCategoryByName(categoryName);

    if (category) {
        // remove from its category
        category.deleteTaskfromCategory(task);

        // remove from "All tasks" category
        const allTasksCategory = todoList.getCategoryByName("All tasks");
        if (allTasksCategory) {
            allTasksCategory.deleteTaskfromCategory(task);
        }

        // remove from "Important" category if its priority is high
        if (task.getTaskPriority() === "high") {
            const importantCategory = todoList.getCategoryByName("Important");
            if (importantCategory) {
                importantCategory.deleteTaskfromCategory(task);
            }
        }

        refreshDisplay();
    }
}

export { Task, addNewTaskToCategories, submitNewTask, deleteTask };
