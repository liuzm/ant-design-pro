import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '../../components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/liuzm/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'http://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 centipede 技术部研发
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
