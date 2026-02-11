import { Controller } from "@hotwired/stimulus"
import { BuilderEngine } from "../builder/engine"

export default class extends Controller {
  static values = { elements: Object };
  static targets = ["menu"]

  connect() {
    this.engine = new BuilderEngine(
      this.element,
      this.elementsValue,
      {
        onContext: ({ nodeId, x, y }) => {
          this.openContextMenu(nodeId, x, y);
        }
      }
    );

    this.engine.init();
  };

  addNode() {
    this.engine.addNode({ type: 'container', props: { 'background-color': 'black' } });
  };

  removeNode() {
    this.engine.removeNode(this.activeNodeId);
  };

  openContextMenu(nodeId, x, y) {
    this.activeNodeId = nodeId;
    
    // Open
    this.menuTarget.style.left = `${x}px`;
    this.menuTarget.style.top  = `${y}px`;
    this.menuTarget.style.display = "inline";

    // Close if click on some button
    this.menuTarget.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        this.menuTarget.style.display = "none";
      };
    });

    // Close if mouse leave
    this.menuTarget.addEventListener('mouseleave', () => {
      this.menuTarget.style.display = "none";
    });
  };
};
