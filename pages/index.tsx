import Image from 'next/image'
import Header from '@/components/Header'
import Form from '@/components/Form'
import PostFeed from '@/components/posts/PostFeed'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </div>
  )
}
