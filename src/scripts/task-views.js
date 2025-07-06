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
    clearActiveStates();
    allTasksPage.classList.add("active");

    currentFilter = (task) => !task.isChecked;
    addTasksToPage(taskList.filter(currentFilter));
    viewTitle.textContent = "All Tasks";
});

export function filterByToday() {
    clearActiveStates();
    todayPage.classList.add("active");

    currentFilter = (task) =>
        !task.isChecked && isToday(parseISO(task.dueDate));
    addTasksToPage(taskList.filter(currentFilter));
    viewTitle.textContent = "Today";
}

todayPage.addEventListener("click", () => {
    filterByToday();
});

completedPage.addEventListener("click", () => {
    clearActiveStates();
    completedPage.classList.add("active");

    currentFilter = (task) => task.isChecked;
    addTasksToPage(taskList.filter(currentFilter));
    viewTitle.textContent = "Completed";
});

export function filterByProject(projectName) {
    currentFilter = (task) => task.project === projectName && !task.isChecked;
    addTasksToPage(taskList.filter(currentFilter));

    document.querySelector(".task-view-title").textContent = projectName;
}

export function clearActiveStates() {
    allTasksPage.classList.remove("active");
    todayPage.classList.remove("active");
    completedPage.classList.remove("active");

    document
        .querySelectorAll(".sidebar-projects-section--project-page")
        .forEach((div) => {
            div.classList.remove("active");
        });
}
