export function addNode(engine, { type, layout = {}, props = {} }) {
  const id = engine.nextNodeId();

  const node = {
    id,
    type,
    layout: {
      x: layout.x ?? 0,
      y: layout.y ?? 0,
      width: layout.width ?? 100,
      height: layout.height ?? 100,
      rotation: 0,
      z: engine.document.nodes.length + 1
    },
    props
  };

  engine.document.nodes.push(node);
  engine.render(node);
};