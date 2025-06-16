import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Loading from './components/site/Loading'
import Mods from './pages/Mods'
import ProtectedRoutes from './ProtectedRoutes'
import SelectedMod from './components/site/SelectedMod'

export default function App() {

  const Home = lazy(() => import('./pages/Home'))
  const Admin = lazy(() => import('./pages/Admin'))
  const ModLinks = lazy(() => import('./pages/ModLinks'))
  const Page404 = lazy(() => import('./pages/Page404'))
  const Dashboard = lazy(() => import('./pages/Dashboard'))
  const isAdmin = true

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/mods' element={<Mods />} />
          <Route path='/game/slither' element={<ModLinks typegame={"slither"} />} />
          <Route path='/game/minecraft' element={<ModLinks typegame={"minecraft"} />} />
          <Route path='/selectedmod/:modid' element={<SelectedMod />} />

          <Route path="*" element={<Page404 />} />
          <Route element={<ProtectedRoutes user={isAdmin} redirect='/lucky/auth/admin'/>}>
            <Route path='/lucky/auth/dashboard' element={<Dashboard />} />

          </Route>
        
          <Route element={<ProtectedRoutes user={!isAdmin} redirect='/lucky/auth/dashboard'/>}>
            <Route path='/lucky/auth/admin' element={<Admin />} />

          </Route>
        </Routes>



      </Suspense>
    </Router>
  )
}
