import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError } from '../store/authSlice'
import { RootState, AppDispatch } from '../store'
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  CircularProgress,
  Alert,
} from '@mui/material'

import BasicInput from '../components/Common/BasicInput'

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!firstName.trim()) newErrors.firstName = 'First name is required'
    if (!lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setFieldErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      const resultAction = await dispatch(registerUser({ firstName, lastName, email, password }))
      if (registerUser.fulfilled.match(resultAction)) {
        navigate('/login')
      }
    }
  }

  return (
    <section className="_social_registration_wrapper _layout_main_wrapper" style={{ padding: 0, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box className="_shape_one">
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
      </Box>
      <Box className="_shape_two">
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </Box>
      <Box className="_shape_three">
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </Box>

      <div className="_social_registration_wrap" style={{ width: '100%' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <img src="/assets/images/registration.png" alt="Image" className="_left_img" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_right_logo _mar_b28">
                  <img src="/assets/images/logo.svg" alt="Image" className="_left_logo" />
                </div>
                <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
                
                {error && (
                  <Alert severity="error" onClose={() => dispatch(clearError())} sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button 
                  fullWidth
                  variant="outlined"
                  className="_social_registration_content_btn _mar_b40"
                  startIcon={<img src="/assets/images/google.svg" alt="Google" className="_google_img" />}
                  sx={{ 
                    textTransform: 'none', 
                    color: 'var(--color2)', 
                    borderColor: 'var(--bcolor1)',
                    borderRadius: '6px',
                    padding: '12px 0',
                    '& span': { fontWeight: 500, fontSize: '16px' }
                  }}
                >
                  Register with google
                </Button>

                <div className="_social_registration_content_bottom_txt _mar_b40"> <span>Or</span></div>

                <form className="_social_registration_form" onSubmit={handleRegister}>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">First Name</label>
                        <BasicInput
                          required
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value)
                            if (fieldErrors.firstName) setFieldErrors(prev => ({ ...prev, firstName: undefined }))
                          }}
                          error={!!fieldErrors.firstName}
                          helperText={fieldErrors.firstName}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Last Name</label>
                        <BasicInput
                          required
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value)
                            if (fieldErrors.lastName) setFieldErrors(prev => ({ ...prev, lastName: undefined }))
                          }}
                          error={!!fieldErrors.lastName}
                          helperText={fieldErrors.lastName}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Email</label>
                        <BasicInput
                          required
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }))
                          }}
                          error={!!fieldErrors.email}
                          helperText={fieldErrors.email}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Password</label>
                        <BasicInput
                          required
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                            if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }))
                          }}
                          error={!!fieldErrors.password}
                          helperText={fieldErrors.password}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Repeat Password</label>
                        <BasicInput
                          required
                          type="password"
                          placeholder="Repeat your password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            if (fieldErrors.confirmPassword) setFieldErrors(prev => ({ ...prev, confirmPassword: undefined }))
                          }}
                          error={!!fieldErrors.confirmPassword}
                          helperText={fieldErrors.confirmPassword}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <FormControlLabel
                        control={<Checkbox defaultChecked sx={{ color: 'var(--color5)', '&.Mui-checked': { color: 'var(--color5)' } }} />}
                        label={<Typography className="_social_login_form_check_label">I agree to terms & conditions</Typography>}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_login_form_btn _mar_t40 _mar_b60">
                        <Button 
                          fullWidth
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          className="_social_login_form_btn_link _btn1"
                          sx={{
                            height: 'auto',
                            padding: '12px 0',
                            backgroundColor: 'var(--color5)',
                            color: '#fff',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 500,
                            borderRadius: '6px',
                            boxShadow: 'none',
                            '&:hover': { backgroundColor: 'var(--color5)', filter: 'brightness(0.9)' }
                          }}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register now'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_bottom_txt">
                      <p className="_social_login_bottom_txt_para">
                        Already have an account? <Link component={RouterLink} to="/login" sx={{ color: 'var(--color5)', fontWeight: 600 }}>Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
