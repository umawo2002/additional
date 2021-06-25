import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  // Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

const Login = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState('')
  const [password, setPassword] = useState('')

  // const onlogin = (e) => {
  //   alert(employee + ':' + password)
  // }

  return (
    <>
      <Helmet>
        <title>Login | 生産管理 </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              employee: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              employee: Yup.string().min(6).required('社員番号を６文字以上で入力してください').max(255).required('社員番号を入力して下さい'),
              password: Yup.string().max(255).required('パスワードを入力してください')
            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              // handleBlur,
              // handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Login
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.employee && errors.employee)}
                  fullWidth
                  helperText={touched.employee && errors.employee}
                  label="社員番号"
                  margin="normal"
                  name="employee"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  type="employee"
                  // value={values.employee}
                  variant="outlined"
                  onChange={(e) => setEmployee(e.target.value)}
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="パスワード"
                  margin="normal"
                  name="password"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  type="password"
                  // value={values.password}
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    ログイン
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  アカウント
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h5"
                  >
                    登録はこちら
                  </Link>
                  から...
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
