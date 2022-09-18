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
    let animation = gsap.timeline();
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
        animation: animation,
        trigger: `.box${props.item.id}`,
        start: `top bottom+=${window.innerHeight*.1}`,
        end: `top bottom-=${window.innerHeight*.4}`,
        // end: `bottom bottom+=${window.innerHeight*.5}`,
        scrub: scrub,
        invalidateOnRefresh: true,
        // markers: true
      });
      animation.to(`.box${props.item.id}`, {y: -150, opacity:1},0)
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
      ScrollTrigger.refresh()
      }
    }
  };
  useEffect(() => {
  },[])
  return(
    <li className={`${props.className} box${props.item.id}`}>
      <Link href={props.item ? `/works/${props.item.id}` : ''}>
        <a>
          <div className="img">
            <Image placeholder="blur" blurDataURL={props.item._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} layout='fill' objectFit="contain" src={props.item._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} alt={props.item && props.item.title} onLoad={onLoad} />
          </div>
          <div className="detail">
              <p className="title bold" dangerouslySetInnerHTML={{__html: props.item && props.item.title.rendered}}></p>
              <p className="categories futura">
                  {props.item && props.thisCategories.slice( 0, -1 )}
              </p>
          </div>
        </a>
      </Link>
    </li>
  )
};