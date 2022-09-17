import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link'
import Image from 'next/image'

export default function List(props) {
  const onLoad = (e) => {
    if (e.target.srcset) {
      e.target.dataset.load = "done";
    let animation = gsap.timeline();
    let scrub;
    if (props.index % 2 === 0) {
      scrub = true;
    } else {
      scrub = 1;
    }
    if (process.browser) {
      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.create({
        animation: animation,
        trigger: `.box${props.item.id}`,
        start: "top bottom-=200",
        end: "bottom top+=200",
        scrub: scrub,
        invalidateOnRefresh: true,
        // markers: true
      });
      animation.to(`.box${props.item.id}`, {y: -150},0)
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