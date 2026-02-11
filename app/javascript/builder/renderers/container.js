export function container(node) {
  // create div
  const element = document.createElement('div');

  // dataset
  element.dataset.nodeId = node.id;

  // style
  element.style.position = 'absolute';

  // style - layout
  element.style.height = `${node.layout.height}px`;
  element.style.width = `${node.layout.width}px`;
  element.style.top = `${node.layout.y}px`;
  element.style.left = `${node.layout.x}px`;

  // style - props
  element.style.backgroundColor = `${node.props['background-color']}`

  return element;
}
