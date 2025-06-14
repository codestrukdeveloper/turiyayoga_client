"use client";
import React, { useEffect, useState } from "react";
import "./profile.scss";
import { useRouter } from "next/navigation";
import { fetchAgreementPDF, fetchPurchasedCourses, fetchPurchasedInvoicePDF, fetchUserDetailById, submitProfileQuery } from "@/app/services/categoryService";

const Profile = () => {
  const [id, setId] = useState<string | null>(null);


  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [purchasedCourse, setPuchasedCourse] = useState<any[]>([]);

  const [cartFetchedData, setcartFetchedData] = useState("");


  const updatedAt = "2024-12-19T05:23:23.539Z";
  const formattedDate = formatDate(updatedAt);

  console.log("fetchedData of profile", cartFetchedData);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    transportMode: "",
    arrivalTime: "",
    taxi: "",
  });

  function formatDate(isoDate: any) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0"); // Ensures two-digit day
    const month = months[date.getMonth()]; // Get month as a string
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const FetchedPurchased = async () => {
    console.log("Fetched cart id", id);
    if (id) {
      setLoading(true);
      try {
        const data = await fetchPurchasedCourses(id);
        setPuchasedCourse(data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchAggreementPDFHandler = async (invoiceId: string) => {
    const blob = await fetchAgreementPDF(invoiceId);
    if (blob) {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `agreement_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };



  const fetchUserDetail = async () => {
    if (id) {
      try {
        const data = await fetchUserDetailById(id);
        setData(data);
      } catch (error) {
        console.log("error", error);
      }
    }
  };


  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("turiya_auth_id");
    localStorage.removeItem("turiya_auth_token");
    localStorage.removeItem("user");
    router.push('/login')
  };

  const downloadInvoice = async (invoiceId: string) => {
    const blob = await fetchPurchasedInvoicePDF(invoiceId);
    if (blob) {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };


  console.log("purchasedCourse", purchasedCourse);




  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Form Data Submitted:", formData);
    try {
      const response = await submitProfileQuery(formData);
      alert("Query added successfully")
    } catch (error) {
      console.log("error", error)
    }
  };

  useEffect(() => {
    const storedId = localStorage.getItem("turiya_auth_id");
    setId(storedId);
  }, []);

  useEffect(() => {
    if (id) {
      FetchedPurchased();
      fetchUserDetail();
    }
  }, [id]);


  return (
    <>
      {loading ?
        <div className=" d-flex justify-content-center align-items-centers my-5 gap-5">
          <div className="spinner-border text-success" role="status">
            <span className="sr-only"></span>
          </div>
          <p className="mb-0">Loading your details..</p>
        </div> :
        <section className="myProfile global_wrapper">
          <div className="container">
            <button type="button" onClick={logout} className="btn btn_logout">
              Logout
            </button>
            <div className="myProfile_content">
              <h3> Namaste {data && data.First_name} </h3>
            </div>
            <div className="myProfile_content">
              {/*<h3> Namaste*/}
              {/*    DSCSeducation*/}
              {/*</h3>*/}

              {purchasedCourse.length > 0 ?
                purchasedCourse.map((item: any, index: number) => {
                  return (
                    <>
                      <div
                        className="myProfile_content__box border p-3 m-3"
                        key={item._id}>
                        <div className="profile_heading">
                          <p>Auftragsnummer - {item.orderNumber} </p>
                          <div className="profile_heading__right">
                            <p>Kaufdatum</p>
                            <p>
                              <i className="bx bxs-calendar" />
                              {formatDate(item.updatedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="profile-row">
                          <p>
                            <b>Padi Amount : €{item.paid_amount}</b>
                            <b>&nbsp;&nbsp;Left Amount : €{(Number(item.due_amount)).toFixed(2)}</b>
                          </p>
                          <p>
                            <span>Unbezahlt </span>
                          </p>
                        </div>
                        <div className="profile-picture">
                          <div className="row">
                            <div className="col-lg-3">
                              <div className="profile-picture-box">
                                <img
                                  // src="media/modules-images/42307037_"
                                  src="/assets/images/profile/profile_img.jpg"
                                  className="img-fluid"
                                  alt="profile"
                                />
                              </div>
                            </div>
                            <div className="col-lg-9">
                              <div className="profile-picture-content">
                                <h6>
                                  {item.courseData && item.courseData.Ausbildung}
                                </h6>
                                <p>
                                  {item.courseData && item.courseData.Location}
                                </p>
                                <p>
                                  Starttermin{" "}
                                  <i className="bx bxs-calendar me-1" />
                                  {item.courseData && item.courseData.StartDate}
                                  {console.log("invoice_id", item._id)}
                                </p>
                                <div className="profile-btn">
                                  <button
                                    type="button"
                                    className="invoice_download_btn"
                                    onClick={() => downloadInvoice(item._id)}>
                                    <i className="bx bxs-download" /> Rechnung
                                  </button>
                                  <button
                                    type="button"
                                    className="invoice_download_btn"
                                    onClick={() => fetchAggreementPDFHandler(item._id)}>
                                    <i className="bx bxs-download" /> Vereinbarung
                                  </button>
                                  <button
                                    type="button"
                                    className="invoice_download_btn"

                                    style={{ backgroundColor: '#eb9c4d' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                    <i className="bx bxs-edit" /> Dein
                                    Ankunftsticket{" "}
                                  </button>

                                  <a href="#">
                                    <i className="bx bx-money" /> Zahlungsdetails{" "}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }) : <h5 className="text-center mt-4">No Purchased course Found</h5>}
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div
                className="modal fade modal-fullscreen-md-down"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-fullscreen-md-down">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Modal Title
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="col-12 mb-2">
                        <label htmlFor="transport_mode">
                          How do you get to us?
                        </label>
                        <select
                          className="form-select"
                          name="transportMode"
                          id="transport_mode"
                          value={formData.transportMode}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Choose one --</option>
                          <option value="Flight">Flight</option>
                          <option value="Train">Train</option>
                          <option value="Bus">Bus</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </div>

                      <div className="col-sm-12">
                        <label htmlFor="arrival_time">
                          Time of arrival date?
                        </label>
                        <input
                          type="datetime-local"
                          id="arrival_time"
                          name="arrivalTime"
                          value={formData.arrivalTime}
                          className="required form-control"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-12 mb-2 mt-3 form-group">
                        <label htmlFor="taxi">Should we order you a taxi?</label>
                        <div>
                          <input
                            name="taxi"
                            id="taxi_yes"
                            className="my-1 mx-1 taxi-option"
                            type="radio"
                            value="yes"
                            onChange={handleInputChange}
                            checked={formData.taxi === "yes"}
                          />
                          <label htmlFor="taxi_yes" className="nott ls0 fw-medium mb-1">
                            Yes
                          </label>
                          <input
                            name="taxi"
                            id="taxi_no"
                            className="my-1 mx-1 taxi-option"
                            type="radio"
                            value="no"
                            onChange={handleInputChange}
                            checked={formData.taxi === "no"}
                          />
                          <label htmlFor="taxi_no" className="nott ls0 fw-medium mb-1">
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        data-bs-dismiss="modal"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>}
    </>
  );
};

export default Profile;
