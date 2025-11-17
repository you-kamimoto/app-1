import './styles/layres.css'
import './styles/global.css'
import { StrictMode, Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { RootLayout } from './layout'

const Home       = lazy(() => import('./pages/home'))
const About      = lazy(() => import('./pages/about'))
const Posts      = lazy(() => import('./pages/posts'))
const PostDetail = lazy(() => import('./pages/posts/[id]'))
const NotFound   = lazy(() => import('./pages/_not-found'))

const router = createBrowserRouter([
  {
    element: <RootLayout />,
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