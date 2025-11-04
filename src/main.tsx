import { StrictMode, Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider, Link, NavLink, Outlet } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/global.css'

const Home       = lazy(() => import('./pages/home'))
const About      = lazy(() => import('./pages/about'))
const Posts      = lazy(() => import('./pages/posts'))
const PostDetail = lazy(() => import('./pages/posts/[id]'))
const NotFound   = lazy(() => import('./pages/_not-found'))

const router = createBrowserRouter([
  {
    Component: () => (
      <>
        <header>
          <div>
            <Link to="/">
              <img
                src={`https://github.com/identicons/${import.meta.env.VITE_GIT_NAME}.png`}
                alt={`${import.meta.env.VITE_GIT_NAME}`}
                width={420}
                height={420}
              />
            </Link>
            <p>{import.meta.env.VITE_GIT_NAME}</p>
          </div>
          <nav>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/posts">Posts</NavLink>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>© {import.meta.env.VITE_GIT_NAME}</footer>
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'posts', element: <Posts /> },
      { path: 'posts/:id', element: <PostDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<p>loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)