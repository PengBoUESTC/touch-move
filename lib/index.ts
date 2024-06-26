export type Bound = Record<'top' | 'right' | 'bottom' | 'left', number>

export function bindDrag(el: HTMLElement, boundInfo: Partial<Bound>) {
  const bound = Object.assign(
    {
      top: 70,
      right: 20,
      bottom: 50,
      left: 20,
    },
    boundInfo,
  )
  el.style.position = 'fixed'
  el.draggable = true
  let startPos = {} as { startX: number; startY: number }

  const dragStartHandler = (e: DragEvent) => {
    // 计算鼠标指针相对于元素左上角的偏移量
    const { left, top } = el.getBoundingClientRect()
    const offsetX = e.clientX - left
    const offsetY = e.clientY - top
    if (e.dataTransfer) {
      // 设置拖动效果
      e.dataTransfer.effectAllowed = 'move'
      // 必须设置setData，否则拖动可能不会发生
      e.dataTransfer.setData('text/plain', '')
    }

    startPos = {
      startX: offsetX,
      startY: offsetY,
    }
  }
  el.addEventListener('dragstart', dragStartHandler)

  const dragOverHandler = (event: DragEvent) => {
    // 阻止默认行为以允许放置
    event.preventDefault()
  }
  document.addEventListener('dragover', dragOverHandler)
  const dragEndHandler = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const { clientHeight, clientWidth } = document.documentElement
    const { clientHeight: h } = el
    const { top, right, bottom, left } = bound
    // 计算新位置
    let nextX = e.clientX - startPos.startX
    let nextY = e.clientY - startPos.startY

    // 更新元素的位置
    nextY =
      nextY > clientHeight - bottom - h ? clientHeight - bottom - h : nextY
    nextY = nextY < top ? top : nextY
    el.style.top = `${nextY}px`
    nextX = nextX > clientWidth - left ? clientWidth - left : nextX
    nextX = nextX < right ? right : nextX
    el.style.left = `${nextX}px`
    startPos = {
      startX: nextX,
      startY: nextY,
    }
  }
  el.addEventListener('dragend', dragEndHandler)

  // remove event
  const remvoeDragStart = () =>
    el.removeEventListener('dragstart', dragStartHandler)
  const removeDragOver = () =>
    document.removeEventListener('dragover', dragOverHandler)
  const removeDragEnd = () => el.removeEventListener('dragend', dragEndHandler)

  return {
    remvoeDragStart,
    removeDragOver,
    removeDragEnd,
  }
}

export function bindTouch(el: HTMLElement, boundInfo: Partial<Bound>) {
  const bound: Bound = Object.assign(
    {
      top: 70,
      right: 20,
      bottom: 50,
      left: 20,
    },
    boundInfo,
  )
  el.style.position = 'fixed'
  let startPos = {} as {
    diffLeft: number
    diffRight: number
    diffTop: number
    diffBottom: number
  }

  const touchStartHandler = (e: TouchEvent) => {
    const { clientY, clientX } = e.touches[0]
    const curBound = el.getBoundingClientRect()

    startPos = {
      diffLeft: clientX - curBound.left,
      diffRight: clientX - curBound.right,
      diffTop: clientY - curBound.top,
      diffBottom: clientY - curBound.bottom,
    }
  }
  el.addEventListener('touchstart', touchStartHandler)

  const touchMoveHandler = (e: TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const { clientHeight, clientWidth } = document.documentElement
    const { clientHeight: h } = el
    const { top, right, bottom, left } = bound
    const { clientY, clientX } = e.touches[0]

    const { diffTop, diffLeft } = startPos

    let nextPos = clientY - diffTop
    nextPos =
      nextPos > clientHeight - bottom - h ? clientHeight - bottom - h : nextPos
    nextPos = nextPos < top ? top : nextPos
    el.style.top = `${nextPos}px`

    nextPos = clientX - diffLeft
    nextPos = nextPos > clientWidth - left ? clientWidth - left : nextPos
    nextPos = nextPos < right ? right : nextPos
    el.style.left = `${nextPos}px`
  }
  // 为 el 添加事件
  el.addEventListener('touchmove', touchMoveHandler)
  // remove event
  const removeTouchStart = () =>
    el.removeEventListener('touchstart', touchStartHandler)
  const removeTouchMove = () =>
    el.removeEventListener('touchmove', touchMoveHandler)

  return {
    removeTouchStart,
    removeTouchMove,
  }
}

/**
 *
 * @param el HTMLElement
 * @param bound number[] => [top, right, bottom, left], drag bound value
 */
export default function bindMove(el: HTMLElement, boundInfo: Partial<Bound>) {
  // 使用 CSS 媒体查询和 window.matchMedia 来检测设备是否支持触摸：
  if (window.matchMedia('(pointer: coarse)').matches) {
    return bindTouch(el, boundInfo)
  }
  return bindDrag(el, boundInfo)
}
