import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  // Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  // ListItem
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  // Settings as SettingsIcon,
  // ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  // Users as UsersIcon,
  Tag as TagIcon,
  Truck as TruckIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/main.png',
  jobTitle: '製造部',
  name: '潮田 正人'
};

const items = [
  {
    method: 'Link',
    href: '/additional',
    icon: TagIcon,
    title: '追加依頼'
  },
  // {
  //   href: '/invoice',
  //   icon: TruckIcon,
  //   title: '送状生成'
  // },
  {
    method: 'Link',
    href: '/line',
    icon: TagIcon,
    title: '北関東ライン'
  },
  {
    method: 'a',
    href: 'https://bmypage.kuronekoyamato.co.jp/bmypage/servlet/jp.co.kuronekoyamato.wur.hmp.servlet.user.HMPLGI0010JspServlet',
    icon: TruckIcon,
    title: 'ヤマトB2ログイン',
    target: 'blank'
  },
  {
    method: 'Link',
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'ダッシュボード'
  },
  // {
  //   href: '/app/customers',
  //   icon: UsersIcon,
  //   title: 'Customers'
  // },
  // {
  //   href: '/app/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  {
    method: 'Link',
    href: '/app/account',
    icon: UserIcon,
    title: 'アカウント'
  },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  {
    method: 'Link',
    href: '/login',
    icon: LockIcon,
    title: 'ログイン'
  },
  {
    method: 'Link',
    href: '/register',
    icon: UserPlusIcon,
    title: 'アカウント登録'
  },
  {
    method: 'Link',
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   if (openMobile && onMobileClose) {
  //     onMobileClose();
  //   }
  // }, []);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => {
            return (
              item.method === "Link" ?
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
                :
                <a
                  href={item.href}
                  target={item.target}
                >
                  {item.title}
                </a>
            )
          })}
        </List>
      </Box>
    </Box >
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
