import { format, addDays } from "date-fns";
import { TodoList } from "./todoList";
import { deleteTask } from "./task";
import { displayNewCategoryModal, displayDeleteCategoryModal, closeModals } from "./modals";

const todoList = new TodoList();

// sort tasks by date/priority

let sortingMode = "date";   // default sorting set to date

function changeSortingMode(mode) {
    sortingMode = mode;
    refreshDisplay();
}

const sortingSelect = document.getElementById("sort-tasks");
sortingSelect.addEventListener("change", () => {
    const selectedValue = sortingSelect.value;
    changeSortingMode(selectedValue);
});

function sortTasks(filteredTasks) {
    if (sortingMode === "date") {
        filteredTasks.sort((a, b) => a.getTaskDate() - b.getTaskDate());
    }
    else if (sortingMode === "priority") {
        filteredTasks.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.getTaskPriority()] - priorityOrder[b.getTaskPriority()];
        });
    }
}

// crearte display of the tasks

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

function editActiveCategoryClass(categoryName) {
    const mainElements = [allTasksButton, todayButton, next7DaysButton, importantButton];
    
    mainElements.forEach(element => {
        element.classList.remove("active-category");
        if (element.textContent === categoryName) {
            element.classList.add("active-category");
            return;
        }
    });

    const elements = document.querySelectorAll(".sidebar-category-container");

    elements.forEach(element => {
        element.classList.remove("active-category");
        
        const children = element.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.textContent === categoryName) {
                console.log(child.textContent);
                element.classList.add("active-category");
                return;
            }
        }
    });
}

function displayContent(categoryName) {
    const content = document.getElementById("content");
    content.innerHTML = "";

    const categoryHeader = document.createElement("h3");
    categoryHeader.id = "content-header";
    categoryHeader.textContent = categoryName;
    content.appendChild(categoryHeader);

    editActiveCategoryClass(categoryName);

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

    sortTasks(filteredTasks);

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

const allTasksButton = document.getElementById("all-tasks");
const todayButton = document.getElementById("today");
const next7DaysButton = document.getElementById("next-7-days");
const importantButton = document.getElementById("important");
const sidebarCategories = document.getElementById("sidebar-categories");

allTasksButton.addEventListener("click", () => displayContent("All tasks"));
todayButton.addEventListener("click", () => displayContent("Today"));
next7DaysButton.addEventListener("click", () => displayContent("Next 7 days"));
importantButton.addEventListener("click", () => displayContent("Important"));
sidebarCategories.addEventListener("click", function(e) {
    const target = e.target;
    if (target.classList.contains("category")) {
        const categoryName = target.textContent;
        console.log(categoryName);
        displayContent(categoryName);
    }
});

// update list of categories on the sidebar

function refreshCategoryList() {
    const categories = todoList.getCategories();

    // clear all categories
    sidebarCategories.innerHTML = "<h2>Categories</h2>";

    // add categories to the sidebar
    categories.forEach(category => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("sidebar-category-container");

        const categoryName = category.getCategoryName();
        const categoryButton = document.createElement("button");
        categoryButton.textContent = categoryName;
        categoryButton.classList.add("category");
        categoryContainer.appendChild(categoryButton);

        const deleteCategoryButton = document.createElement("button");
        deleteCategoryButton.classList.add("delete-category");
        const deleteCategoryIcon = document.createElement("img");
        deleteCategoryIcon.src = "./imgs/delete_category.svg";
        deleteCategoryIcon.alt = "Delete";
        deleteCategoryButton.appendChild(deleteCategoryIcon);
        categoryContainer.appendChild(deleteCategoryButton);
        
        sidebarCategories.appendChild(categoryContainer);
    
        deleteCategoryButton.addEventListener("click", () => displayDeleteCategoryModal(categoryName));
    });

    // attach addCategoryButton to sidebar
    const addCategoryButton = document.createElement("button");
    addCategoryButton.id = "button-new-category";
    addCategoryButton.classList.add("add-button");
    addCategoryButton.textContent = "+ Add category";
    sidebarCategories.appendChild(addCategoryButton);

    addCategoryButton.addEventListener("click", displayNewCategoryModal);
}

export { todoList, changeSortingMode, displayContent, refreshDisplay, refreshCategoryList };
