import axios from "axios"

export default async function getStaticProps() {
  Promise.resolve()
.then(() => axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed`))
.then((response) => {
    // if (!isMounted) {
    //     setPage((page) => page+1)
    //     setData((data) => data.concat(response.data))
    //     setMaxPage(parseInt(response.headers['x-wp-totalpages']))

    //     if (maxPage === page) {
    //         console.log('last')
    //     }
    // }
    // setMounted(true)
    // return axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/categories`)
    console.log(response)
    return {
      props: {
        response,
      },
    }
})
.then(response => {
  // setCategories(response.data)
})
.catch(e => {
  console.log(e)
})
.finally(() => {
    // setMounted(false)
})
  // const res = await axios.get(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp-json/wp/v2/posts?_embed`)
  // const posts = await res

  // console.log(posts)
  // // By returning { props: { posts } }, the Blog component
  // // will receive `posts` as a prop at build time
  // return {
  //   props: {
  //     posts,
  //   },
  // }
}

// Promise.resolve()
// .then(() => axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/posts?_embed&page=${page}`))
// .then((response) => {
//     if (!isMounted) {
//         setPage((page) => page+1)
//         setData((data) => data.concat(response.data))
//         setMaxPage(parseInt(response.headers['x-wp-totalpages']))

//         if (maxPage === page) {
//             console.log('last')
//         }
//     }
//     setMounted(true)
//     return axios.get(`${process.env.REACT_APP_API_URL}/wp-json/wp/v2/categories`)
// })
// .then(response => {
//   setCategories(response.data)
// })
// .catch(e => {
//   console.log(e)
// })
// .finally(() => {
//     setMounted(false)
// })
