"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import axiosInstance from "@/app/utils/axios";
import { addCourseToCart, fetchUpcomingCourses, loginUser } from "@/app/services/categoryService";

interface CourseItem {
  _id: string;
  Ausbildung: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  Place: number;
  OfferEndDate: string;
  Offerprice: number;
  price: number;
  redirectUrl: string;
}

interface Props {
  updateCartNumber: boolean;
  setUpdateCartNumber: (val: boolean) => void;
}

const BannerGlobalTableWrapper: React.FC = () => {
  const [data, setData] = useState<CourseItem[]>([]);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const allCourses = await fetchUpcomingCourses();
      const currentDate = new Date();
      const filteredSorted = allCourses
        .filter((course: CourseItem) => {
          const date = new Date(course.StartDate.split(".").reverse().join("-"));
          return !isNaN(date.getTime()) && date >= currentDate;
        })
        .sort((a: CourseItem, b: CourseItem) => {
          const aDate = new Date(a.StartDate.split(".").reverse().join("-"));
          const bDate = new Date(b.StartDate.split(".").reverse().join("-"));
          return aDate.getTime() - bDate.getTime();
        });

      setData(filteredSorted);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.username) errs.username = "Benutzername ist erforderlich";
    if (!formData.password) errs.password = "Passwort ist erforderlich";
    else if (formData.password.length < 6) errs.password = "Passwort muss mindestens 6 Zeichen lang sein";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      alert("Validation failed");
      return;
    }

    try {
      const res = await loginUser(formData.username, formData.password);
      localStorage.setItem("turiya_auth_token", res.token);
      alert("Logged in successfully");
      router.push("/");
    } catch (error) {
      alert("Something went wrong");
    }
  };


  const handletriggerDialogBox = (courseid: string) => {
    const token = localStorage.getItem("turiya_auth_token");
    if (token) {
      addToCart(courseid);
    } else {
      setIsDialogVisible(true);
    }
  };

  const addToCart = async (courseid: string) => {
    const userId = localStorage.getItem("turiya_auth_id");

    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Benutzer nicht gefunden",
        text: "Bitte melde dich zuerst an.",
      });
      return;
    }

    try {
      await addCourseToCart(courseid, userId);
      // setUpdateCartNumber(!updateCartNumber);
      Swal.fire({ text: "Kurs im Warenkorb hinzugefügt!", icon: "success" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Benachrichtigung",
        text: "Etwas ist schiefgelaufen!",
      });
    }
  };



  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const isOfferValid = (offerEndDate: string) => {
    const today = new Date();
    const offerDate = new Date(offerEndDate);
    return today <= offerDate;
  };
  const ManagePageRedirect = (location: string) => {
    if (location === 'Goa, Indien') {
      router.push('/yogalehrer-ausbildung-goa-indien');
    } else if (location === 'Mallorca') {
      router.push('/200h-yogalehrer-ausbildung-mallorca');
    } else if (location === 'Himalaya Indien') {
      router.push('/yogalehrer-ausbildung-himalaya-indien');
    } else if (location === 'Berlin') {
      router.push('/YOGALEHRERAUSBILDUNG-BERLIN');
    } else {
      alert("Page is under development. Sorry for the inconvenience.");
    }
  };

  return (
    <>
      <section className="global_wrapper table_section">
        <div className="container">
          <div className="slower_wrapper__center main_heading" data-aos="zoom-in-up" data-aos-duration="2000">
            <h1>Kommende Kurse</h1>
          </div>
        </div>
        <div className="global_content">
          <div className="container-fluid">
            <div className="table-responsive index-table">
              <table
                className="table custom-table aos-init"
                data-aos="zoom-in-up">
                <thead style={{ backgroundColor: "#EDEDED" }}>
                  <tr
                    className="table-heading"
                    style={{ backgroundColor: "#EDEDED" }}>
                    <th scope="col" style={{ backgroundColor: "#EDEDED" }}>
                      Ausbildungsorte
                    </th>
                    <th scope="col" style={{ backgroundColor: "#EDEDED" }}>
                      Datum
                    </th>
                    <th scope="col" style={{ backgroundColor: "#EDEDED" }}>
                      Ort
                    </th>
                    <th
                      scope="col"
                      className="germany-price"
                      style={{ backgroundColor: "#EDEDED" }}>
                      Preis/Frühbucher
                    </th>
                    <th scope="col" style={{ backgroundColor: "#EDEDED" }}>
                      Freie Plätze
                    </th>
                    <th scope="col" style={{ backgroundColor: "#EDEDED" }}>

                    </th>
                  </tr>
                </thead>
                <tbody
                  className="table-body desktop"
                  style={{ backgroundColor: "#EDEDED" }}>
                  {data &&
                    ((pathname === '/' || pathname === '/yoga-teacher-training-bali')
                      ? data.filter((item: any) => item.Place && item.Place !== '0').slice(0, 5)
                      : data.filter((item: any) => item.Place && item.Place !== '0')
                    ).map((item, index) => {
                      console.log(`row of upcoming courses ${index}`, item);
                      return (
                        <tr style={{ backgroundColor: "#EDEDED" }} key={index}>
                          <th style={{ backgroundColor: "#EDEDED" }}>
                            {item.Ausbildung}
                          </th>
                          <td style={{ backgroundColor: "#EDEDED" }}>
                            <i className="bx bxs-calendar me-1" />
                            {formatDate(item.StartDate)} &nbsp;-&nbsp;
                            <i className="bx bxs-calendar me-1" />
                            {formatDate(item.EndDate)}{" "}
                          </td>
                          <td style={{ backgroundColor: "#EDEDED" }}>
                            <button type="button" className="location border-none" style={{ border: 'none' }}>
                              <Link href={`/module/${item.redirectUrl}`} className="text-black">
                                <i className="bx bxs-map me-1" />
                                {item.Location}
                              </Link>
                            </button>
                          </td>
                          <td style={{ backgroundColor: "#EDEDED" }}>
                            {isOfferValid(item.OfferEndDate) && item.Offerprice > 0 ? (
                              <>
                                <span
                                  style={{
                                    color: "#E07542",
                                  }}
                                >
                                  € {item.Offerprice}
                                </span>
                                <span className="ms-2">
                                  <del>€{item.price}</del>
                                </span>
                                <br />
                                <small>
                                  Das Angebot endet am<br />
                                  <i className="bx bxs-calendar"></i> {formatDate(item.OfferEndDate)}
                                </small>
                              </>
                            ) : (
                              <span>€{item.price}</span>
                            )}
                          </td>

                          <td
                            style={{
                              backgroundColor: "#EDEDED",
                              color: item.Place <= 3 ? "#E07542" : "black", // Optional: change text color to white if background is red
                            }}>
                            {item.Place <= 3
                              ? `Noch ${item.Place} Plätze frei`
                              : `Noch ${item.Place} Plätze frei`}
                          </td>

                          <td style={{ backgroundColor: "#EDEDED" }}>
                            <button
                              onClick={() => handletriggerDialogBox(item._id)}
                              style={{
                                backgroundColor:
                                  item.Place <= 3 ? "#E07542" : "#9BBB59",
                                border: "0px solid",
                              }}
                              className="table-btn triggerDialogBox"
                              data-id={9}>
                              ANMELDEN
                            </button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>

                <tbody className="table-body mobile" style={{ backgroundColor: "#EDEDED" }}>


                  {data &&
                    (pathname === '/' ? data.slice(0, 6) : data).map((item: any, index) => {
                      console.log("row of upcoming courses", item);

                      return (
                        item.Place && item.Place !== '0' ? (
                          <tr style={{ backgroundColor: "#EDEDED" }} key={index}>
                            <th style={{ backgroundColor: "#EDEDED" }}>
                              {item.Ausbildung}
                            </th>
                            <td style={{ backgroundColor: "#EDEDED" }}>
                              <i className="bx bxs-calendar me-1" />
                              {formatDate(item.StartDate)} &nbsp;-&nbsp;
                              <i className="bx bxs-calendar me-1" />
                              {formatDate(item.EndDate)}{" "}
                            </td>
                            <td style={{ backgroundColor: "#EDEDED" }}>
                              <button type="button" className="location border-none" style={{ border: 'none' }}

                                onClick={() => ManagePageRedirect(item.Location)}


                              >
                                <i className="bx bxs-map me-1" />

                                {item.Location}
                                {/* Goa, Indien */}
                              </button>
                            </td>
                            <td style={{ backgroundColor: "#EDEDED" }}>
                              {isOfferValid(item.OfferEndDate) && item.Offerprice > 0 ? (
                                <>
                                  <span
                                    style={{
                                      color: "#E07542",
                                    }}
                                  >
                                    € {item.Offerprice}
                                  </span>
                                  <span className="ms-2">
                                    <del>€{item.price}</del>
                                  </span>
                                  <br />
                                  <small>
                                    Das Angebot endet am{" "}
                                    <i className="bx bxs-calendar"></i> {formatDate(item.OfferEndDate)}
                                  </small>
                                </>
                              ) : (
                                <span>€{item.price}</span>
                              )}
                            </td>

                            <td
                              style={{
                                backgroundColor: "#EDEDED",
                                color: item.Place <= 3 ? "#E07542" : "black",
                              }}>
                              {item.Place <= 3
                                ? `Noch ${item.Place} Plätze frei`
                                : `Noch ${item.Place} Plätze frei`}
                            </td>

                            <td style={{ backgroundColor: "#EDEDED" }}>
                              <button
                                onClick={() => handletriggerDialogBox(item._id)}
                                style={{
                                  backgroundColor:
                                    item.Place <= 3 ? "#E07542" : "#9BBB59",
                                  border: "0px solid",
                                }}
                                className="table-btn triggerDialogBox"
                                data-id={9}>
                                ANMELDEN
                              </button>{" "}
                            </td>
                          </tr>
                        ) : null

                      );
                    })}
                </tbody>

              </table>

            </div>
            <div className="all-btn aos-init" data-aos="fade-up">
              <Link href="/category/alle-kommenden-kurse">
                <i className="bx bxs-calendar" /> ALLE AUSBILDUNGEN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {isDialogVisible && (
        <div id="modalOverlay" className="hiddenOverlayContainer">
          <div className="customDialogBox">
            <span className="exitButtonTrigger" onClick={() => setIsDialogVisible(false)}>×</span>
            <div className="dialogIcon">
              <Image src="/assets/images/high-important.png" width={80} alt="important" />
            </div>
            <p className="mt-3">
              Um den Kauf abzuschließen, musst du dich zuerst einloggen!
            </p>
            <button
              className="dialogActionButton"
              onClick={() => router.push("/login")}
            >
              Go to Login/Registrierung.
            </button>
          </div>
        </div>
      )}

      {isLoginOpen && (
        <div className="form-body">
          <div className="modal" id="exampleModal-form">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-body-top">
                    <div className="modal_input">
                      <label>Benutzername <span>*</span></label>
                      <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="modal_input">
                      <label>Passwort <span>*</span></label>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="submit-form">
                      <button className="global_btn" onClick={handleSubmit}>Einloggen</button>
                    </div>
                  </div>
                  <div className="form-body-bottom card-footer">
                    <div className="password-forgot">
                      <Link href="/forgot-login" className="btn btn-primary">Passwort vergessen?</Link>
                    </div>
                    <h3>Hast du noch keinen Account?</h3>
                    <div className="annmelden">
                      <Link href="/register">Anmelden</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BannerGlobalTableWrapper;
