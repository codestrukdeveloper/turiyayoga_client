// app/blog/[slug]/BlogDetailClient.tsx (Client Component)
'use client';

import React from 'react';
import './blog.scss';
import '../../../components/yoga_teacher_training_Mallorca/YogaTraningMallorca.scss';
import Image from 'next/image';
import Link from 'next/link';
import { BASE_URL_IMAGE } from '@/app/utils/config';
import { BlogDetail } from '@/app/services/blogService';

interface Props {
  blog: BlogDetail;
}

const BlogDetailClient: React.FC<Props> = ({ blog }) => {
  return (
    <>
      <section className="blog_details global_wrapper">
        <div className="container">
          <div className="blog_details__content">
            <div className="blog-details-img">
              <Image
                src={`${BASE_URL_IMAGE}/images/blogs/${blog.blogImage}`}
                alt="blog-details-img"
                width={800}
                height={400}
                className="img-fluid"
              />
            </div>
            <div className="shariff" data-title="Hatha Yoga erklärt | Turiya Yoga" data-info-url="http://ct.de/-2467514" data-backend-url="https://www.turiyayoga.de/blog/wp-content/plugins/shariff-sharing/backend/index.php" data-temp="/tmp" data-ttl={60} data-service="gftr" data-services="[&quot;googleplus&quot;,&quot;facebook&quot;,&quot;twitter&quot;,&quot;reddit&quot;,&quot;info&quot;]" data-image data-url="https://www.turiyayoga.de/blog/hatha-yoga-erklart-turiya-yoga/" data-lang="en" data-theme="colored" data-orientation="horizontal">
              <ul className="theme-colored orientation-horizontal">
                <li className="shariff-button googleplus"><a href="https://plus.google.com/share?url=https%3A%2F%2Fwww.turiyayoga.de%2Fblog%2Fhatha-yoga-erklart-turiya-yoga%2F" rel="popup" title="Share on Google+"><span className="fa fa-google-plus" /><span className="share_text">+1</span></a></li>
                <li className="shariff-button facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.turiyayoga.de%2Fblog%2Fhatha-yoga-erklart-turiya-yoga%2F" rel="popup" title="Share on Facebook"><span className="fa fa-facebook" /><span className="share_text">share</span></a></li>
                <li className="shariff-button twitter"><a href="https://twitter.com/intent/tweet?text=Hatha%20Yoga%20erkl%C3%A4rt%20%7C%20Turiya%20Yoga&url=https%3A%2F%2Fwww.turiyayoga.de%2Fblog%2Fhatha-yoga-erklart-turiya-yoga%2F" rel="popup" title="Share on Twitter"><span className="fa fa-twitter" /><span className="share_text">tweet</span></a></li>
                <li className="shariff-button reddit"><a href="//www.reddit.com/submit?url=https%3A%2F%2Fwww.turiyayoga.de%2Fblog%2Fhatha-yoga-erklart-turiya-yoga%2F" rel="popup" title="Share on Reddit"><span className="fa fa-reddit" /><span className="share_text">share</span></a></li>
                <li className="shariff-button info"><a href="http://ct.de/-2467514" target="_blank" title="more information"><span className="share_text"><i className="bx bx-info-circle" /></span></a></li>
              </ul>
            </div>
            <div className="blog-details-content">
              <h3 className="mb-3">{blog.blogHeading}</h3>

              <div
                className="entry-content clear"
                ast-blocks-layout="true"
                itemProp="text">

              </div>
            </div>
          </div>
          <div style={{ marginBottom: '0px' }}>
            <div
              dangerouslySetInnerHTML={{ __html: blog.blogContent }}
            />
          </div>
        </div>
      </section>

      <section className="map_wrapper mb-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="map_wrapper__left">
              <div className="map_wrapper__left-top">
                <p>
                  Emanuel Wintermeyer
                  <br /> Turiya Yoga
                  <br /> Herbartstrasse 12
                  <br /> 60316 Frankfurt am Main
                </p>
              </div>
              <div className="map_wrapper__left-bottom">
                <a href="tel:+ 49 (0)69 - 20134987">
                  <i className="bx bx-headphone" /> + 49 (0)69 - 20134987
                </a>
                <div className="map_flex">
                  <Link href="/impressum">Impressum</Link>
                  <span>/</span>
                  <Link href="/datenschutz">Datenschutz</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="map-enter">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5116.2361985505095!2d8.696904!3d50.121512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0bb4c915430b%3A0xcc73e3d7b3ea7b10!2sTuriya%20Yoga%20%7C%20Yogalehrerausbildung%20%7C%20Yoga%20Teacher%20Training%20Course!5e0!3m2!1sen!2sin!4v1722319511773!5m2!1sen!2sin"
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailClient;
