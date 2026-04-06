import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    background: 'url(/assets/images/background_shape.png) no-repeat center center',
                    backgroundSize: 'cover'
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '6rem', md: '10rem' },
                        fontWeight: 900,
                        color: '#1890FF',
                        textShadow: '0 10px 30px rgba(24,144,255,0.3)',
                        mb: 0
                    }}
                >
                    404
                </Typography>
                
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: '#172B4D'
                    }}
                >
                    Oops! Page Not Found.
                </Typography>
                
                <Typography
                    variant="body1"
                    sx={{
                        color: '#6B778C',
                        mb: 4,
                        maxWidth: '500px'
                    }}
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/feed')}
                    sx={{
                        backgroundColor: '#1890FF',
                        borderRadius: '12px',
                        padding: '12px 32px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#096dd9',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(24,144,255,0.4)'
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    Take Me Home
                </Button>
            </Box>
        </Container>
    )
}

export default NotFoundPage
