// 获取角度值
export const getAngle = (deg) => {
  return Math.PI * (deg / 180);
}
// 自动计算每个文字所占的角度
const getTextDeg = (r, fontSize = 14) => {
  return (fontSize / (2 * Math.PI * r)) * 360;
}
// 创建圆弧文字dom对象
export const createArtElement = (
  str,
  dom = '',
  {
    startDeg = 0,
    r = 50,
    fontSize = 14,
    color = '#333',
    clockwise = true,
    hasBg = false,
    backgroundColor = '#409EFF',
    backgroundClassName = 'arc-text-bg',
    handleClick = () => { console.log('handle-click') }
  }
) => {
  // 传入的是否为dom元素
  let element = null;
  if (dom instanceof HTMLElement) {
    element = dom;
  } else {
    element = document.getElementById(dom.replace('#', ''));
  }
  if (!element) {
    throw new Error('传入的dom元素不存在');
  }

  const len = str.length;
  const div = document.createElement('div');
  div.setAttribute('style', 'width: 100%;height:100%;position:relative;left:0;top:0');
  const fontSizeNum = Number(`${fontSize}`.replace('px', ''));
  const textDeg = getTextDeg(r, fontSizeNum);
  r = r + fontSizeNum / 2;
  const oneTextDeg = Math.round(fontSizeNum / 2 / (Math.PI * r) * 180)
  for (let i = 0; i < len; i++) {
    const span = document.createElement('span');
    span.innerText = str[i];
    // 旋转角度
    let deg = 0;
    if (clockwise) {
      deg = startDeg - i * textDeg;
    } else {
      deg = startDeg + i * textDeg;
    }

    // 旋转角度值
    const angle = getAngle(deg);
    // 计算元素定位位置
    const left = `${Math.round(r + r * Math.cos(angle)) - fontSizeNum}px`;
    const top = `${Math.round(r - r * Math.sin(angle))}px`;

    // 设置元素样式 transform: rotate(${90 - deg}deg);
    span.setAttribute('style', `
      width: ${fontSizeNum}px;
      height: ${fontSizeNum}px;
      line-height: ${fontSizeNum}px;
      text-align: center;
      font-size: ${fontSizeNum}px;
      color: ${color};
      position: absolute;
      left: ${left};
      top: ${top};
      transform-origin: right top;
      transform: rotate(${90 - deg - (i === 0 ? 0 : oneTextDeg)}deg);
      z-index: 30000;
      pointer-events: none;
    `);
    div.appendChild(span);
  }

  // element.style.position = 'relative';
  if (hasBg) {
    const endDeg = clockwise ? (startDeg - textDeg * len + oneTextDeg * 2) : (startDeg + textDeg * len);
    createArcTextBg(element, { startDeg: startDeg + (clockwise ? oneTextDeg * 2.5 : 0), endDeg, r, width: fontSizeNum + 8, clockwise, backgroundColor, backgroundClassName, handleClick })
  }
  element.appendChild(div);
}

// 创建圆弧文字背景dom对象
export const createArcTextBg = (
  dom = '',
  {
    r = 50,
    width = 20,
    startDeg = 0,
    endDeg = 80,
    backgroundColor = '#409EFF',
    className = 'arc-text-bg',
    clockwise = true,
    handleClick = () => { console.log('handle-click') }
  }
) => {
  // 传入的是否为dom元素
  let element = null;
  if (dom instanceof HTMLElement) {
    element = dom;
  } else {
    element = document.getElementById(dom.replace('#', ''));
  }
  if (!element) {
    throw new Error('传入的dom元素不存在');
  }
  const innerR = r - width;
  // 外圆弧旋转角度值
  const startAngle = getAngle(startDeg);
  const endAngle = getAngle(endDeg);
  // 计算外圆弧位置
  const startLeft = `${Math.round(r + r * Math.cos(startAngle))}`;
  const startTop = `${Math.round(r - r * Math.sin(startAngle))}`;
  const endLeft = `${Math.round(r + r * Math.cos(endAngle))}`;
  const endTop = `${Math.round(r - r * Math.sin(endAngle))}`;
  // 计算内圆弧位置
  const startLeftInner = `${Math.round(r + innerR * Math.cos(startAngle))}`;
  const startTopInner = `${Math.round(r - innerR * Math.sin(startAngle))}`;
  const endLeftInner = `${Math.round(r + innerR * Math.cos(endAngle))}`;
  const endTopInner = `${Math.round(r - innerR * Math.sin(endAngle))}`;

  // 创建dom元素
  const div = document.createElement('div');
  // 添加class属性
  div.setAttribute('class', className);
  const rotationDeg = Math.abs(endDeg - startDeg);
  // 添加clip-path属性
  const clipPathList = [
    `M ${startLeft} ${startTop}`,
    `A ${r} ${r} ${rotationDeg} ${rotationDeg > 180 ? 1 : 0} ${clockwise ? 1 : 0} ${endLeft} ${endTop}`,
    `L ${endLeftInner} ${endTopInner}`,
    `A ${innerR} ${innerR} ${rotationDeg} ${rotationDeg > 180 ? 1 : 0} ${clockwise ? 0 : 1} ${startLeftInner} ${startTopInner}`,
  ]
  div.setAttribute('style', `
    clip-path: path('${clipPathList.join(' ')}');
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20000;
    background-color: ${backgroundColor}`
  );
  // 设置背景颜色
  div.style.backgroundColor = backgroundColor;
  console.log(handleClick)
  div.addEventListener('click', handleClick);

  element.append(div)
}

