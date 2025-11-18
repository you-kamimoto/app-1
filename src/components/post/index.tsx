// src/components/post/index.tsx
import { Link } from "react-router-dom";
import Author from '../author'
import styles from './index.module.css'

type PostListProps = {
  posts: any[];
  limit?: number;
  pagination?: boolean;
  className?: string;
};

const PostList = ({ posts, limit, pagination: _pagination, className }: PostListProps) => {
  // limitが指定されていれば制限をかける
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className={`${styles.posts} ${className ?? ''}`}>
      {displayPosts.map((post) => (
        <article key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.visual && (
              <img src={post.visual.url} alt={post.title} width={post.visual.width} height={post.visual.height} />
            )}</Link>
          <time dateTime={post.date}>
            {new Date(post.date ?? 0).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <h2>{post.title}</h2>
          <Author author={post.author} />
        </article>
      ))}
    </div>
  );
};

export default PostList;
