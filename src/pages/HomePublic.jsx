import React, { useEffect } from 'react'; 
import { useQueryClient } from 'react-query';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';

export const HomePublic = () => { 
  const queryClient = useQueryClient()
  useEffect(() => { 
      queryClient.refetchQueries('dataUser')
      queryClient.refetchQueries('todos')
  }, [])
  return (
    <>
      <Header />
      <Hero />
      <Footer />
    </>
  );
};
