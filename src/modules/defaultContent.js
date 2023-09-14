import { todoList, refreshDisplay, refreshCategoryList } from "./dom";
import { Category } from "./category";
import { Task, addNewTaskToCategory } from "./task";

const defaultCategories = ["Chores", "Health"];

const today = new Date();

const twoDaysFromNow = new Date();
twoDaysFromNow.setDate(today.getDate() + 2);

const twoWeeksFromNow = new Date();
twoWeeksFromNow.setDate(today.getDate() + 14);

const defaultTasks = [
    { name: "Water the plants", date: twoWeeksFromNow, priority: "high", category: "Chores" },
    { name: "Drink 2 L of water", date: today, priority: "medium", category: "Health"},
    { name: "Workout", date: twoDaysFromNow, priority: "low", category: "Health"}
];

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

export { loadDefaultContent };
