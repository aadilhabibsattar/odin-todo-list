import { taskList } from "./task-generator";

const taskContainer = document.querySelector(".task-container");

export function addTasksToPage() {
    taskContainer.innerHTML = "";
    taskList.forEach((task) => {
        const html = task.generateTaskHTML();
        taskContainer.innerHTML += html;
    });

    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
            checkbox.classList.toggle("checkbox--checked");
        });
    });
}
