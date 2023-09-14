import { format, addDays } from "date-fns";
import { Task } from "./task";
import { Category } from "./category";
import { TodoList } from "./todoList";
import { addNewTaskToCategory, deleteTask } from "./task";
import { displayNewCategoryModal } from "./modals";

const todoList = new TodoList();

// default content
const defaultCategories = ["Chores", "Health"];
const defaultTasks = [
    { name: "Water the plants", date: new Date("2023-09-15"), priority: "high", category: "Chores" },
    { name: "Do the laundry", date: new Date("2023-09-17"), priority: "medium", category: "Chores" },
    { name: "Drink 2 L of water", date: new Date("2023-09-16"), priority: "medium", category: "Health"},
    { name: "Take pills", date: new Date("2023-09-15"), priority: "high", category: "Health"},
    { name: "Workout", date: new Date("2023-09-19"), priority: "low", category: "Health"}
]

function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskPriority = task.getTaskPriority();
    if (taskPriority === "low") taskElement.classList.add("low-priority");
    else if (taskPriority === "medium") taskElement.classList.add("medium-priority");
    else taskElement.classList.add("high-priority");

    const taskNameElement = document.createElement("div");
    taskNameElement.classList.add("task-name");
    taskNameElement.textContent = task.getTaskName();

    const taskDetailsElement = document.createElement("div");
    taskDetailsElement.classList.add("task-details");

    const taskDateElement = document.createElement("div");
    taskDateElement.classList.add("task-date");
    const formattedDate = format(task.getTaskDate(), "yyyy-MM-dd");
    taskDateElement.textContent = formattedDate;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    const removeIcon = document.createElement("img");
    removeIcon.src = "./imgs/delete_task.svg";
    removeIcon.alt = "Delete";
    removeButton.appendChild(removeIcon);
    removeButton.addEventListener("click", () => deleteTask(task));

    taskDetailsElement.appendChild(taskDateElement);
    taskDetailsElement.appendChild(removeButton);

    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(taskDetailsElement);

    return taskElement;
}

function displayContent(categoryName) {
    const content = document.getElementById("content");
    content.innerHTML = `<h3 id="content-header">${categoryName}</h3>`
    
    let filteredTasks = [];
    switch (categoryName) {
        case "All tasks":
            filteredTasks = todoList.getAllTasks();
            break;
        case "Today":
            const today = new Date();
            const formattedToday = format(today, "yyyy-MM-dd");
            filteredTasks = todoList.getTasksByDate(formattedToday);
            break;
        case "Next 7 days":
            const startDate = new Date();
            const formattedStartDate = format(startDate, "yyyy-MM-dd");
            const endDate = addDays(startDate, 7);
            const formattedEndDate = format(endDate, "yyyy-MM-dd");
            filteredTasks = todoList.getTasksInRange(formattedStartDate, formattedEndDate);
            break;
        case "Important":
            filteredTasks = todoList.getHighPriorityTasks();
            break;
        default:
            filteredTasks = todoList.getTasksByCategory(categoryName);
            break;
    }

    if (filteredTasks.length === 0) {
        content.innerHTML += "<p>No tasks!</p>";
    }
    else {
        filteredTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            content.appendChild(taskElement);
        });
    }
}

function refreshDisplay() {
    const currentCategoryName = document.getElementById("content-header").textContent;
    displayContent(currentCategoryName);
}

function refreshCategoryList() {
    const categories = todoList.getCategories();

    // clear all categories
    sidebarCategories.innerHTML = "<h2>Categories</h2>";

    // add categories to the sidebar
    categories.forEach(category => {
        const categoryName = category.getCategoryName();
        const categoryButton = document.createElement("button");
        categoryButton.textContent = categoryName;
        categoryButton.classList.add("category");
        sidebarCategories.appendChild(categoryButton);
    });

    // attach addCategoryButton to sidebar
    const addCategoryButton = document.createElement("button");
    addCategoryButton.id = "button-new-category";
    addCategoryButton.classList.add("add-button");
    addCategoryButton.textContent = "+ Add category";
    sidebarCategories.appendChild(addCategoryButton);

    addCategoryButton.addEventListener("click", displayNewCategoryModal);
}

const sidebarCategories = document.getElementById("sidebar-categories");
sidebarCategories.addEventListener("click", function(e) {
    const target = e.target;
    if (target.classList.contains("category")) {
        const categoryName = target.textContent;
        displayContent(categoryName);
    }
});

function loadDefaultContent() {
    defaultCategories.forEach(categoryName => {
        const newCategory = new Category(categoryName);
        todoList.addCategory(newCategory);
    });

    defaultTasks.forEach(taskData => {
        const name = taskData.name;
        const date = taskData.date;
        const priority = taskData.priority;
        const category = taskData.category;
        const newTask = new Task(name, date, priority, category);
    
        addNewTaskToCategory(newTask, category);
    });

    refreshDisplay();
    refreshCategoryList();
}

export { todoList, displayContent, loadDefaultContent, refreshDisplay, refreshCategoryList };
