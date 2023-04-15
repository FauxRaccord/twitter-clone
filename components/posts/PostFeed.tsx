import usePosts from "@/hooks/usePosts";
import PostItem from "./PostsItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({
  userId
}) => {
  const { data: posts = [] } = usePosts(userId)
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem
          key={posts.id}
          userId={userId}
          data={post}
        />
      )
      )}
    </>
  )
}

export default PostFeed