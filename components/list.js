import Link from 'next/link'
import Image from 'next/image'

export default function List(props) {
  const onLoad = (e) => {
    if (e.target.srcset) {
      e.target.dataset.load = "done";
    }
  };
  return(
    <li className={props.className}>
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