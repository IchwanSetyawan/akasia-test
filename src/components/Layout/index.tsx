import Header from 'components/Header';
import React from 'react';

interface layoutProps {
  children: React.ReactNode;
}

const Layout = (props: layoutProps) => {
  const { children } = props;
  return (
    <div>
      <Header />
      <div className="container my-20 mx-20">{children}</div>
    </div>
  );
};

export default Layout;
