import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Register | 生産管理 </title>
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
              email: '',
              userName: '',
              userNameShort: '',
              password: '',
              passwordConfirmation: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('正しいメールアドレスを入力してください').max(255).required('メールアドレスを入力してください'),
                employee: Yup.string().max(255).required('社員番号を入力して下さい'),
                userName: Yup.string().max(255).required('フルネームで入力して下いさい'),
                userNameShort: Yup.string().max(255).required('短縮名で入力して下さい'),
                password: Yup.string().max(255).required('パスワードを入力して下さい'),
                passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'パスワードが一致しません').required('確認用パスワードを入力してください'),
              })
            }
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
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
                    Register
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    メールを使用して新しいアカウントを登録します<br />
                    登録後、メールを確認しリンクよりアクセスして下さい
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.employee && errors.employee)}
                  fullWidth
                  helperText={touched.employee && errors.employee}
                  label="社員番号"
                  margin="normal"
                  name="employee"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.employee}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.userName && errors.userName)}
                  fullWidth
                  helperText={touched.userName && errors.userName}
                  label="名前"
                  margin="normal"
                  name="userName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.userNameShort && errors.userNameShort)}
                  fullWidth
                  helperText={touched.userNameShort && errors.userNameShort}
                  label="短縮名"
                  margin="normal"
                  name="userNameShort"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userNameShort}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="メールアドレス"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="パスワード"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                  fullWidth
                  helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                  label="パスワード確認"
                  margin="normal"
                  name="passwordConfirmation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.passwordConfirmation}
                  variant="outlined"
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
                    アカウント登録
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
