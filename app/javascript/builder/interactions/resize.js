export function resize(node, startMouse, engine) {
  const startSize = { width: node.layout.width, height: node.layout.height };

  const onResize = (event) => {
    const dx = event.clientX - startMouse.x;
    const dy = event.clientY - startMouse.y;
    engine.patchNodeLayout(node.id, { width: startSize.width + dx, height: startSize.height + dy });
  };

  const onUp = () => {
    window.removeEventListener("pointermove", onResize);
    window.removeEventListener("pointerup", onUp);
  };

  window.addEventListener("pointermove", onResize);
  window.addEventListener("pointerup", onUp);
};