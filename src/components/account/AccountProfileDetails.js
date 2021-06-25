import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const states = [
  {
    value: '100',
    label: '茨城工場'
  },
  {
    value: '600',
    label: '本社'
  },
  {
    value: '150',
    label: '東北工場'
  }
];

const initialProf = {
  userName: '潮田 正人',
  userNameShort: '潮田',
  email: 'ushioda.m@i-makes.com',
  phone: '112233',
  base: '茨城工場',
  section: '製造部'
}
const AccountProfileDetails = (props) => {
  const [values, setValues] = useState(initialProf);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="プロフィールの変更"
          title="ユーザ情報"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="名前"
                name="userName"
                onChange={handleChange}
                required
                value={values.userName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="短縮名"
                name="userNameShort"
                onChange={handleChange}
                required
                value={values.userNameShort}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="メールアドレス"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="携帯電話番号"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="部署名"
                name="section"
                onChange={handleChange}
                required
                value={values.section}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="拠点名"
                name="base"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            登録
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
