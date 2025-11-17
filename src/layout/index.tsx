 import { Outlet, useLocation } from 'react-router-dom'
 import Header from '../components/header'
 import Footer from '../components/footer'
 

 export default function RootLayout() {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return (
    <>
     <Header layout={isHome ? "home" : "default"} />
       <main>
         <Outlet />
       </main>
      <Footer />
    </>
  );
}
// function RootLayout() {
//   return (
//     <>
//     <Header />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   )
// }
 
 export {
   RootLayout,
 }

