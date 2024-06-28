import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link'
import Arrow from './svg/arrow'

export default function List(props) {
  gsap.registerPlugin(ScrollTrigger)
  const scrollAnimation = () => {
    let addactive = document.getElementsByClassName('addactive');

    for (let i = 0; i < addactive.length; i++) {
      let elm = addactive[i];
      let start = `top center+=${window.innerHeight/4}`;
      if (elm.classList.contains('blur')) {
        start = `top center`;
      }
      gsap.to(elm, {
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: elm,
          start: start, 
          onEnter: () => {
            elm.classList.add('active');
            if (elm.classList.contains('show')) {
              setTimeout(() => {
                elm.classList.add('nowillchange');
              }, 3000)
            }
          }
        }
      });
    }
  }
  useEffect(() => {
    scrollAnimation();
  },[])
  return(
    <li className={`${props.className} box${props.item.id} slide-parent`} id={`box${props.item.id}`}>
      <div className="box-inner">
        <Link href={props.item ? `/works/${props.item.id}` : ''} scroll={false}>
          <a>
            <div className={`${!props.item['acf']['sp_thumbnail'] ? 'img-wrap only-pc addactive': 'img-wrap addactive'}`}>
            <div className={`img img${props.item.id}`}>
              <div className={`cover cover${props.item.id}`}></div>
              {props.item['acf']['sp_thumbnail'] &&
                <picture className={`picture${props.item.id}`}>
                  <source srcSet={props.item['acf']['pc_thumbnail']} media="(min-width: 750px)" />
                  <img layout='fill' src={props.item['acf']['sp_thumbnail']} alt={props.item && props.item.title.rendered} />
                </picture>
              }
              {!props.item['acf']['sp_thumbnail'] &&
                <>
                    <img layout='fill' src={props.item['acf']['pc_thumbnail']} alt={props.item && props.item.title.rendered} />
                </>
              }
            </div>
            </div>
            <div className="detail slide-text">
              <div className="slide-cover">
                <div className="slide-cover-left"></div>
                <div className="slide-cover-right"></div>
              </div>
              <div className="detail-above">
                <div className="flex relative">
                  <p dangerouslySetInnerHTML={{__html: `(${props.item.id})`}} className="index roc-grotesk light red"></p>
                  <p dangerouslySetInnerHTML={{__html: props.item && props.item.title.rendered}} className="title roc-grotesk red"></p>
                  <div className="arrow">
                    <Arrow color="bg-red stroke" />
                  </div>
                </div>
                <p className="categories roc-grotesk medium red">
                  {props.item && props.thisCategories.slice( 0, -1 )}
                </p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </li>
  )
};