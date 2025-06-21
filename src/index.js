import "./styles/global.css";

const taskContainer = document.querySelector(".task-container");
class Task {
   constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
   }

   generateTaskHTML() {
      const html = `
         <div class="task">
            <div class="checkbox">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
            </div>
            <div class="task-title">${this.title}</div>
            <div class="task-description"></div>
            <div class="due-date"></div>
         </div>`;

      return html;
   }
}

function addTaskToPage(content) {
   taskContainer.innerHTML += content;
}

const task = new Task("do laundry", "description", "dueDate", "priority");
const taskContent = task.generateTaskHTML();
addTaskToPage(taskContent);

const checkboxes = document.querySelectorAll(".checkbox");
checkboxes.forEach((checkbox) => {
   checkbox.addEventListener("click", () => {
      checkbox.classList.toggle("checkbox--checked");
   });
});
