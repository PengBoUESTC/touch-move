/**
 * 
 * @param el HTMLElement
 * @param bound number[] => [top, right, bottom, left], drag bound value
 */
export default function bindMove(el: HTMLElement, bound: Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>) {
  Object.assign({
    top: 70, right: 20, bottom: 50, left: 20
  }, bound)
  el.style.position = 'fixed';
  let startPos = {} as { diffLeft: number; diffRight: number; diffTop: number; diffBottom: number };

  el.addEventListener('touchstart', e => {
    const { clientY, clientX } = e.touches[0];
    const curBound = el.getBoundingClientRect();

    startPos = {
      diffLeft: clientX - curBound.left,
      diffRight: clientX - curBound.right,
      diffTop: clientY - curBound.top,
      diffBottom: clientY - curBound.bottom,
    };
  });

  // 为 el 添加事件
  el.addEventListener('touchmove', e => {
    e.stopPropagation();
    e.preventDefault();
    const { clientHeight, clientWidth } = document.documentElement;
    const { clientHeight: h } = el;
    const { top, right, bottom, left } = bound;
    const { clientY, clientX } = e.touches[0];

    const { diffTop, diffLeft } = startPos;

    let nextPos = clientY - diffTop;
    nextPos = nextPos > clientHeight - bottom - h ? clientHeight - bottom - h : nextPos;
    nextPos = nextPos < top ? top : nextPos;
    el.style.top = `${nextPos}px`;

    nextPos = clientX - diffLeft;
    nextPos = nextPos > clientWidth - left ? clientWidth - left : nextPos;
    nextPos = nextPos < right ? right : nextPos;
    el.style.left = `${nextPos}px`;
  });
}