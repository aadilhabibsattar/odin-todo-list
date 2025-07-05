import {
    parseISO,
    isBefore,
    isToday,
    isTomorrow,
    isYesterday,
    differenceInCalendarDays,
    format,
} from "date-fns";

export const taskList = [];

export class Task {
    constructor(
        title,
        description,
        dueDate,
        priority,
        project,
        isChecked = false
    ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.isChecked = isChecked;
    }

    addTaskToList(task) {
        taskList.push(this);
    }

    generateTaskHTML() {
        const priorityClass = this.priority.toLowerCase();
        const formattedDate = formatDate(this.dueDate);
        const checkedClass = this.isChecked ? "task-title--checked" : "";
        const checkboxClass = this.isChecked
            ? "checkbox checkbox--checked"
            : "checkbox";

        return `
         <div class="task">
            <div class="${checkboxClass}">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
            </div>
            <div class="task-elements">
                <div class="task-content">
                    <div class="task-title ${checkedClass}">${this.title}</div>
                    <div class="task-description">${this.description}</div>
                    <div class="task-details-container">
                        <div class="task-due-date">
                        <div class="task-calendar-icon-container">
                            <svg class="calendar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>calendar-blank</title><path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" /></svg>
                        </div>
                        ${formattedDate}</div>
                        <div class="task-priority priority-${priorityClass}">${this.priority}</div>
                    </div>
                </div>
                <div class="delete-icon-container">
                    <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                </div>
            </div>
         </div>`;
    }
}

function formatDate(rawDate) {
    const date = parseISO(rawDate);
    const today = new Date();

    if (isYesterday(date)) {
        return "Yesterday";
    }

    if (isToday(date)) {
        return "Today";
    }

    if (isTomorrow(date)) {
        return "Tomorrow";
    }

    const diffDays = differenceInCalendarDays(date, today);
    if (diffDays > 1 && diffDays <= 7) {
        return format(date, "EEEE");
    }

    return format(date, "d MMM yyyy");
}
