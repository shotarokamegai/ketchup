'use strict';

/**
 * @example
 * import BrowserUtil from 'utils/BrowserUtil';
 * let ua = BrowserUtil.getUserAgent();
 */
export default class BrowserUtil
{
  /**
  * [static] getUserAgent
  * UserAgentを取得します.
  */
  static getUserAgent()
  {
    const ua = navigator.userAgent;
    if(ua.indexOf("iPhone") != -1) return "IPHONE";
    else if(ua.indexOf("Android") != -1) return "ANDROID";
    else if(ua.indexOf("iPad") != -1) return "IPAD";
    return "PC";
  };

  /**
  * [static] isSP
  * モバイル端末かを判別します.
  */
  static isSP()
  {
    const ua = navigator.userAgent;
    if((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) return true;
    return false;
  };

  /**
  * [static] isTablet
  * タブレットかを判別します.
  */
  static isTablet()
  {
    const ua = navigator.userAgent;
    if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1) return true;
    return false;
  };
  
  static checkSpWebView()
  {
    const ua = navigator.userAgent.toLowerCase();
    const isTW = /twitter/.test(ua);
    const isFB = /fbav/.test(ua);
    const isLN = /line/.test(ua);

    if(isTW || isFB || isLN) return true;
    else return false;
  };


  static isWindows()
  {
    return navigator.userAgent.toLowerCase().indexOf('windows') > 0;
  };

  /**
   * Androidバージョンを返す
   * @return version : number --> 4.2, 5.0 など
   */
  static getAndroidVersion()
  {
    let version = -1;
    const ua = navigator.userAgent;
    if( ua.indexOf("Android") > 0 )
    {
      version = parseFloat(ua.slice(ua.indexOf("Android")+8));
    }

    return version;
  };

  /**
   * android標準ブラウザかどうか
   */
  static isAndroidAOSP()
  {
    let isNormalBrowser = false;
    if(BrowserUtil.getAndroidVersion() <= 4.4 && BrowserUtil.getUserAgent() == "ANDROID")
    {
      if('AudioContext' in window)
      {

      }
      else
      {
        isNormalBrowser = true;
      }
    }
    return isNormalBrowser;
  };
  
  /**
   * iOSバージョンを返す
   * @return version : 百倍されたnumber 9.2 --> 920
   */
  static getiOSVersion()
  {
    let version = -1;
    const ios_ua = navigator.userAgent;
    if( ios_ua.indexOf("iPhone") > 0)
    {
      ios_ua.match(/iPhone OS (\w+){1,3}/g);
      version = (RegExp.$1.replace(/_/g, '')+'00').slice(0,3);
    }
    else if(ios_ua.indexOf("iPad") > 0)
    {
      ios_ua.match(/CPU OS (\w+){1,3}/g);
      version = (RegExp.$1.replace(/_/g, '')+'00').slice(0,3);
    }

    return version;
  };

  static getBrowser(){
    const ua = navigator.userAgent.toLowerCase();
    const ver = navigator.appVersion.toLowerCase();
    let name = 'unknown';

    if (ua.indexOf("msie") != -1){
      if (ver.indexOf("msie 6.") != -1){
        name = 'ie6';
      }else if (ver.indexOf("msie 7.") != -1){
        name = 'ie7';
      }else if (ver.indexOf("msie 8.") != -1){
        name = 'ie8';
      }else if (ver.indexOf("msie 9.") != -1){
        name = 'ie9';
      }else if (ver.indexOf("msie 10.") != -1){
        name = 'ie10';
      }else{
        name = 'ie';
      }
    }else if(ua.indexOf('trident/7') != -1){
        name = 'ie11';
    }else if (ua.indexOf('edge') != -1){
      name = 'edge';
      }else if (ua.indexOf('chrome') != -1){
        name = 'chrome';
      }else if (ua.indexOf('safari') != -1){
        name = 'safari';
      }else if (ua.indexOf('opera') != -1){
        name = 'opera';
      }else if (ua.indexOf('firefox') != -1){
        name = 'firefox';
    }
    return name;
  };

  /**
  * [static] getLocationSearch
  * ページのパラメータを全て取得します.
  */
  // static getLocationSearch()
  // {
  //   if(window.location.search) return window.location.search.substring(1,window.location.search.length);
  //   return null;
  // };


  /**
  * [static] getQuery
  * ページのパラメータをオブジェクトで返します.
  */
  static getQuery(){
    let query = window.location.search;
    let params = {};
    if(query)
    {
      let reg = query.match(/(.*)(\?)(.*)/);
      if(RegExp.$3) {
        let a = RegExp.$3.split("&");
        if(a)
        {
          for( let k=0; k<a.length; k++ )
          {
            let p = a[k].split("=");
            if(p[0]) params[p[0]] = p[1];
          }
        } else return false;
      } else return false;
    } else return false;
    return params;
  };

  /**
  * [static] removeQuery
  * ページのパラメータを消す
  */
  static removeQuery()
  {
    if(window.history && window.history.pushState)
    {
      let url = location.href;

      if(url.indexOf("?") > -1)
      {
        url = url.split("?")[0];
        window.history.pushState("", document.title, url);
      }
    }
  }
}