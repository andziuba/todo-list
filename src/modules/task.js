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

function deleteTask(task) {
    const categoryName = task.getTaskCategory();
    const category = todoList.getCategoryByName(categoryName);

    if (category) {
        // remove from its category
        category.deleteTaskfromCategory(task);

        refreshDisplay();
    }
}

function addNewTaskToCategory(newTask, category) {
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

    addNewTaskToCategory(newTask, newTaskCategory);

    document.getElementById("form-new-task").reset();
    closeModals();
    refreshDisplay();
}

const newTaskForm = document.getElementById("form-new-task");
newTaskForm.addEventListener("submit", submitNewTask);

export { Task, deleteTask, addNewTaskToCategory, submitNewTask };
