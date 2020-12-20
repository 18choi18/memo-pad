import html from './Memo.html';
let zIndexStep = 1;

export default class Memo {
  top: number;
  left: number;
  width? = 200;
  height? = 100;
  zIndex? = 1;
  content? = '';
  ref: HTMLElement;
  isActive = true;

  constructor(memo: Memo) {
    Object.keys(memo).forEach((key) => {
      this[key] = memo[key];
    });
  }

  mount(parent: Element) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    const memo = template.content.firstChild;
    this.ref = memo as HTMLElement;
    this.render();
    parent.appendChild(memo);
    this.didMount();
  }

  render() {
    const memo = this.ref;
    memo.style.top = `${this.top}px`;
    memo.style.left = `${this.left}px`;
    memo.style.zIndex = String(this.isActive ? this.zIndex + 10000 : this.zIndex);
    const textarea = memo.querySelector('.content .textarea') as HTMLElement;
    textarea.style.width = `${this.width}px`;
    textarea.style.height = `${this.height}px`;
    textarea.innerHTML = this.content;
  }

  private didMount() {
    this.addActiveHandler();
    this.addDeleteHandler();
    const textarea = this.ref.querySelector('.textarea');
    textarea.focus();
    this.addResizeHandler(textarea);
    this.addInputHandler(textarea);
  }

  destroy() {
    this.ref.remove();
  }

  private addActiveHandler() {
    this.ref.addEventListener('mousedown', () => {
      if (!this.isActive) {
        this.isActive = true;
        this.zIndex = ++zIndexStep;
        this.render();
        window.dispatchEvent(new CustomEvent('change-actived-memo', { detail: this }));
      }
    });
  }

  private addDeleteHandler() {
    this.ref.querySelector('.btn_close').addEventListener('mousedown', () => {
      window.dispatchEvent(new CustomEvent('delete-memo', { detail: this }));
    });
  }

  private addResizeHandler(textarea) {
    new ResizeObserver(() => {
      this.width = textarea.offsetWidth;
      this.height = textarea.offsetHeight;
    }).observe(textarea);
  }

  private addInputHandler(textarea) {
    textarea.addEventListener('input', () => {
      this.content = textarea.value;
    });
  }
}
