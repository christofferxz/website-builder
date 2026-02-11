export function removeNode(engine, nodeId) {
  engine.document.nodes = engine.document.nodes.filter(n => String(n.id) !== String(nodeId));

  const el = engine.nodeEls.get(String(nodeId));
  if (!el) return console.log('[error#removeNode] => Node element not found...');
    
  el.remove();
  engine.nodeEls.delete(String(nodeId));
};
