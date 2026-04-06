import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'
import { routes } from './routes'

const PageLoader: React.FC = () => (
  <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#F4F7FB' 
    }}>
    <CircularProgress sx={{ color: '#1890FF' }} />
  </Box>
)

const App: React.FC = () => {
  const element = useRoutes(routes)

  return (
    <Suspense fallback={<PageLoader />}>
      {element}
    </Suspense>
  )
}

export default App
