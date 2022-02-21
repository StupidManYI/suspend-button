/*** src/index.ts  ***/
import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
var _ = require('lodash');


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

const _isMobile = (): boolean => {
  let flag = (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i).test(navigator.userAgent);
  return flag;
}


const MyComponent: React.FC = (props: any) => {
  const { img, style, onClick } = props;
  const SpanRef = useRef<HTMLDivElement>(null);
  const [buttonStatus, setButtonStatus] = useState<buttonStatusType>(defaultButtonStatus);

  // 移动触发
  const onTouchStart = (e: any) => {
    console.log('====================================');
    console.log("onTouchStart");
    console.log('====================================');
    let buttonStatusCopy = _.cloneDeep(buttonStatus);
    const current = SpanRef.current as HTMLDivElement;
    e = e.touches[0];

    buttonStatusCopy.click = true

    buttonStatusCopy.oW = e.clientX - current.getBoundingClientRect().left
    buttonStatusCopy.oH = e.clientY - current.getBoundingClientRect().top

    buttonStatusCopy.htmlWidth = document.documentElement.clientWidth
    buttonStatusCopy.htmlHeight = document.documentElement.clientHeight

    buttonStatusCopy.bWidth = current.offsetWidth
    buttonStatusCopy.bHeight = current.offsetHeight

    buttonStatusCopy.oLeft = e.clientX - buttonStatusCopy.oW
    buttonStatusCopy.oTop = e.clientY - buttonStatusCopy.oH

    buttonStatusCopy.moving = true;
    setButtonStatus(buttonStatusCopy);
  }
  const onMouseDown = (e: any) => {

    let buttonStatusCopy = _.cloneDeep(buttonStatus);
    const current = SpanRef.current as HTMLDivElement;
    buttonStatusCopy.click = true

    buttonStatusCopy.oW = e.clientX - current.offsetLeft;
    buttonStatusCopy.oH = e.clientY - current.offsetTop;
    buttonStatusCopy.htmlWidth = document.documentElement.clientWidth
    buttonStatusCopy.htmlHeight = document.documentElement.clientHeight

    buttonStatusCopy.bWidth = current.offsetWidth
    buttonStatusCopy.bHeight = current.offsetHeight

    buttonStatusCopy.oLeft = e.clientX - buttonStatusCopy.oW
    buttonStatusCopy.oTop = e.clientY - buttonStatusCopy.oH

    buttonStatusCopy.moving = true;
    setButtonStatus(buttonStatusCopy);

  }

  useEffect(() => {
    if (!_isMobile()) {
      if (buttonStatus.moving) {
        console.log('====================================');
        console.log("onMouseDown", buttonStatus.moving);
        console.log(buttonStatus.oW);
        console.log('====================================');
        document.onmousemove = onMouseMove2;
        document.onmouseup = onMouseUp2;
      } else {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }

    return () => {
      // document.onmousemove = null;
      // document.onmouseup = null;
    }
  }, [buttonStatus.moving])

  // 移动结束
  const onTouchEnd = (e: any) => {
    let buttonStatusCopy = _.cloneDeep(buttonStatus);;
    const current = SpanRef.current as HTMLDivElement;
    buttonStatusCopy.moving = false

    current.className = current.className + " t-suspend-button-animate"

    // 左侧距离
    let oLeft = buttonStatusCopy.oLeft
    if (oLeft < (buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth) / 2) {
      oLeft = 0
    } else {
      oLeft = buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth
    }

    if (buttonStatusCopy.click) {
      onClick();
    }
    // }
    // if(oTop < 0) {
    //   oTop = 0
    // } else if (oTop > this.htmlHeight - this.bHeight) {
    //   oTop = this.htmlHeight - this.bHeight
    // }
    buttonStatusCopy.oLeft = oLeft;
    setButtonStatus(buttonStatusCopy);
  }



  // 开始移动
  const onTouchMove = (e: any) => {
    const current = SpanRef.current as HTMLDivElement;
    current.className = "t-suspend-button"
    buttonStatus.moving && onMove(e)
  }

  // 移动中
  const onMove = (e: any) => {
    e = e.touches[0]
    console.log(e);

    let buttonStatusCopy = _.cloneDeep(buttonStatus);
    buttonStatusCopy.click = false

    // 左侧距离
    let oLeft = e.clientX - buttonStatusCopy.oW
    let oTop = e.clientY - buttonStatusCopy.oH
    if (oLeft < 0) {
      oLeft = 0
    } else if (oLeft > buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth) {
      oLeft = buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth
    }
    if (oTop < 0) {
      oTop = 0
    } else if (oTop > buttonStatusCopy.htmlHeight - buttonStatusCopy.bHeight) {
      oTop = buttonStatusCopy.htmlHeight - buttonStatusCopy.bHeight
    }
    buttonStatusCopy.oLeft = oLeft;
    buttonStatusCopy.oTop = oTop;
    setButtonStatus(buttonStatusCopy);
  }

  const onMouseMove = ((e: any) => {
    if (!buttonStatus.moving) return;
    const current = SpanRef.current as HTMLDivElement;
    let buttonStatusCopy = _.cloneDeep(buttonStatus);
    current.className = "t-suspend-button"
    const event = e || window.event;
    var moveX = event.clientX - buttonStatus.oW;
    var moveY = event.clientY - buttonStatus.oH;
    if (moveX < 0) {
      moveX = 0
    } else if (moveX > window.innerWidth - current.offsetWidth) {
      moveX = window.innerWidth - current.offsetWidth
    }
    if (moveY < 0) {
      moveY = 0
    } else if (moveY > window.innerHeight - current.offsetHeight) {
      moveY = window.innerHeight - current.offsetHeight
    }

    buttonStatusCopy.oLeft = moveX + 'px';;
    buttonStatusCopy.oTop = moveY + 'px'
    setButtonStatus(buttonStatusCopy);
  });
  const onMouseMove2 = ((e: any) => {
    console.log('====================================');
    console.log("onMouseMove2");
    console.log('====================================');
    let buttonStatusCopy = _.cloneDeep(buttonStatus);
    buttonStatusCopy.click = false
    const event = e || window.event;
    // 左侧距离
    let oLeft = event.clientX - buttonStatusCopy.oW
    let oTop = event.clientY - buttonStatusCopy.oH
    if (oLeft < 0) {
      oLeft = 0
    } else if (oLeft > buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth) {
      oLeft = buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth
    }
    if (oTop < 0) {
      oTop = 0
    } else if (oTop > buttonStatusCopy.htmlHeight - buttonStatusCopy.bHeight) {
      oTop = buttonStatusCopy.htmlHeight - buttonStatusCopy.bHeight
    }
    buttonStatusCopy.oLeft = oLeft;
    buttonStatusCopy.oTop = oTop;
    setButtonStatus(buttonStatusCopy);
  });
  const onMouseUp = ((e: any) => {
    if (!buttonStatus.moving) return;
    const current = SpanRef.current as HTMLDivElement;
    let buttonStatusCopy = _.cloneDeep(buttonStatus);

    buttonStatusCopy.moving = false

    current.className = current.className + " t-suspend-button-animate"

    // 左侧距离
    let oLeft = buttonStatusCopy.oLeft
    if (oLeft < (buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth) / 2) {
      oLeft = 0
    } else {
      oLeft = buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth
    }

    // if (buttonStatusCopy.click) {
    //   onClick();
    // }
    // }
    // if(oTop < 0) {
    //   oTop = 0
    // } else if (oTop > this.htmlHeight - this.bHeight) {
    //   oTop = this.htmlHeight - this.bHeight
    // }
    buttonStatusCopy.oLeft = oLeft;
    setButtonStatus(buttonStatusCopy);
  });
  const onMouseUp2 = ((e: any) => {
    console.log('====================================');
    console.log("onMouseUp2");
    console.log('====================================');
    let buttonStatusCopy = _.cloneDeep(buttonStatus);;
    const current = SpanRef.current as HTMLDivElement;
    buttonStatusCopy.moving = false

    current.className = current.className + " t-suspend-button-animate"

    // 左侧距离
    let oLeft = buttonStatusCopy.oLeft
    if (oLeft < (buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth) / 2) {
      oLeft = 0
    } else {
      oLeft = buttonStatusCopy.htmlWidth - buttonStatusCopy.bWidth
    }

    if (buttonStatusCopy.click) {
      onClick();
    }
    // }
    // if(oTop < 0) {
    //   oTop = 0
    // } else if (oTop > this.htmlHeight - this.bHeight) {
    //   oTop = this.htmlHeight - this.bHeight
    // }
    buttonStatusCopy.oLeft = oLeft;
    setButtonStatus(buttonStatusCopy);
  });


  useEffect(() => {
    if (_isMobile()) {
      SpanRef.current?.addEventListener(
        "touchmove",
        e => {
          if (e.cancelable) {
            e.preventDefault()
          }
        },
        {
          passive: false
        }
      )
    }


    return () => {

    }
  }, [])

  return <span
    className="t-suspend-button"
    ref={SpanRef}
    onTouchStart={e => onTouchStart(e)}
    onMouseDown={e => onMouseDown(e)}
    onTouchMove={e => onTouchMove(e)}
    onTouchEnd={e => onTouchEnd(e)}
    style={{
      left: `${buttonStatus.oLeft}px`,
      top: `${buttonStatus.oTop}px`,
      ...style
    }}
  >
    {img && <img src={img} alt="" />}
  </span>
}
export default MyComponent;
