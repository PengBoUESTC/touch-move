export type Bound = Record<'top' | 'right' | 'bottom' | 'left', number>
/**
 *
 * @param el HTMLElement
 * @param bound number[] => [top, right, bottom, left], drag bound value
 */
export default function bindMove(el: HTMLElement, boundInfo: Partial<Bound>) {
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

  el.addEventListener('touchstart', (e) => {
    const { clientY, clientX } = e.touches[0]
    const curBound = el.getBoundingClientRect()

    startPos = {
      diffLeft: clientX - curBound.left,
      diffRight: clientX - curBound.right,
      diffTop: clientY - curBound.top,
      diffBottom: clientY - curBound.bottom,
    }
  })

  // 为 el 添加事件
  el.addEventListener('touchmove', (e) => {
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
  })
}

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
  el.addEventListener('dragstart', (e: DragEvent) => {
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
  })
  document.addEventListener('dragover', function (event) {
    // 阻止默认行为以允许放置
    event.preventDefault()
  })
  el.addEventListener('dragend', (e) => {
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
  })
}
