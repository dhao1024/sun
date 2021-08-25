export function getOffsetToParent(
  child,
  parent,
  { align = 'top-left' } = {},
) {
  if (!child) return {};
  parent = parent || child.parentElement;
  if (!(parent instanceof Element)) {
    align = parent.align || align;
    parent = child.parentElement;
  }

  let top = child.offsetTop;
  let left = child.offsetLeft;
  if (child.offsetParent !== parent) {
    top -= parent.offsetTop;
    left -= parent.offsetLeft;
  }

  const offsetWidth = parent.offsetWidth - child.offsetWidth;
  const offsetHeight = parent.offsetHeight - child.offsetHeight;
  switch (align) {
    case 'center':
      top -= offsetHeight * 0.5;
      left -= offsetWidth * 0.5;
      break;
    case 'bottom-right':
      top -= offsetHeight;
      left -= offsetWidth;
      break;
    case 'top-right':
      left -= offsetWidth;
      break;
    case 'bottom-left':
      top -= offsetHeight;
      break;
    case 'top-left':
    default:
      break;
  }

  return { top, left };
}

/* you may need it when using `event delegation` */
export function getChildTarget(event, parent) {
  parent = parent || event.currentTarget;
  let { target } = event;
  if (target === parent) {
    // not hit any child elements
    return null;
  }

  while (target.parentElement !== parent) {
    target = target.parentElement;
  }

  return target;
}
