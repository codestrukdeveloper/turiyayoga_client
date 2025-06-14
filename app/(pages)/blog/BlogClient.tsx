"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NewsShelter from "@/app/components/NewsShelter";
import { BASE_URL_IMAGE } from "@/app/utils/config";
import "./blog.scss";

import type { Blog } from "@/app/services/blogService";

interface BlogClientProps {
  blogs: Blog[];
}

const BlogClient: React.FC<BlogClientProps> = ({ blogs }) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, []);

  const convertDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getFullYear()
    ).slice(2)}`;
  };

  return (
    <>
      <div>
        <section className="banner_wrapper">
          <div className="banner_bg blog">
            <div className="banner-content container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="banner_bg__content" data-aos="fade-up">
                    <h1 className="animate__animated" data-animation-in="animate__fadeInUp" data-duration-in={1}>
                      Blog
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="global_wrapper blog_wrapper">
          <div className="container">
            <div className="blog_wrapper__heading">
              <p>
                 In unserem Turiya-Blog beschäftigen wir uns mit Yoga,
                Yoga-Philosophie, yogischer Anatomie und anderen Themen, die in
                unseren Yogalehrer-Ausbildungen in Deutschland erarbeitet
                wurden. Unsere Artikel geben praktische Tipps, wie wir Yoga in
                unseren Alltag integrieren können, um einen yogischen Lebensstil
                zu verbreiten. Gleichzeitig veröffentlichen wir ausführliche
                Artikel, die sich mit den häufigsten Missverständnissen und
                Zweifeln unserer Yogaschüler befassen
              </p>
            </div>
          </div>

          <div className="global_content">
            <div className="container">
              <div className="row">
                {blogs.map((blog, index) => (
                  <div className="col-lg-4" key={index}>
                    <div className="blog_card">
                      <div className="blog_img">
                        <Image
                          src={`${BASE_URL_IMAGE}/images/blogs/${blog.blogImage}`}
                          className="img-fluid"
                          alt="blog_img"
                          width={400}
                          height={250}
                        />
                      </div>
                      <div className="blog_content">
                        <span>{convertDate(blog.createdAt)}</span>
                        <h6>{blog.blogHeading}</h6>
                        <div className="read-more mt-3">
                          <Link href={`/blog-detail/${blog.slug}`} className="global_btn">
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="map_wrapper">
          <div className="row">
            <div className="col-lg-3">
              <div className="map_wrapper__left">
                <div className="map_wrapper__left-top">
                  <p>
                    Emanuel Wintermeyer<br />
                    Turiya Yoga<br />
                    Herbartstrasse 12<br />
                    60316 Frankfurt am Main
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
      </div>

      <NewsShelter />
    </>
  );
};

export default BlogClient;
