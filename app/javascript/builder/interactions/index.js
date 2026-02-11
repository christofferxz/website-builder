export function attachDrag(el, nodeId, engine) {
  el.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    engine.startDrag(nodeId, e);
  });
}