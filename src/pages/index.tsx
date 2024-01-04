import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import styles from '../styles/Home.module.css';
import Layout from 'components/Layout';
import Planet from './planets';

const MainStyled = styled.main`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 0;
`;

const Home: NextPage = () => {
  return (
    <Layout>
      <Planet />
    </Layout>
  );
};

export default Home;
