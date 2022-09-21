import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link'
import Image from 'next/image'

export default function List(props) {
  gsap.registerPlugin(ScrollTrigger)
  const onLoad = (e) => {
    if (e.target.srcset) {
      e.target.dataset.load = "done";
    let animation1 = gsap.timeline();
    let animation2 = gsap.timeline();
    let animation3 = gsap.timeline();
    let scrub;
    if (props.type === 'list') {
      if (props.index % 2 === 0) {
        scrub = true;
      } else {
        scrub = 1;
      }
    } else {
      if (props.index % 3 === 0) {
        scrub = .333333;
      } else if (props.index % 2 === 0) {
        scrub = 1;
      } else {
        scrub = .666666;
      }
    }
    if (process.browser) {
      ScrollTrigger.create({
        animation: animation1,
        trigger: `.box${props.item.id}`,
        start: `top bottom+=${window.innerHeight*.1}`,
        end: `top bottom-=${window.innerHeight*.4}`,
        // end: `bottom bottom+=${window.innerHeight*.5}`,
        scrub: scrub,
        invalidateOnRefresh: true,
        // markers: true
      });
      // ScrollTrigger.create({
      //   animation: animation2,
      //   trigger: `.cover${props.item.id}`,
      //   start: `top bottom-=${window.innerHeight*.1}`,
      //   end: `top bottom-=${window.innerHeight*.7}`,
      //   // end: `bottom bottom+=${window.innerHeight*.5}`,
      //   scrub: scrub,
      //   invalidateOnRefresh: true,
      //   // markers: true
      // });
      ScrollTrigger.create({
        animation: animation3,
        trigger: `.img${props.item.id}`,
        start: `top bottom-=${window.innerHeight*.1}`,
        end: `top bottom-=${window.innerHeight*.5}`,
        // end: `bottom bottom+=${window.innerHeight*.5}`,
        scrub: true,
        invalidateOnRefresh: true,
        // once: true,
        toggleActions: "play pause resume reset",
        onEnterBack: () => {
          if (props.index === 0) {
            // document.getElementsByClassName(`img${props.item.id}`)[0].classList.add('show')
          }
        },
        onEnter: () => {
          if (props.index === 0) {
            console.log('onEnter')
          }
          if (document.getElementsByClassName(`img${props.item.id}`).length) {
            document.getElementsByClassName(`img${props.item.id}`)[0].classList.add('show')
          }
        },
        onLeaveBack: () => {
          if (props.index === 0) {
          // document.getElementsByClassName(`img${props.item.id}`)[0].classList.remove('show')
          }
        },
        onLeave: () => {
          if (props.index === 0) {
            console.log('onLeave')
          }
          // document.getElementsByClassName(`img${props.item.id}`)[0].classList.remove('show')
        }
        // markers: true
      });
      animation1.to(`.box${props.item.id}`, {y: -150},0)
      // animation2.to(`.cover${props.item.id}`, {y: '-100%'},0)
      // animation3.to(`.img${props.item.id}`, {scale: 1},0)
      if (props.index === props.max-1) {
        let loadBtn = gsap.timeline();
        ScrollTrigger.create({
          animation: loadBtn,
          trigger: `#load-more`,
            start: "top bottom",
            end: `top bottom-=${window.innerHeight*.5}`,
          scrub: 1,
          invalidateOnRefresh: true,
          // markers: true
        });
        loadBtn.to(`#load-more`, {y: -50},0)
      }
      // ScrollTrigger.refresh()
      }
    }
  };
  useEffect(() => {
  },[])
  return(
    <li className={`${props.className} box${props.item.id}`}>
      <Link href={props.item ? `/works/${props.item.id}` : ''} scroll={false}>
        <a>
          <div className="img-wrap">
          <div className={`img img${props.item.id}`}>
            <div className={`cover cover${props.item.id}`}></div>
            <Image placeholder="blur" blurDataURL={props.item._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} layout='fill' objectFit="contain" src={props.item._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} alt={props.item && props.item.title} onLoad={onLoad} />
          </div>
          </div>
          <div className="detail futura slide-text">
              <p dangerouslySetInnerHTML={{__html: props.item && props.item.title.rendered}} className="title bold">
              </p>
              <p className="categories">
                {props.item && props.thisCategories.slice( 0, -1 )}
              </p>
              <div className="inner">
                <div className="inner-slide">
                  <p dangerouslySetInnerHTML={{__html: props.item && props.item.title.rendered}} className="title bold">
                  </p>
                  <p className="categories">
                    {props.item && props.thisCategories.slice( 0, -1 )}
                  </p>
                </div>
              </div>
          </div>
        </a>
      </Link>
    </li>
  )
};