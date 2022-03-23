/*** src/index.ts  ***/
import React, { useRef, useState, useEffect } from 'react';
import './styles.css';


type buttonStatusType = {
  oW: number,
  oH: number,
  htmlWidth: number, // 页面宽度
  htmlHeight: number,
  bWidth: number, // 悬钮宽度
  bHeight: number,
  offsetLeft: number,
  offsetTop: number,
}



const initButtonStatus: buttonStatusType = {
  oW: 0,
  oH: 0,
  htmlWidth: 0, // 页面宽度
  htmlHeight: 0,
  bWidth: 0, // 悬钮宽度
  bHeight: 0,
  offsetLeft: 0,
  offsetTop: 0,
}
type Size = {
  width: number, height: number
}

let moving = false;

const MyComponent: React.FC = (props: any) => {
  const { img, style, onClick } = props;
  const BtRef = useRef<HTMLDivElement>(null);
  const [buttonStatus, setButtonStatus] = useState<buttonStatusType>(initButtonStatus);
  const [transationRecord, setTransationRecord] = useState({ offsetLeft: 0, offsetTop: 0 })
  const [click, setClick] = useState(false);
  const [screenSize, setScreenSize] = useState<Size>({ width: 0, height: 0 });
  const [buttonSize, setButtonSize] = useState<Size>({ width: 0, height: 0 });


  /**
   * ----------PC
   */
  /**
   * 鼠标按下,阻止默认事件,开启click确认
   * @param e 
   */
  const onClickDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setClick(true);
  }

  /**
   * 鼠标松开,判断是点击还是移动,处理对应的事件
   * @param e 
   */
  const onClickUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setClick(false);
    if (!moving) {
      clickHandler();
    } else {
      document.onmousemove = null;
      const current = BtRef.current as HTMLDivElement;
      current.className = current.className + " suspend-button-ts-animate";
      let offsetLeft = transationRecord.offsetLeft
      if (offsetLeft < (screenSize.width - buttonSize.width) / 2) {
        offsetLeft = 0
      } else {
        offsetLeft = screenSize.width - buttonSize.width
      }
      setTransationRecord(Object.assign({}, transationRecord, { offsetLeft: offsetLeft }));
      moving = false;
    }
  }

  /**
   * 执行click方法
   */
  const clickHandler = (() => {
    onClick();
  })

  /**
   * 移动中
   */
  useEffect(() => {
    if (click) {
      document.body.style.userSelect = 'none'
      document.onmousemove = (event) => {
        if (!click) return;
        moving = true;
        event = event || window.event;
        let moveX = event.clientX - buttonSize.width / 2; //x轴偏移量
        let moveY = event.clientY - buttonSize.height / 2;//y轴偏移量
        if (moveX < 0) {
          moveX = 0
        } else if (moveX > screenSize.width - buttonSize.width) {
          moveX = screenSize.width - buttonSize.width;
        }
        if (moveY < 0) {
          moveY = 0
        } else if (moveY > screenSize.height - buttonSize.height) {
          moveY = screenSize.height - buttonSize.height;
        }
        const transationRecord = { offsetLeft: moveX, offsetTop: moveY };
        setTransationRecord(transationRecord);
      }

    } else {
      if (document.onmousemove != null) {
        document.onmousemove = null;
        document.body.style.userSelect = 'auto'
      }
    }
    return () => {
      document.onmousemove = null;
    }
  }, [click])

  /**
   * 初始化函数,获取拖拽 dom大小 以及 屏幕大小
   */
  useEffect(() => {
    setScreenSize({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight })
    const currentButton = BtRef.current as HTMLDivElement;
    setButtonSize({ width: currentButton.clientWidth, height: currentButton.clientHeight })

    return () => {

    }
  }, [])


  /**
   * ----------WAP
   */
  const onTouchStart = ((e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setClick(true);
  });

  const onTouchMove = ((e: React.TouchEvent<HTMLDivElement>) => {
    let event = e.touches[0] as any;//any大法助我
    document.body.style.userSelect = 'none'; //让其他元素不可以选中
    moving = true;
    if (!click) return;
    moving = true;
    let moveX = event.clientX - buttonSize.width / 2; //x轴偏移量
    let moveY = event.clientY - buttonSize.height / 2;//y轴偏移量
    if (moveX < 0) {
      moveX = 0
    } else if (moveX > screenSize.width - buttonSize.width) {
      moveX = screenSize.width - buttonSize.width;
    }
    if (moveY < 0) {
      moveY = 0
    } else if (moveY > screenSize.height - buttonSize.height) {
      moveY = screenSize.height - buttonSize.height;
    }
    const transationRecord = { offsetLeft: moveX, offsetTop: moveY };
    setTransationRecord(transationRecord);
  });

  const onTouchEnd = ((e: React.TouchEvent<HTMLDivElement>) => {
    setClick(false);
    if (!moving) {
      clickHandler();
    } else {
      const current = BtRef.current as HTMLDivElement;
      current.className = current.className + " suspend-button-ts-animate";
      let offsetLeft = transationRecord.offsetLeft
      if (offsetLeft < (screenSize.width - buttonSize.width) / 2) {
        offsetLeft = 0
      } else {
        offsetLeft = screenSize.width - buttonSize.width
      }
      setTransationRecord(Object.assign({}, transationRecord, { offsetLeft: offsetLeft }));
      moving = false;
    }
  });



  return <div
    className="suspend-button-ts"
    ref={BtRef}
    onMouseDown={onClickDown}
    onMouseUp={onClickUp}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}

    style={{
      transform: `translate3d(${transationRecord.offsetLeft}px,${transationRecord.offsetTop}px,0px)`,
      ...style
    }}
  >
    {img && <img src={img} />}
  </div>
}
export default MyComponent;
