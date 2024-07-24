'use strict';

import BrowserUtil from './BrowserUtil';

/**
 * @example
 * import _ from 'utils/Util';
 * _.r(0,100);
 * _.show(element);
 */

export default class Util
{

  // const RAD = Math.PI / 180; //.017453293

  static r(min, max) { return Math.random() * (max - min) + min; }

  static show(el)
  {
    if(!el) return;
    Util.removeClass(el, "dn");
    Util.addClass(el, "db");
  }
  static hide(el)
  {
    if(!el) return;
    Util.addClass(el, "dn");
    Util.removeClass(el, "db");
  }


  static el(id)
  {
    let el = document.getElementById(id);
    if(!el) el = null;
    return el;
  }

  static elClass(c)
  {
    let el = document.getElementsByClassName(c);
    if(!el) el = null;
    return el;
  }

  static find(el, selector)
  {
    if(!el) return;
    return el.querySelectorAll(selector);
  }

  static find1st(el, selector)
  {
    if(!el) return;
    return el.querySelectorAll(selector)[0];
  }

  // static each(selector)
  // {
  //  let elements = document.querySelectorAll(selector);
  //  Array.prototype.forEach.call(elements, function(el, i){

  //  });
  // }
  
  static append(parent, el)
  {
    if(!el) return;
    parent.appendChild(el);
  }

  static empty(el)
  {
    if(!el || !el.innerHTML) return;
    el.innerHTML = '';
  }

  static getAttr(el, prop)
  {
    if(!el) return;
    return el.getAttribute(prop);
  }

  static setAttr(el, prop, val)
  {
    if(!el) return;
    return el.setAttribute(prop, val);
  }

  static html(el, src)
  {
    if(!el || !el.innerHTML) return;
    return el.innerHTML = src;
  }

  static prepend(parent, el)
  {
    if(!el) return;
    parent.insertBefore(el, parent.firstChild);
  }

  static dispose(el)
  {
    if(!el) return;
    el.innerHTML = "";
    el.parentNode.removeChild(el);
  }


  static addEvent(el, type, eventHandler)
  {
    if(!el || !type || !eventHandler) return null;
    el.addEventListener(type, eventHandler, false);
  }


  static removeEvent(el, type, eventHandler)
  {
    if(!el || !type || !eventHandler) return null;
    el.removeEventListener(type, eventHandler, false);
  }

  static getStyle(aElement, aCssProperty)
  {
	  if (aElement.currentStyle) {
	  	return aElement.currentStyle[aCssProperty]; //IE
	  }
	  else {
      let style =  document.defaultView.getComputedStyle(aElement, null)
	  	return style.getPropertyValue(aCssProperty);
	  }
  }

  /**
   * [static] addClass
   * classを追加します
   * IE11でsvgだとコケる
   *
   * @param element:object
   * @param className:string
   */
  static addClass(el, className)
  {
    if(!el) return;
    if(el.classList) el.classList.add(className);
    else
    {
      // t(el.getAttribute('class'));
      el.setAttribute('class', className);
    }
  }

  /**
   * [static] removeClass
   * classを削除します
   * IE11でsvgだとコケる
   *
   * @param element:object
   * @param className:string
   */
  static removeClass(el, className)
  {
    if(!el) return;
    if(el.classList) el.classList.remove(className);
    else
    {
      // t(el.getAttribute('class'));
      el.setAttribute('class', '');
    }
  }

  /**
   * [static] hasClass
   * classを持っているか判別
   *
   * @param element:object
   * @param className:string
   */
  static hasClass(el, className)
  {
    if(!el) return;

    if(el.classList) return el.classList.contains(className);
    else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }

  /**
   * [static] toggleClass
   *
   * @param element:object
   * @param className:string
   */
  static toggleClass(el, className)
  {
    if(!el) return;

    if(el.classList) el.classList.toggle(className);
  }

  static getPageSize()
  {
    let obj = {};
    obj.sx = document.documentElement.scrollLeft || document.body.scrollLeft;
    obj.sy = document.documentElement.scrollTop || document.body.scrollTop;

    obj.ww = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
    obj.wh = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;

    obj.dw = document.documentElement.scrollWidth || document.body.scrollWidth;
    obj.dh = document.documentElement.scrollHeight || document.body.scrollHeight;

    return obj;
  }


  // static offset(el)
  // {
  //   if(!el) return;
  //   let rect = el.getBoundingClientRect();
  //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //   let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  //   return {
  //      top  : rect.top + scrollTop
  //     ,left : rect.left + scrollLeft
  //   }
  // }

  static getRelativePosition(target)
  {
    return { x: target.offsetLeft, y: target.offsetTop }
  }

  static getPosition(target)
  {
    let rect = target.getBoundingClientRect();
    let positionX = rect.left;
    let positionY = rect.top;

    let dElm = document.documentElement, dBody = document.body;
    let scrollX = dElm.scrollLeft || dBody.scrollLeft;
    let scrollY = dElm.scrollTop || dBody.scrollTop;
    let x = positionX + scrollX >> 0;
    let y = positionY + scrollY >> 0;
    // t( "x:" + x + "px , y:" + y + "px" );

    return { x: x, y: y };
  }

  static getRect(el)
  {
    let rect = Util.getPosition(el);
    rect.width = el.offsetWidth;
    rect.height = el.offsetHeight;
    return rect;
  }

  static getW(el)
  {
    if(!el) return;
    // offsetWidth : width + padding + border
    // clientWidth : width + padding
    return el.offsetWidth;
  }

  static getH(el)
  {
    if(!el) return;
    return el.offsetHeight;
  }

  static delayedCall(func, wait)
  {
    let int = setTimeout(func, wait * 1000);
    return int;
  }

  static killDelayedCall(int)
  {
    clearTimeout(int);
  }


  /**
    一文字ずつ足していって指定した行数で三点リーダーを追加
    divのheightは指定しないこと
  */
  // static addEllipsis(el, row = 3, ellipsis = "...")
  // {
  //   let text = el.innerHTML;
  //   if(!el.origin) el.origin = text;

  //   // 1行の高さ取得
  //   el.innerHTML = "a";
  //   let rowHeight = el.clientHeight;
  //   let rowCount = 1;
  //   // 一旦空にする
  //   el.innerHTML = "";

  //   let len = el.origin.length;
  //   for (let i = 0; i < len; i++)
  //   {
  //     let s = el.origin.substring(0, i + 1);
  //     el.innerHTML = s;

  //     let height = el.clientHeight;
  //     if (height > rowHeight)
  //     {
  //       // 高さが変わったら行数インクリメント
  //       rowHeight = height;
  //       rowCount++;
        
  //       // 指定行数になったら2文字削って ellipsis 追加
  //       if(rowCount > row)
  //       {
  //         el.innerHTML = el.origin.substring(0, i - 2) + ellipsis;
  //         break;
  //       }
  //     }
  //   }
  // };

  // static getImageSize(img)
  // {
  //  let obj = { w:null, h:null };

  //  if( img.naturalWidth !== undefined )
  //  {
  //    obj.w = img.naturalWidth;
  //    obj.h = img.naturalHeight;
  //  }
  //  else if( img.runtimeStyle !== undefined ) // IE
  //  {
  //    let style = img.runtimeStyle;

  //    style.width = "auto";
  //    style.height = "auto";

  //    obj.w = img.width;
  //    obj.h = img.height;
  //  }
  //  else // Opera
  //  {
  //    img.removeAttribute("width");
  //    img.removeAttribute("height");

  //    obj.w = img.width;
  //    obj.h = img.height;
  //  }

  //  return obj;
  // }


  // static click(el, func, timing)
  // {
  //  if(!el || !el.addEventListener) return;
  //  if(BrowserUtil.isSP())
  //  {
  //    if(timing == "touchstart")
  //    {
  //      el.addEventListener("touchstart", func);
  //      el.addEventListener("touchend", null);
  //    }
  //    else
  //    {
  //      el.addEventListener("touchstart", null);
  //      el.addEventListener("touchend", func);
  //    }
  //  }
  //  else
  //  {
  //    el.addEventListener("click", func);
  //    el.style.cursor = "pointer" ;
  //  }

  //  //offClick用に返す
  //  return func;
  // }

  // static offClick(el, func, timing)
  // {
  //  if(!el || !el.addEventListener) return;

  //  if(BrowserUtil.isSP())
  //  {
  //    if(timing == "touchstart")
  //    {
  //      el.removeEventListener("touchstart", func);
  //      el.removeEventListener("touchend", null);
  //    }
  //    else
  //    {
  //      el.removeEventListener("touchstart", null);
  //      el.removeEventListener("touchend", func);
  //    }
  //  }
  //  else
  //  {
  //    el.removeEventListener("click", func);
  //    el.style.cursor = "auto";
  //  }
  // }

  // static over(el, func)
  // {
  //  if(!el) return;
  //  el.addEventListener("mouseover", func);

  //  //offOver用に返す
  //  return func;
  // }

  // static offOver(el, func)
  // {
  //  if(!el) return;
  //  el.removeEventListener("mouseover", func);
  // }

  // static out(el, func)
  // {
  //  if(!el) return;
  //  el.addEventListener("mouseout", func);

  //  //offOut用に返す
  //  return func;
  // }

  // static offOut(el, func)
  // {
  //  if(!el) return;
  //  el.removeEventListener("mouseout", func);
  // }


  /**
   * [sortObjectArray] 複製せず配列そのものをソート
   * @param  {[type]} data  array
   * @param  {[type]} key   value
   * @param  {[type]} order asc or desc
   * @return {[type]}       sorted array
   */
  static sortObjectArray(arr, key, order)
  {
   //デフォルトでは降順(DESC)
   let num_a = -1;
   let num_b = 1;

   if(order === 'asc')
   {
     //指定があれば昇順(ASC)
     num_a = 1;
     num_b = -1;
   }

   arr = arr.sort(function(a, b)
   {
     let x = a[key];
     let y = b[key];
     if (x > y) return num_a;
     if (x < y) return num_b;
     return 0;
   });
  };
  
  static shuffle(arr)
  {
    let i, j, temp;
    arr = arr.slice();
    i = arr.length;
    if(i === 0)
    {
      return arr;
    }
    while(--i)
    {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };
}
