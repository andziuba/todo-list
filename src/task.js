class Task {
    constructor(name, date, priority, category) {
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.category = category;
    }
  
    setTaskName(name) {
        this.name = name;
    }

    getTaskName() {
        return this.name;
    }

    setTaskDate(date) {
      this.date = date;
    }

    getTaskDate() {
      return this.date;
    }

    setTaskPriority(priority) {
      this.priority = priority;
    }

    getTaskPriority() {
      return this.priority;
    }

    setTaskCategory(category) {
      this.category = category;
    }

    getTaskCategory() {
      return this.category;
    }
}

export default Task;
