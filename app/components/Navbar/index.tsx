"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import "./navbar.scss";
import { deleteCartItemById, fetchCartItemsByUser, fetchCourseCategories, fetchModuleCategories, fetchPurchasedCourses, fetchUserDetailById } from "@/app/services/categoryService";
import { useAuth } from "@/app/context/auth-context";

// Define interfaces for better type safety
interface CartItem {
  _id: string;
  moduleId: {
    _id: string;
    Ausbildung: string;
    price: number;
    Offerprice?: number;
    OfferEndDate?: string;
    StartDate: string;
    EndDate: string;
    Location: string;
    Place: string | number;
  };
}

interface CourseSubCategory {
  _id: string;
  modulecategory: string;
  slug: string;
  status: string;
}

interface Category {
  _id: string;
  category: string;
  slug: string;
  status: string;
  courseSubCategories: CourseSubCategory[];
}

const Navbar = () => {
  const { user, userId, logout } = useAuth();

  const [isActive, setIsActive] = useState(false);
  const [updateCartNumber, setUpdateCartNumber] = useState(false);
  const [showSiderBar, setShowSiderBar] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const [puchasedCourse, setPuchasedCourse] = useState<any>("");
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [showMegaDropdown, setShowMegaDropdown] = useState(false);
  const [categoryData, setcategoryData] = useState<Category[]>([]);
  const [courseSubCategoryData, setCourseSubCategoryData] = useState<any>("");
  const [userDetail, setUserDetail] = useState<any>("");
  const [cartFetchedData, setcartFetchedData] = useState<CartItem[]>([]);
  const styles = {
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      overflowY: "auto" as const,
    },
    modal: {
      position: "relative" as const,
      backgroundColor: "white",
      borderRadius: "12px",
      width: "95%",
      maxWidth: "1000px",
      margin: "32px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
      overflow: "hidden",
      maxHeight: "90vh",
    },
    closeButton: {
      position: "absolute" as const,
      top: "12px",
      right: "12px",
      background: "transparent",
      border: "none",
      fontSize: "24px",
      color: "#333",
      cursor: "pointer",
      zIndex: 100,
    },
    iframeWrapper: {
      marginTop: "16px",
      paddingTop: "32px",
    },
    iframe: {
      width: "100%",
      height: "600px",
      border: "none",
    },
  };

  // Fix the refs - use proper typing
  const mainListRef = useRef<HTMLUListElement>(null);
  const yogalehrer_Ausbildung = useRef<(HTMLUListElement | null)[]>([]);


  const handleMobileNav = () => {
    setIsActive(!isActive);
  };

  const handleCancel = () => {
    setIsActive(false);
  };

  const handleSidBar = () => {
    setShowSiderBar(true);
  };

  const closeSideber = () => {
    setShowSiderBar(false);
  };


  const fetchCartData = async () => {
    console.log("id of user", userId);
     if (userId) {
    try {
      const data = await fetchCartItemsByUser(userId as any);
      console.log("response of cart fetched", data);
      setcartFetchedData(data);
    } catch (error) {
      console.log("error", error);
    }
    }
  };


  const handleRedirect = () => {
    if (userId) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };


  const handleLinkClick = (link: string) => {
    setActiveLink(link === activeLink ? null : link);
    if (link === "contact") {
      setIsActive(false);
    }
  };


  // Update the handler to use index
  const handle_Yogalehrer_Ausbildung = (category: any, index: number) => {
    if (
      mainListRef.current &&
      yogalehrer_Ausbildung.current &&
      yogalehrer_Ausbildung.current[index]
    ) {
      mainListRef.current.style.display = "none";
      yogalehrer_Ausbildung.current[index]!.style.display = "block";
    }
    setShowMegaDropdown(true);
  };

  const handleCancelYogalehrerAusbildung = (category: any, index: number) => {
    if (
      mainListRef.current &&
      yogalehrer_Ausbildung.current &&
      yogalehrer_Ausbildung.current[index]
    ) {
      mainListRef.current.style.display = "block";
      yogalehrer_Ausbildung.current[index]!.style.display = "none";
    }
  };

  const fetchCourseCategory = async () => {
    try {
      const data = await fetchCourseCategories();
      const activeCategories = data.filter((category: any) => category.status === "active");
      setcategoryData(activeCategories);
    } catch (error) {
      console.error("Error fetching course category", error);
    }
  };

  const fetchCourseSubCategoryData = async () => {
    try {
      const data = await fetchModuleCategories();
      setCourseSubCategoryData(data);
    } catch (error) {
      console.error("Error fetching course category", error);
    }
  };

  console.log("Fetching course category", categoryData);

  const deleteCartData = async (itemId: string) => {
    try {
      await deleteCartItemById(itemId);
      const updatedCartData = cartFetchedData.filter((item: CartItem) => item._id !== itemId);
      setcartFetchedData(updatedCartData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchUserDetail = async () => {
    if (userId) {
      try {
        const data = await fetchUserDetailById(userId);
        setUserDetail(data);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  function isOfferValid(offerEndDate: any) {
    if (!offerEndDate) return false;

    const today = new Date();
    const offerEnd = new Date(offerEndDate);

    return today <= offerEnd;
  }

  const FetchedPurchased = async () => {
    console.log("Fetched cart id", userId);
    if (userId) {
      try {
        const data = await fetchPurchasedCourses(userId);
        setPuchasedCourse(data);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetail();
      FetchedPurchased();
      fetchCartData();
    }
  }, [userId])
  console.log("storedUser", user)
  console.log("storedId", userId)

  useEffect(() => {
    fetchCartData();
  }, [updateCartNumber]);


  useEffect(() => {
    fetchCourseCategory();
    fetchCourseSubCategoryData();

    const handleScroll = () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle("sticky", window.scrollY > 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div ref={headerRef} className="myNav">
        <div className="container-fluid">
          <div className="myNav_content">
            <div className="myNav_logo">
              <Link href="/">
                <img src="/assets/images/logo.webp" className="img-fluid" alt="logo" />
              </Link>
            </div>
            <div className="myNav_content__right">
              <div className="top_menu">
                <Link href="#" onClick={() => setIsPopupOpen(true)}>
                  <span className="flex items-center gap-2 cursor-pointer">
                    <i className="bx bxs-mobile" /> Info-Termin Vereinbaren
                  </span>
                </Link>
                <Link href="mailto:info@turiyayoga.de">
                  <i className="bx bxs-envelope" /> info@turiyayoga.de
                </Link>
                <Link href="#" className="cart-menu">
                  <p onClick={handleSidBar}>
                    <i className="bx bx-shopping-bag" />
                    <span className="me-1">
                      {cartFetchedData && cartFetchedData.length > 0
                        ? cartFetchedData.length
                        : "0 [LEER]"}
                    </span>
                  </p>
                </Link>
                {user ? (
                  <>
                    <p
                      onClick={handleRedirect}
                      className="registerLink"
                      style={{
                        cursor: "pointer",
                        fontSize: "16px",
                        textTransform: "capitalize",
                      }}
                    >
                      <i className="bx bx-user" />
                      {user && user}
                    </p>
                    <p
                      style={{
                        cursor: "pointer",
                        fontSize: "16px",
                        textTransform: "capitalize",
                      }}
                      className="registerLink"
                      onClick={() => {
                        logout();
                        router.push("/login");
                      }}
                    >
                      Logout
                    </p>
                  </>
                ) : (
                  <p
                    onClick={handleRedirect}
                    className="registerLink"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bx bx-user" />
                    Anmeldung/Registrierung
                  </p>
                )}
              </div>
              <div className="bottom_menu">
                <ul>
                  <li className="dropdown_menu">
                    <Link href="#">
                      ÜBER UNS
                      <i className="bx bx-chevron-down" />
                    </Link>
                    <ul className="dropdown_menu__list">
                      <li>
                        <Link href="/unsere-Geschichte">
                          Unsere Geschichte
                        </Link>
                      </li>
                      <li>
                        <Link href="/unsere-Philosophie">Unsere Philosophie</Link>
                      </li>
                      <li>
                        <Link href="/blog">Turiya Yoga Blog</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown_menu">
                    <Link href="#">
                      Yogalehrer Ausbildungen
                      <i className="bx bx-chevron-down" />
                    </Link>
                    <ul className="dropdown_menu__list">
                      {categoryData.map((item: Category) => (
                        <li className="mega_dropdown" key={item._id}>
                          <Link href={`/category/${item.slug}`}>
                            {item.category}
                          </Link>
                          {item.courseSubCategories.length > 0 && (
                            <i className="bx bx-chevron-right" />
                          )}
                          {item.courseSubCategories.filter(
                            (sub: CourseSubCategory) => sub.status === "active"
                          ).length > 0 && (
                              <>
                                <div className="mega_dropdown__list">
                                  <ul
                                    style={{
                                      overflowY: "scroll",
                                      maxHeight: "400px",
                                    }}
                                  >
                                    {item.courseSubCategories
                                      .filter((sub: CourseSubCategory) => sub.status === "active")
                                      .map((subitem: CourseSubCategory) => (
                                        <li key={subitem._id}>
                                          <Link href={`/module/${subitem.slug}`}>
                                            {subitem.modulecategory}
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </>
                            )}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="dropdown_menu">
                    <Link href="#">
                      Kundenstimmen
                      <i className="bx bx-chevron-down" />
                    </Link>
                    <ul className="dropdown_menu__list">
                      <li>
                        <Link href="/kundenstimmen">Kundenstimmen</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item">
                    <Link href="/contact">
                      <i className="bx bx-envelope" />
                      <span className="pt-1">KONTAKT</span>
                    </Link>
                  </li>
                  <li>
                    <div className="menu--icon" onClick={handleMobileNav}>
                      <i className="bx bx-menu" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {showSiderBar && (
            <div className="cart-overlay active">
              <div className="cart-overlay-content px-3">
                <IoMdClose className="closeIcon" onClick={closeSideber} />

                {cartFetchedData && cartFetchedData.length > 0 ? (
                  cartFetchedData.map((item: CartItem, index: number) => {
                    console.log("item of cart data", item);
                    const module = item.moduleId;
                    const isValidOffer =
                      module && isOfferValid(module.OfferEndDate);

                    return (
                      <div key={index}>
                        <div className="cart-overlay-heading" id="cart_content">
                          <div className="cart_wrapper__left-box">
                            <div className="cart_left__heading">
                              <h6>{module && module.Ausbildung}</h6>
                              <div className="del"></div>
                            </div>
                            <div className="cart-price">
                              <p>
                                {isValidOffer && module.Offerprice && module.Offerprice > 0 ? (
                                  <>
                                    €{module.Offerprice}{" "}
                                    <del style={{ color: "#c3c3c3" }}>
                                      €{module.price}
                                    </del>
                                  </>
                                ) : (
                                  <>€{module?.price}</>
                                )}
                              </p>
                            </div>
                            <div className="cart-list">
                              <ul>
                                <li>
                                  <i className="bx bxs-calendar"></i>{" "}
                                  {module && module.StartDate} -{" "}
                                  {module && module.EndDate}
                                </li>
                                <li>{module && module.Location}</li>
                                <li>{module && module.Place}</li>
                              </ul>
                            </div>
                            <div className="cart-total">
                              <h6>TOTAL</h6>
                              <p>
                                {isValidOffer && module.Offerprice && module.Offerprice > 0
                                  ? `€${module.Offerprice}`
                                  : `€${module?.price}`}
                              </p>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-sm-10">
                              {user ? (
                                <button
                                  onClick={() => {
                                    localStorage.setItem(
                                      "cartItemBooking",
                                      item._id
                                    );
                                    router.push(`/course_booking/${module._id}`);
                                    closeSideber();
                                  }}
                                  style={{
                                    backgroundColor:
                                      Number(item.moduleId.Place) <= 3 ? "#FF5722" : "#9BBB59",
                                    border: "0px solid",
                                    position: "relative",
                                    width: "fit-content",
                                    padding: "5px 10px",
                                    color: "white",
                                  }}
                                  className="triggerDialogBox"
                                  data-id={9}
                                >
                                  Buchung fortsetzen
                                </button>
                              ) : (
                                <p>
                                  Bitte melden Sie sich an, um zur Kasse zu
                                  gehen.
                                </p>
                              )}
                            </div>

                            <div className="col-sm-2">
                              <MdDelete
                                style={{
                                  color: "#d73232",
                                  fontWeight: "bold",
                                  fontSize: "20px",
                                  marginRight: "30px",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteCartData(item._id)}
                              />
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <div className="mt-4">
                    <div className="cart-overlay-heading" id="cart_content">
                      <div className="row mt-3">
                        <div className="col-sm-12 d-flex justify-content-center">
                          <h4 className="empty_text">
                            {" "}
                            Dein Warenkorb ist leer!
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="hide_top_menu">
            <Link href="#" onClick={() => setIsPopupOpen(true)}>
              <span className="flex items-center gap-2 cursor-pointer">
                <i className="bx bxs-mobile" /> Info-Termin Vereinbaren
              </span>
            </Link>
            <a href="mailto:info@turiyayoga.de">
              <i className="bx bxs-envelope"></i> info@turiyayoga.de
            </a>
            <a
              href="javascript:void(0)"
              className="cart-menu"
              onClick={handleSidBar}
            >
              <i className="bx bx-shopping-bag"></i>
              <span className="me-1">
                {cartFetchedData && cartFetchedData.length > 0
                  ? cartFetchedData.length
                  : "0 [LEER]"}
              </span>
            </a>
            {user ? (
              <>
                <p
                  onClick={handleRedirect}
                  className="registerLink"
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    textTransform: "capitalize",
                  }}
                >
                  <i className="bx bx-user" />
                  {user && user}
                </p>
                <p
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    textTransform: "capitalize",
                  }}
                  className="registerLink"
                  onClick={() => {
                    console.log("Logging out...");
                    localStorage.removeItem("turiya_auth_id");
                    localStorage.removeItem("turiya_auth_token");
                    localStorage.removeItem("user");
                    router.push("/login");
                  }}
                >
                  Logout
                </p>
              </>
            ) : (
              <p
                onClick={handleRedirect}
                className="registerLink"
                style={{ cursor: "pointer" }}
              >
                <i className="bx bx-user" />
                Anmeldung/Registrierung
              </p>
            )}
          </div>

          {/* mobile nav */}
          <div className={`mobile_nav ${isActive ? "active" : ""}`}>
            <div className="mobile_nav__content">
              <div className="mobile_header">
                <div className="myNav_logo">
                  <Link href="/">
                    <img src="/assets/images/logo.webp" className="img-fluid" alt="logo" />
                  </Link>
                </div>
                <div className="cancel-menu" onClick={handleCancel}>
                  <i className="bx bx-x" />
                </div>
              </div>
              <div className="mobile_menu">
                <ul ref={mainListRef}>
                  <li className="drop-menu">
                    <Link
                      href="/"
                      className={`active-menu my-2 ${activeLink === "about" ? "active" : ""
                        }`}
                      onClick={() => handleLinkClick("about")}
                    >
                      ÜBER UNS <i className="bx bx-chevron-right"></i>
                    </Link>
                    <div
                      className={`drop-menu-list ${activeLink === "about" ? "show" : ""
                        }`}
                    >
                      <Link
                        href="/unsere-Geschichte"
                        onClick={() => setIsActive(false)}
                        className="my-2"
                      >
                        Unsere Geschichte
                      </Link>
                      <Link
                        href="/unsere-Philosophie"
                        onClick={() => setIsActive(false)}
                        className="my-2"
                      >
                        Unsere Philosophie
                      </Link>
                      <Link
                        href="/blog"
                        onClick={() => setIsActive(false)}
                        className="my-2"
                      >
                        Turiya Yoga Blog
                      </Link>
                    </div>
                  </li>

                  <li className="drop-menu">
                    <Link
                      href="/"
                      className={`active-menu my-2 ${activeLink === "yogaTraining" ? "active" : ""
                        }`}
                      onClick={() => handleLinkClick("yogaTraining")}
                    >
                      Yogalehrer Ausbildungen{" "}
                      <i className="bx bx-chevron-right"></i>
                    </Link>
                    <div
                      className={`drop-menu-list ${activeLink === "yogaTraining" ? "show" : ""
                        }`}
                    >
                      {categoryData &&
                        categoryData.map((item: Category, index: number) => (
                          <div className="mega_dropdown my-3" key={item._id}>
                            {item.courseSubCategories.filter(
                              (sub: CourseSubCategory) => sub.status === "active"
                            ).length > 0 ? (
                              <>
                                <Link
                                  href="#"
                                  style={{ fontSize: "12px" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handle_Yogalehrer_Ausbildung(
                                      item.category,
                                      index
                                    );
                                  }}
                                >
                                  {item.category}{" "}
                                  <i className="bx bx-chevron-right" />
                                </Link>
                              </>
                            ) : (
                              <Link
                                href={`/category/${item.slug}`}
                                style={{ fontSize: "12px" }}
                                onClick={() => setIsActive(false)}
                              >
                                {item.category}
                              </Link>
                            )}
                          </div>
                        ))}
                    </div>
                  </li>

                  <li className="drop-menu mb-2">
                    <Link
                      href="/"
                      className={`active-menu my-2 ${activeLink === "kundenstimmen" ? "active" : ""
                        }`}
                      onClick={() => handleLinkClick("kundenstimmen")}
                    >
                      Kundenstimmen <i className="bx bx-chevron-right"></i>
                    </Link>
                    <div
                      className={`drop-menu-list ${activeLink === "kundenstimmen" ? "show" : ""
                        }`}
                    >
                      <Link
                        href="/kundenstimmen"
                        onClick={() => setIsActive(false)}
                        className="my-2"
                      >
                        Kundenstimmen
                      </Link>
                    </div>
                  </li>

                  <li>
                    <Link
                      href="/contact"
                      className={`contact-mob ${activeLink === "contact" ? "active" : ""
                        }`}
                      onClick={() => handleLinkClick("contact")}
                    >
                      <i className="bx bx-envelope"></i> KONTAKT
                    </Link>
                  </li>
                </ul>

                {/* Separate subcategory lists outside the main ul */}
                {categoryData &&
                  categoryData.map((item: Category, index: number) => (
                    <ul
                      key={`sub-${item._id}`}
                      id={`yogalehrer_Ausbildung_${index}`}
                      ref={(el) => {
                        if (!yogalehrer_Ausbildung.current)
                          yogalehrer_Ausbildung.current = [];
                        yogalehrer_Ausbildung.current[index] = el;
                      }}
                      style={{ display: "none" }}
                    >
                      <li>
                        <p
                          className="cancel-mega-menu"
                          onClick={() =>
                            handleCancelYogalehrerAusbildung(
                              item.category,
                              index
                            )
                          }
                          style={{
                            cursor: "pointer",
                            borderBottom: "1px solid #eee",
                          }}
                        >
                          <IoMdArrowBack /> Go back
                        </p>
                      </li>
                      {item.courseSubCategories
                        .filter((sub: CourseSubCategory) => sub.status === "active")
                        .map((subitem: CourseSubCategory) => (
                          <li className="my-3" key={subitem._id}>
                            <Link
                              href={`/module/${subitem.slug}`}
                              onClick={handleCancel}
                              style={{ display: "block" }}
                            >
                              {subitem.modulecategory}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button
              onClick={() => setIsPopupOpen(false)}
              style={styles.closeButton}
            >
              ×
            </button>
            <div style={styles.iframeWrapper}>
              <iframe
                src="https://calendly.com/turiyayoga-info/30min"
                frameBorder="0"
                allowFullScreen
                style={styles.iframe}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;