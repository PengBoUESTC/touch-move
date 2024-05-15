function bindMove(el, boundInfo) {
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
  let startPos = {}
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
function bindDrag(el, boundInfo) {
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
  let startPos = {}
  el.addEventListener('dragstart', (e) => {
    const { left, top } = el.getBoundingClientRect()
    const offsetX = e.clientX - left
    const offsetY = e.clientY - top
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', '')
    }
    startPos = {
      startX: offsetX,
      startY: offsetY,
    }
  })
  document.addEventListener('dragover', function (event) {
    event.preventDefault()
  })
  el.addEventListener('dragend', (e) => {
    e.stopPropagation()
    e.preventDefault()
    const { clientHeight, clientWidth } = document.documentElement
    const { clientHeight: h } = el
    const { top, right, bottom, left } = bound
    let nextX = e.clientX - startPos.startX
    let nextY = e.clientY - startPos.startY
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

export { bindDrag, bindMove as default }
