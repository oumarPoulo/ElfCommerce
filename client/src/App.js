import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Col } from 'reactstrap';
import config from './config';
import { IntlContext } from './context/IntlContext';
import { decodeUserToken, getUserToken } from './lib/auth';
import * as i18n from './lib/i18n';
import {
  Login,
  Dashboard,
  OrderList,
  Order,
  ProductList,
  CategoryList,
  Payment,
  Setting,
  Category,
  Product,
  SalesReportList,
  SupplierList,
  Supplier,
  ManufacturerList,
  Manufacturer,
  AccountList,
  Account,
} from './pages';
import NavBar from './components/Navigation';
import SideBarContent from './components/SideBar';

const routes = [
  {
    path: '/dashboard',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Dashboard />,
  },
  {
    path: '/orders',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <OrderList />,
  },
  {
    path: '/orders/:id',
    sidebar: () => <SideBarContent />,
    main: () => <Order />,
  },
  {
    path: '/new-order',
    sidebar: () => <SideBarContent />,
    main: () => <Order />,
  },
  {
    path: '/categories',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <CategoryList />,
  },
  {
    path: '/categories/:id',
    sidebar: () => <SideBarContent />,
    main: () => <Category />,
  },
  {
    path: '/new-category',
    sidebar: () => <SideBarContent />,
    main: () => <Category />,
  },
  {
    path: '/customers',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <ProductList />,
  },
  {
    path: '/products',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <ProductList />,
  },
  {
    path: '/new-product',
    sidebar: () => <SideBarContent />,
    main: () => <Product />,
  },
  {
    path: '/products/:id',
    sidebar: () => <SideBarContent />,
    main: () => <Product />,
  },
  {
    path: '/suppliers',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <SupplierList />,
  },
  {
    path: '/new-supplier',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Supplier />,
  },
  {
    path: '/suppliers/:id',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Supplier />,
  },
  {
    path: '/manufacturers',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <ManufacturerList />,
  },
  {
    path: '/new-manufacturer',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Manufacturer />,
  },
  {
    path: '/manufacturers/:id',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Manufacturer />,
  },
  {
    path: '/payments',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Payment />,
  },
  {
    path: '/sales-reports',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <SalesReportList />,
  },
  {
    path: '/settings',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Setting />,
  },
  {
    path: '/accounts',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <AccountList />,
  },
  {
    path: '/new-account',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Account />,
  },
  {
    path: '/accounts/:id',
    exact: true,
    sidebar: () => <SideBarContent />,
    main: () => <Account />,
  },
];

const App = () => {
  const intlContext = useContext(IntlContext);

  useEffect(() => {
    async function getStoreLanguage (storeId) {
      const res = await axios.get(`${config.apiDomain}/stores/${storeId}`, {
        headers: {
          authorization: getUserToken(),
        },
      });
      return res.data.language;
    }

    function loadStoreLocale () {
      const { data: { storeId } } = decodeUserToken();
      getStoreLanguage(storeId)
        .then((locale) => {
          if (intlContext.locale !== locale) {
            i18n.saveLocale(locale);
            window.location.reload();
          }
        });
    }

    if (getUserToken()) {
      loadStoreLocale();
    }

  }, []);

  return (
    <Router>
      <div>
        <Route exact path="/" component={Login}/>
        {getUserToken() ?
          <div className="dashboard-page">
            <Col md={2} className="sidebar">
              <div id="site-name">
                <a href="/dashboard" style={{ color: '#efefef' }}>ElfCommerce</a>
              </div>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.sidebar}
                />
              ))}
            </Col>
            <Col md={{ size: 10, offset: 2 }} style={{ padding: 0 }}>
              <NavBar/>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </Col>
          </div> : <Redirect to='/'/>
        }
      </div>
    </Router>
  );
};

export default App;
