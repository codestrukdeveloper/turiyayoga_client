import React from "react";
import  Link  from "next/link";
import './pageNotFound.scss'
import NewsShelter from "@/app/components/NewsShelter";

const NoPage = () => {
  return (
    <>
      <section id="NoPage">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center">
              <div className="my-3 text-center">
                <img src="/assets/images/page_not_found_image.webp" alt="page_not_found_img" />
                <h3>Page not found</h3>
                <h6> The requested page could not be found or an error occurred.</h6>
                <div className="page_link">
                  <p>
                    <Link href="/">Go back</Link>, or Go to{" "}
                    <Link href="/"> Turiya Yoga | Become a yoga teacher!</Link>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <NewsShelter />
    </>
  );
};

export default NoPage;
