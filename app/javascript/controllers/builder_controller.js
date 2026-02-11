import { Controller } from "@hotwired/stimulus"
import { BuilderEngine } from "../builder/engine"

export default class extends Controller {
  static values = { elements: Object };

  connect() {
    this.engine = new BuilderEngine(this.element, this.elementsValue);
    this.engine.render();
  }
};
