// src/pages/posts/index.tsx
import { useEffect, useState } from "react";
import PostList from "../../components/post";
import styles from "./index.module.css"

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0); // ← 全件数を保存
  const limit = 3;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const endpoint = `https://${import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/posts`;
        const res = await fetch(
          `${endpoint}?offset=${(page - 1) * limit}&limit=${limit}`,
          {
            headers: {
              "X-MICROCMS-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        setPosts(data.contents || []);
        setTotalCount(data.totalCount || 0); // ← 総件数も取得
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  // 総ページ数
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
    <title>{`${import.meta.env.VITE_APP_NAME} | Posts ${page}-${totalPages}` }</title>
    <section>
      <div className={styles.container}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <PostList posts={posts} className={styles.posts} pagination={true} limit={limit} />

            {/* ページネーション */}
            <nav className={styles.pagination}>
              <div className={styles.arrow}>

              
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className={styles.prev}
              >
                
              </button>

              

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className={styles.next}
              >
                
              </button>
              </div>
              <p style={{ margin: "0 10px" }}>
               {page} / {totalPages}
              </p>
            </nav>
            
          </>
        )}
      </div>
    </section>
    </>
  );
}
