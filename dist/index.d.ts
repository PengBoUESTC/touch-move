export type Bound = Record<'top' | 'right' | 'bottom' | 'left', number>
export declare function bindDrag(
  el: HTMLElement,
  boundInfo: Partial<Bound>,
): {
  remvoeDragStart: () => void
  removeDragOver: () => void
  removeDragEnd: () => void
}
export declare function bindTouch(
  el: HTMLElement,
  boundInfo: Partial<Bound>,
): {
  removeTouchStart: () => void
  removeTouchMove: () => void
}
export default function bindMove(
  el: HTMLElement,
  boundInfo: Partial<Bound>,
):
  | {
      remvoeDragStart: () => void
      removeDragOver: () => void
      removeDragEnd: () => void
    }
  | {
      removeTouchStart: () => void
      removeTouchMove: () => void
    }
