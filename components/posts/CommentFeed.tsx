import CommentItem from "./CommentItem"

interface CommentFeedProps {
  comments?: Record<string, any>[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  if (!comments?.length) comments = []
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  )
}

export default CommentFeed