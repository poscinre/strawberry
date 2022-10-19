'use strict';

const strawberry_SIZE = 80;
const FIELD_TOP_PADDING = 50;

export const ItemType = Object.freeze({
  strawberry: 'strawberry',
  spider: 'spider',
});

export class Field {
  constructor(strawberryCount, spiderCount) {
    this.strawberryCount = strawberryCount;
    this.spiderCount = spiderCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.onFieldClickListener = this.onFieldClickListener.bind(this);
    this.field.addEventListener('click', this.onFieldClickListener);
  }

  init() {
    this.field.innerHTML = '';
    this.addItem(this.strawberryCount, 'img/strawberry.png', 'strawberry');
    this.addItem(this.spiderCount, 'img/spider.png', 'spider');
  }

  setItemClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  addItem(count, imgPath, className) {
    const x1 = 0;
    const x2 = this.fieldRect.width - strawberry_SIZE;
    const y1 = this.field.offsetTop + FIELD_TOP_PADDING;
    const y2 = this.field.offsetTop + this.fieldRect.height - strawberry_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.userDrag = 'none';
      this.field.appendChild(item);
    }
  }

  onFieldClickListener(event) {
    const target = event.target;
    if (target.matches('.strawberry')) {
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.strawberry);
    } else if (target.matches('.spider')) {
      this.onItemClick && this.onItemClick(ItemType.spider);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
