import CompostMixin from '../../../node_modules/@lamplightdev/compost/src/compost-mixin.js';
import './list.js';
import './buttons.js';

class App extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      items: {
        type: Array,
        value: [],
        observer: 'observeItems',
      },
    };
  }

  render() {
    return `
    <style>
      :host {
        display: block;
      }
    </style>

    <button on-click="addItem">Add</button>

    <h1>Scoreboard</h1>

    <x-buttons></x-buttons>
    <x-list></x-list>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.on(this, 'x-increment', this.increment);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.off(this, 'x-increment', this.increment);
  }

  observeItems(oldValue, newValue) {
    const list = this.$s.querySelector('x-list');
    const buttons = this.$s.querySelector('x-buttons');

    list.items = newValue.slice().sort((a, b) => {
      const scoreDiff = b.score - a.score;
      return scoreDiff !== 0 ? scoreDiff : a.id - b.id;
    });
    buttons.items = newValue;
  }

  addItem() {
    this.items = this.items.slice();
    this.items.push({
      id: this.items.length,
      score: 0,
    });
  }

  increment(event) {
    const id = parseInt(event.detail.id, 10);

    const itemIndex = this.items.findIndex(item => item.id === id);
    const thisItem = this.items[itemIndex];

    const newItems = this.items.slice();
    newItems[itemIndex] = {
      id: thisItem.id,
      score: thisItem.score + 1,
    };

    this.items = newItems;
  }
}

customElements.define('x-app', App);
