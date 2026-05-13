// import { useState, useEffect } from 'react'
// import { collection, getDocs, orderBy, query } from 'firebase/firestore'
// import { db } from '@/lib/firebase'
// import type { Post } from '@/types'
// import {mockPosts} from '@/data/mockData'

// interface UsePostsResult {
//   posts: Post[]
//   loading: boolean
//   error: string | null
// }

// export function usePosts(): UsePostsResult {
//   const [posts, setPosts] = useState<Post[]>([])
//   // const [loading, setLoading] = useState(true)
//   // const [error, setError] = useState<string | null>(null)

//   useEffect(() => {

//     setPosts(mockPosts);
//     // async function fetchPosts() {
//     //   try {
//     //     const q = query(
//     //       collection(db, 'posts'),
//     //       orderBy('date', 'desc')
//     //     )
//     //     const snapshot = await getDocs(q)
//     //     const fetched = snapshot.docs.map((doc) => ({
//     //       id: doc.id,
//     //       ...doc.data(),
//     //       date: doc.data().date.toDate(),
//     //     })) as Post[]

//     //     setPosts(fetched)
//     //   } catch (err) {
//     //     setError('Failed to load posts.')
//     //     console.error(err)
//     //   } finally {
//     //     setLoading(false)
//     //   }
//     // }

//     // fetchPosts()
//   }, [])

//   // return { posts, loading, error }
// }
