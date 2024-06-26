import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link'
import Image from 'next/image'
import imagesLoaded from 'imagesloaded'
import Arrow from './svg/arrow'

export default function List(props) {
  gsap.registerPlugin(ScrollTrigger)
  const onLoad = (e) => {
    // scrollAnimation();
    // if (e.target.srcset) {
      // imagesLoaded(`.box${props.item.id}`,(e) => {
      //   // e.target.dataset.load = "done";
      //   let animation1 = gsap.timeline();
      //   // let animation2 = gsap.timeline();
      //   let animation3 = gsap.timeline();
      //   let y;
      //   let scrub;
      //   if (props.type === 'list') {
      //     y = -150;
      //     if (props.index % 2 === 0) {
      //       scrub = true;
      //     } else {
      //       scrub = 1;
      //     }
      //     if (window.innerWidth < 750) {
      //       y = -100;
      //     }
      //   } else {
      //     if (window.innerWidth < 750) {
      //       y = -50
      //       if (props.index % 2 === 0) {
      //         scrub = true;
      //       } else {
      //         scrub = 1;
      //       }
      //     } else {
      //       y = -100;
      //       if (props.index % 3 === 0) {
      //         scrub = .333333;
      //       } else if (props.index % 2 === 0) {
      //         scrub = 1;
      //       } else {
      //         scrub = .666666;
      //       }
      //     }
      //   }
      //   if (process.browser) {
      //     ScrollTrigger.create({
      //       animation: animation1,
      //       trigger: `.box${props.item.id}`,
      //       start: `top bottom+=${window.innerHeight*.1}`,
      //       end: `top bottom-=${window.innerHeight*.4}`,
      //       scrub: scrub,
      //       invalidateOnRefresh: true,
      //       // markers: true
      //     });
      //     ScrollTrigger.create({
      //       animation: animation3,
      //       trigger: `.img${props.item.id}`,
      //       start: `top bottom-=${window.innerHeight*.1}`,
      //       end: `top bottom-=${window.innerHeight*.5}`,
      //       // end: `bottom bottom+=${window.innerHeight*.5}`,
      //       scrub: true,
      //       invalidateOnRefresh: true,
      //       // once: true,
      //       toggleActions: "play pause resume reset",
      //       onEnterBack: () => {
      //         if (props.index === 0) {
      //           // document.getElementsByClassName(`img${props.item.id}`)[0].classList.add('show')
      //         }
      //       },
      //       onEnter: () => {
      //         if (props.index === 0) {
      //           console.log('onEnter')
      //         }
      //         if (document.getElementsByClassName(`img${props.item.id}`).length) {
      //           document.getElementsByClassName(`img${props.item.id}`)[0].classList.add('show')
      //         }
      //       },
      //       onLeaveBack: () => {
      //         if (props.index === 0) {
      //         // document.getElementsByClassName(`img${props.item.id}`)[0].classList.remove('show')
      //         }
      //       },
      //       onLeave: () => {
      //         if (props.index === 0) {
      //           console.log('onLeave')
      //         }
      //         // document.getElementsByClassName(`img${props.item.id}`)[0].classList.remove('show')
      //       }
      //       // markers: true
      //     });
      //     animation1.to(`.box${props.item.id}`, {y: y},0)
      //     if (props.index === props.max-1) {
      //       let loadBtn = gsap.timeline();
      //       ScrollTrigger.create({
      //         animation: loadBtn,
      //         trigger: `#load-more`,
      //           start: "top bottom",
      //           end: `top bottom-=${window.innerHeight*.5}`,
      //         scrub: 1,
      //         invalidateOnRefresh: true,
      //         // markers: true
      //       });
      //       loadBtn.to(`#load-more`, {y: -50},0)
      //     }
      //     }
      //   });
      }
  useEffect(() => {
    onLoad();
    // const list = document.getElementById(`box${props.item.id}`);
    // if (list) {
    //   if (!list.classList.contains('done')) {
    //     imagesLoaded( list, () => {
    //       list.classList.add('show');
    //     })
    //   } else {
    //     list.classList.add('done');
    //   }
    // }
  },[])
  // },[props])
  console.log(props)
  return(
    <li className={`${props.className} box${props.item.id}`} id={`box${props.item.id}`}>
      <div className="box-inner">
        <Link href={props.item ? `/works/${props.item.id}` : ''} scroll={false}>
          <a>
            <div className="img-wrap">
            <div className={`img img${props.item.id}`}>
              <div className={`cover cover${props.item.id}`}></div>
              <picture className={`picture${props.item.id}`}>
                <source srcSet={props.item['acf']['pc_thumbnail']} media="(min-width: 750px)" />
                <img layout='fill' src={props.item['acf']['sp_thumbnail']} alt={props.item && props.item.title.rendered} />
              </picture>
            </div>
            </div>
            <div className="detail slide-text">
                <div className="flex detail-above">
                  <p dangerouslySetInnerHTML={{__html: '(01)'}} className="index roc-grotesk light red"></p>
                  <p dangerouslySetInnerHTML={{__html: props.item && props.item.title.rendered}} className="title roc-grotesk red"></p>
                  <div className="arrow">
                    <Arrow color="bg-red stroke" />
                  </div>
                </div>
                <p className="categories roc-grotesk medium red">
                  {props.item && props.thisCategories.slice( 0, -1 )}
                </p>
                <div className="inner-slide bg-red">
                  <div className="inner-slide-slide">
                    <div className="flex detail-above">
                      <p dangerouslySetInnerHTML={{__html: '(01)'}} className="index roc-grotesk light white"></p>
                      <p dangerouslySetInnerHTML={{__html: props.item && props.item.title.rendered}} className="title roc-grotesk white"></p>
                      <div className="arrow">
                        <Arrow color="bg-white stroke" />
                      </div>
                    </div>
                    <p className="categories roc-grotesk white medium">
                      {props.item && props.thisCategories.slice( 0, -1 )}
                    </p>
                  </div>
                </div>
            </div>
          </a>
        </Link>
      </div>
    </li>
  )
};