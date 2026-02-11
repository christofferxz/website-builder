export function move(node, startMouse, engine) {
  const startLocation = { x: node.layout.x, y: node.layout.y };
    
  const onMove = (event) => {
    const dx = event.clientX - startMouse.x;
    const dy = event.clientY - startMouse.y;
    engine.patchNodeLayout(node.id, { x: startLocation.x + dx, y: startLocation.y + dy });
  };

   const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
};
