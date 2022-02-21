/*** src/index.ts  ***/
import React, { useRef, useState } from 'react';
import './styles.css';

type buttonStatusType = {
  moving: boolean,
  oW: number,
  oH: number,
  htmlWidth: number, // 页面宽度
  htmlHeight: number,
  bWidth: number, // 悬钮宽度
  bHeight: number,
  oLeft: number,
  oTop: number,
  click: boolean // 是否是点击
}

const defaultButtonStatus: buttonStatusType = {
  moving: false,
  oW: 0,
  oH: 0,
  htmlWidth: 0, // 页面宽度
  htmlHeight: 0,
  bWidth: 0, // 悬钮宽度
  bHeight: 0,
  oLeft: 0,
  oTop: 0,
  click: false // 是否是点击
}



const MyComponent: React.FC = (props: any) => {

  const { img, style } = props;
  const SpanRef = useRef<HTMLDivElement>(null);
  const [buttonStatus, setButtonStatus] = useState<buttonStatusType>(defaultButtonStatus);

  // 移动触发
  const onTouchStart = (e: any) => {
    let current = SpanRef.current as HTMLDivElement;
    e = e.touches[0]
    buttonStatus.click = true

    buttonStatus.oW = e.clientX - current.getBoundingClientRect().left
    buttonStatus.oH = e.clientY - current.getBoundingClientRect().top

    buttonStatus.htmlWidth = document.documentElement.clientWidth
    buttonStatus.htmlHeight = document.documentElement.clientHeight

    buttonStatus.bWidth = current.offsetWidth
    buttonStatus.bHeight = current.offsetHeight

    let oLeft = e.clientX - buttonStatus.oW
    let oTop = e.clientY - buttonStatus.oH

    buttonStatus.moving = true;

  }


  return <span
    className="t-suspend-button"
    ref={SpanRef}
    onTouchStart={e => this.onTouchStart(e)}
    onTouchMove={e => this.onTouchMove(e)}
    onTouchEnd={e => this.onTouchEnd(e)}
    style={{
      left: `${this.state.oLeft}px`,
      top: `${this.state.oTop}px`,
      ...style
    }}
  >
    {img && <img src={img} alt="" />}
  </span>
}
export default MyComponent;
