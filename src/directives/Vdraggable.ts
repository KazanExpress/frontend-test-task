import { DirectiveBinding } from "vue";
import { Task } from "../store";
interface Building {
  name: string;
  task: Task;
}
export default {
  mounted(el: HTMLElement, bilding: DirectiveBinding<Building>) {
    el.setAttribute("draggable", 'true');
    el.addEventListener("dragstart", (event:DragEvent) => {
      event.dataTransfer!.effectAllowed = "move";
      event.dataTransfer!.setData(
        bilding.value.name,
        JSON.stringify(bilding.value.task)
      );
      el.classList.add("dragging");
    });

    el.addEventListener("dragend", () => {
      el.classList.remove("dragging");
    });
  },
  name: "draggable",
};
