import React from 'react'
import Banner from '@/app/components/Banner';
import BannerSlowerWrapper from '@/app/components/BannerSlowerWrapper';
import BannerGlobalTableWrapper from '@/app/components/BannerGlobalTableWrapper';
import BannerGlobalWrapper from '@/app/components/BannerGlobalWrapper';
import BannerGlobalWrapper5 from '@/app/components/BannerGlobalWrapper5';
import Testimonial from '@/app/components/Testimonial';
import ParralaxWrapper from '@/app/components/ParralaxWrapper';
import VisionWrapper from '@/app/components/VisionWrapper';
import Contact from '@/app/components/Contact';
import CheckWrapper from '@/app/components/CheckWrapper';
import ParalaxWrapper2 from '@/app/components/ParalaxWrapper2';
import NewsShelter from '@/app/components/NewsShelter';
import ContactPopup from '@/app/components/ContactPopup';

const Home = () => {
  return (
    <>
      <Banner />
      <BannerSlowerWrapper />
      <BannerGlobalWrapper />
      <BannerGlobalTableWrapper />
      <BannerGlobalWrapper5 />
      <Testimonial />
      <ParralaxWrapper />
      <VisionWrapper />
      <Contact />
      <ParalaxWrapper2 />
      <CheckWrapper />
      <NewsShelter />
      <ContactPopup />
    </>
  )
}

export default Home