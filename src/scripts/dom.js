import { taskList } from "./task-generator.js";
import { addDeleteTaskListeners, saveTasksToStorage } from "./task-input.js";
import { currentFilter } from "./task-views.js";

const taskContainer = document.querySelector(".task-container");

export function addTasksToPage(filteredTasks = taskList.filter(currentFilter)) {
    taskContainer.innerHTML = "";

    filteredTasks.forEach((task) => {
        const html = task.generateTaskHTML();
        taskContainer.innerHTML += html;
    });

    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("click", () => {
            const task = filteredTasks[index];
            task.isChecked = !task.isChecked;

            saveTasksToStorage();
            addTasksToPage();
        });
    });

    addDeleteTaskListeners();
}
