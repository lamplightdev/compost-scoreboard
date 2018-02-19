import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import CompostRepeatMixin from '../../../node_modules/@lamplightdev/compost/src/repeat-mixin.js';

class Buttons extends CompostRepeatMixin(CompostMixin(HTMLElement)) {
  render() {
    return super.render(`
    <style>
      :host {
        display: block;
      }
    </style>

    <h2>Buttons</h2>
    `);
  }

  constructor() {
    super();

    this.increment = this.increment.bind(this);
  }

  getTemplateString() {
    return '<button></button>';
  }

  getKey(value) {
    return value.id;
  }

  updateItem(el, value) {
    el.innerText = value.id;
    el.dataset.id = value.id;

    this.on(el, 'click', this.increment);
  }

  increment(event) {
    this.fire('x-increment', {
      id: event.target.dataset.id,
    });
  }
}

customElements.define('x-buttons', Buttons);
