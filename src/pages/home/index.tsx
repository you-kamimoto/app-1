// src/pages/home/index.tsx
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import AboutSection from "../../components/about";
import PostList from "../../components/post";
import styles from "./index.module.css"

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const endpoint = `https://${import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/posts`;
        const res = await fetch(endpoint, {
          headers: {
            "X-MICROCMS-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
          },
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data.contents || []); // ← null防止
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
    <title>{`${import.meta.env.VITE_APP_NAME} | Home` }</title>
      <section className={styles.sec01}>
        <div className={styles.container}>
          <AboutSection
            title="React + Vite Project, and deploy it on Vercel."
            text={
              <>
                Welcome to my personal website 👋<br />
                Here, you'll find information about my projects, and my blog posts.
              </>
            }
            className={styles.about}
            classes={{
            wrapper: styles.Wrapper,
            text: styles.aboutText,
          }}
          />
          <Link
            to="/about"
            prefetch="viewport"
            className={styles.link}
          >
            About Me
          </Link>
        </div>
      </section>

      <section className={styles.sec02}>
        <div className={styles.container}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <PostList posts={posts} className={styles.posts} limit={limit} pagination={false} />
          )}
          <Link
            to="/posts"
            prefetch="viewport"
            className={styles.link}
          >
            All Posts
          </Link>
        </div>
      </section>
    </>
  );
}
