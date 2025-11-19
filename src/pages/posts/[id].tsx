// src/pages/posts/[id].tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Author from '../../components/author'
import styles from "./id.module.css"

type Post = {
  title: string;
  date: string;
  author: {
    name: string;
    avatar?: {
      url: string;
      width?: number;
      height?: number;
    };
  };
  body: string;
  visual?: {
    url: string;
    width?: number;
    height?: number;
  };
};

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null); // ← 型つけた！
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const endpoint = `https://${import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/posts/${id}`;
        const res = await fetch(endpoint, {
          headers: {
            "X-MICROCMS-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
          },
        });

        const json = await res.json();
        setPost(json);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!post) return <p>記事が見つかりませんでした。</p>;

  return (
    <>
      <title>{`${import.meta.env.VITE_APP_NAME} | ${post.title}`}</title>
      <section>
        <article className={styles.container}>
          <header className={styles.head}>
            <time dateTime={post.date}>
              {new Date(post.date ?? 0).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <h1>{post.title}</h1>
            <Author author={post.author} />
          </header>

          {post.visual && (
            <img
              src={post.visual.url}
              alt={post.title}
              width={post.visual.width}
              height={post.visual.height}
              className={styles.visual}
            />
          )}

          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <Link to="/posts" className={styles.link}>
            Back to posts
          </Link>
        </article>
      </section>
    </>
  );
}
