import { isToday, parseISO } from "date-fns";
import { taskList } from "./task-generator.js";
import { addTasksToPage } from "./dom.js";

const allTasksPage = document.querySelector(
    ".sidebar-tasks-section--all-tasks-page"
);
const todayPage = document.querySelector(".sidebar-tasks-section--today-page");
const completedPage = document.querySelector(
    ".sidebar-tasks-section--completed-page"
);

const viewTitle = document.querySelector(".task-view-title");

export let currentFilter = () => true;

allTasksPage.addEventListener("click", () => {
    currentFilter = (task) => !task.isChecked;
    addTasksToPage(taskList.filter(currentFilter));
    viewTitle.textContent = "All Tasks";
});

export function filterByToday() {
    currentFilter = (task) =>
        !task.isChecked && isToday(parseISO(task.dueDate));
    addTasksToPage(taskList.filter(currentFilter));
    viewTitle.textContent = "Today";
}

todayPage.addEventListener("click", () => {
    filterByToday();
});

completedPage.addEventListener("click", () => {
    currentFilter = (task) => task.isChecked;
    addTasksToPage(taskList.filter(currentFilter));
    viewTitle.textContent = "Completed";
});

export function filterByProject(projectName) {
    currentFilter = (task) => task.project === projectName && !task.isChecked;
    addTasksToPage(taskList.filter(currentFilter));

    document.querySelector(".task-view-title").textContent = projectName;
}
