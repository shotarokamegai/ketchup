import Link from 'next/link'
import Image from 'next/image'

export default function List(props) {
  return(
    <li className={props.className}>
      <Link href={props.item ? `/works/${props.item.id}` : ''}>
        <a>
          <div className="img">
            <Image height="00" width="00" src={props.item ? props.item._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url:""} alt={props.item && props.item.title} />
          </div>
          <div className="detail">
              <p className="title bold futura" dangerouslySetInnerHTML={{__html: props.item && props.item.title.rendered}}></p>
              <p className="categories futura">
                  {props.item && props.thisCategories.slice( 0, -1 )}
              </p>
          </div>
        </a>
      </Link>
    </li>
  )
};