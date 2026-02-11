import { move } from "./move";
import { resize } from "./resize";

export function attachDrag(el, nodeId, engine) {
  el.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    
    const node = engine.findNode(nodeId);
    if (!node) return console.log('[attachDrag] Node not found...');

    const startMouse = { x: event.clientX, y: event.clientY};

    if (event.shiftKey) {
      resize(node, startMouse, engine);
    } else {
      move(node, startMouse, engine);
    };
  });
}