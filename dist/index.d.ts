export type Bound = Record<'top' | 'right' | 'bottom' | 'left', number>
export default function bindMove(
  el: HTMLElement,
  boundInfo: Partial<Bound>,
): void
export declare function bindDrag(
  el: HTMLElement,
  boundInfo: Partial<Bound>,
): void
