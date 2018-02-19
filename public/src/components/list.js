import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import CompostRepeatMixin from '../../../node_modules/@lamplightdev/compost/src/repeat-mixin.js';

class List extends CompostRepeatMixin(CompostMixin(HTMLElement)) {
  render() {
    return super.render(`
    <style>
      :host {
        display: block;
      }
    </style>

    <h2>List</h2>
    `);
  }

  getTemplateString() {
    return '<div></div>';
  }

  getKey(value) {
    return value.id;
  }

  updateItem(el, value) {
    el.innerText = `${value.id} (${value.score})`;
  }
}

customElements.define('x-list', List);
