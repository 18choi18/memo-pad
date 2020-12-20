import Memo from './components/Memo/Memo';
import { memoService } from './services/memo.service';

(async function bootstrap() {
  const wrapper = document.querySelector('.wrap');
  const memos: Memo[] = [];

  const savedMemos = await memoService.getMemos();
  savedMemos.forEach((memo) => createMemo(memo));

  let activedMemo = memos.find((memo) => memo.isActive);
  let dragTarget = { memo: null, layerX: 0 };

  window.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    const createdMemo = createMemo({ top: evt.clientY, left: evt.clientX });
    changeActivedMemo(createdMemo);
  });

  window.addEventListener('dragstart', (evt) => {
    if (evt.layerY >= 15) {
      evt.preventDefault();
    } else {
      dragTarget = { memo: memos.find((memo) => memo.ref === evt.target), layerX: evt.layerX };
    }
  });

  window.addEventListener('dragover', (evt) => {
    if (!dragTarget.memo) return;
    dragTarget.memo.top = evt.clientY;
    dragTarget.memo.left = evt.clientX - dragTarget.layerX;
    dragTarget.memo.render();
  });

  window.addEventListener('change-actived-memo', (evt) => changeActivedMemo(evt.detail));

  window.addEventListener('delete-memo', function (evt) {
    const index = memos.findIndex((memo) => memo === evt.detail);
    if (index < 0) return;
    memos[index].destroy();
    memos.splice(index, 1);
  });

  window.addEventListener('beforeunload', () => {
    memoService.saveMemos(memos);
  });

  function createMemo(memoData) {
    const memo = new Memo(memoData as Memo);
    memo.mount(wrapper);
    memos.push(memo);
    return memo;
  }

  function changeActivedMemo(newActivedMemo) {
    if (activedMemo) {
      activedMemo.isActive = false;
      activedMemo.render();
    }
    activedMemo = newActivedMemo;
  }
})();
