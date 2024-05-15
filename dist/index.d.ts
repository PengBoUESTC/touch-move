export type Bound = Record<'top' | 'right' | 'bottom' | 'left', number>
export declare function bindDrag(
  el: HTMLElement,
  boundInfo: Partial<Bound>,
): void
export declare function bindTouch(
  el: HTMLElement,
  boundInfo: Partial<Bound>,
): void
export default function bindMove(
  el: HTMLElement,
  boundInfo: Partial<Bound>,
): void
