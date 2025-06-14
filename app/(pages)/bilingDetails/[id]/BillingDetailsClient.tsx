"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    fetchUserDetailById,
    generateInvoice,
    deleteCartData,
    reducePlace
} from '@/app/services/categoryService';

interface UserDetails {
    _id: string;
    First_name: string;
    Last_name: string;
    email: string;
    gender: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    federal_state: string;
    country: string;
    company?: string;
    userType: string;
    invoiceType: string;
    otherAddress?: {
        email?: string;
        company?: string;
        phone?: string;
        address?: string;
        city?: string;
        postal_code?: string;
        federal_state?: string;
        country?: string;
    };
}

interface CourseData {
    _id: string;
    Ausbildung: string;
    StartDate: string;
    Location: string;
    Place: number;
    price: number;
    Offerprice?: number;
    OfferEndDate?: string;
}

interface SelectedRoom {
    RoomPrice: number;
}

interface SelectedMeal {
    MealPrice: number;
}

interface BillingDetailsClientProps {
    courseId: string;
    initialCourseData: CourseData;
}

const BillingDetailsClient: React.FC<BillingDetailsClientProps> = ({
    courseId,
    initialCourseData
}) => {
    const router = useRouter();
    const [userDetails, setUserDetail] = useState<UserDetails | null>(null);
    const [courseData, setCourseData] = useState<CourseData>(initialCourseData);
    const [selectedRoom, setSelectedRoom] = useState<SelectedRoom>({} as SelectedRoom);
    const [selectedMeal, setSelectedMeal] = useState<SelectedMeal>({} as SelectedMeal);
    const [loading, setLoading] = useState(false);
    const [invoiceLoading, setInvoiceLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
    }, []);

    useEffect(() => {
        const selectedMealFromLocalStorage = localStorage.getItem('selectedMeal');
        const selectedRoomFromLocalStorage = localStorage.getItem('selectedRoom');

        if (selectedMealFromLocalStorage) {
            setSelectedMeal(JSON.parse(selectedMealFromLocalStorage));
        }
        if (selectedRoomFromLocalStorage) {
            setSelectedRoom(JSON.parse(selectedRoomFromLocalStorage));
        }
    }, []);

    const fetchData = async () => {
        const login_id = localStorage.getItem("turiya_auth_id");
        if (!login_id) return;

        try {
            const response = await fetchUserDetailById(login_id);
            console.log("drfdsfsresponse", response);
            console.log("response of billing user", response);
            console.log("response of otherAddress", response.otherAddress);

            setUserDetail(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const generateInvoiceNumber = (): string => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Month is zero-based
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        return `TY-WEB-REG ${randomNumber}-${month}-${year}`;
    };

    const generateOrderNumber = (): string => {
        const timestamp = Date.now(); // Use current timestamp for uniqueness
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        return `TY${timestamp}${randomSuffix}`;
    };

    // Function to generate today's date in "YYYY-MM-DD" format
    function getTodayDate(): string {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function isOfferValid(offerEndDate?: string): boolean {
        if (!offerEndDate) return false;

        const today = new Date();
        const offerEnd = new Date(offerEndDate);

        return today <= offerEnd;
    }

    function calculatePriceWithTax(
        price: number,
        offerEndDate?: string,
        offerPrice?: number,
        roomPrice?: number,
        mealPrice?: number
    ): string {
        if (!userDetails) return "0.00";

        const isOfferStillValid = isOfferValid(offerEndDate) && (offerPrice || 0) > 0;
        const priceToCalculate = isOfferStillValid ? (offerPrice || 0) : price;

        let totalPrice = Number(priceToCalculate);

        if (roomPrice) {
            totalPrice += Number(roomPrice);
        }

        if (mealPrice) {
            totalPrice += Number(mealPrice);
        }

        if (userDetails.invoiceType !== "Private_Invoice") {
            const taxRate = 0.19;
            const taxAmount = totalPrice * taxRate;
            const finalPrice = totalPrice + taxAmount;
            return finalPrice.toFixed(2);
        } else {
            return totalPrice.toFixed(2);
        }
    }

    const fetchModuleDetails = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userDetails) {
            alert("User details not loaded");
            return;
        }

        const requiredCheckboxes = document.querySelectorAll('.info_desc input[type="checkbox"][required]');

        // Check if all required checkboxes are checked
        const allChecked = Array.from(requiredCheckboxes).every(
            checkbox => (checkbox as HTMLInputElement).checked
        );

        if (!allChecked) {
            alert("Bitte stimmen Sie allen erforderlichen Bedingungen in der Info-Sektion zu, bevor Sie fortfahren.");
            return;
        }

        const invoice_num = generateInvoiceNumber();
        const order_num = generateOrderNumber();
        const due_date = getTodayDate();
        const taxCalculationnewv = calculatePriceWithTax(
            courseData.price,
            courseData.OfferEndDate,
            courseData.Offerprice,
            selectedRoom?.RoomPrice,
            selectedMeal?.MealPrice
        );

        const payload = {
            productNumber: courseData._id,
            invoiceNumber: invoice_num,
            customerNumber: userDetails._id,
            orderNumber: order_num,
            dueDate: due_date,
            customerName: userDetails.First_name + " " + userDetails.Last_name,
            customerAddress: `${userDetails.address} <br/> ${userDetails.city}, ${userDetails.federal_state}, ${'Germany'} - ${userDetails.postal_code}`,
            productDescription: courseData.Ausbildung,
            quantity: 1,
            totalPrice: taxCalculationnewv,
            email: userDetails.email,
            user_type: userDetails.userType,
            price: courseData.Offerprice && isOfferValid(courseData.OfferEndDate) ? courseData.Offerprice : courseData.price,
            due_amount: taxCalculationnewv,
            courseData: courseData,
            userDetails: userDetails,
            paid_amount: 0,
            selectedMeal: selectedMeal ? JSON.stringify(selectedMeal) : '00.00',
            selectedRoom: selectedRoom ? JSON.stringify(selectedRoom) : '00.00',
            invoiceType: userDetails.invoiceType === "Private_Invoice" ? "private" : "company"
        };

        setInvoiceLoading(true);

        try {
            const response = await generateInvoice(payload);
            console.log("response of invoice", response);

            await reducePlace(courseId);

            const cartItemId = localStorage.getItem("cartItemBooking");
            if (cartItemId) {
                await deleteCartData(cartItemId);
                localStorage.removeItem("cartItemBooking");
            }

            router.push('/thank-you');
        } catch (error: any) {
            console.log("error", error);
            setInvoiceLoading(false);
            alert(error?.response?.data?.message || "Some error occurred");
        }
    };

    if (!userDetails) {
        return (
            <div className="d-flex justify-content-center align-items-centers my-5 gap-5">
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only"></span>
                </div>
                <p className="mb-0">Loading your details..</p>
            </div>
        );
    }

    return (
        <div className="container mt-3 mb-3">
            <div className="row">
                <div className="col-sm-12">
                    <div className="cart_details__box">
                        <h3>Agreement on training as a yoga teacher</h3>
                        <div className="cart_details__box-content">
                            <div className="cart_details__heading">
                                <h6>{courseData.Ausbildung}</h6>
                                <button>
                                    <i className="bx bx-trash" />
                                </button>
                            </div>
                            <div className="cart_details__heading">
                                <span>
                                    <i className="bx bxs-calendar" /> {courseData.StartDate}
                                </span>
                                {isOfferValid(courseData.OfferEndDate) && (courseData.Offerprice || 0) > 0 ? (
                                    <p>€ {courseData.Offerprice}</p>
                                ) : (
                                    <p>€{courseData.price}</p>
                                )}
                            </div>
                            <div className="cart_details__list">
                                <span> {courseData.Location}</span>
                                <span>
                                    {courseData.Place}
                                    <strong>places</strong> left
                                </span>
                            </div>
                            {selectedRoom?.RoomPrice && (
                                <div className="cart_details__heading">
                                    <h6>Unterkunftskosten</h6>
                                    <p>€{selectedRoom?.RoomPrice}</p>
                                </div>
                            )}
                            {selectedMeal?.MealPrice && (
                                <div className="cart_details__heading">
                                    <h6>Verpflegung</h6>
                                    <p>€{selectedMeal?.MealPrice}</p>
                                </div>
                            )}
                            {userDetails.invoiceType !== "Private_Invoice" ? (
                                <div className="cart_details__heading">
                                    <h6>VAT (19%)</h6>
                                    <p>
                                        €{(
                                            (Number(courseData.price) +
                                                Number(selectedRoom?.RoomPrice || 0) +
                                                Number(selectedMeal?.MealPrice || 0)) *
                                            0.19
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            ) : null}

                            <div className="cart_details__heading">
                                <p>TOTAL</p>
                                <p>
                                    €{" "}
                                    {calculatePriceWithTax(
                                        courseData.price,
                                        courseData.OfferEndDate,
                                        courseData.Offerprice,
                                        selectedRoom?.RoomPrice,
                                        selectedMeal?.MealPrice
                                    )}
                                </p>
                            </div>
                            <div className="box-row">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="cart_details__box-left">
                                            <div className="box-title">
                                                <h6>Billing information </h6>
                                            </div>

                                            <div className="box-desc">
                                                <ul>
                                                    <li>
                                                        Name:
                                                        {userDetails?.First_name + "" + userDetails?.Last_name}{" "}
                                                    </li>
                                                    {userDetails && userDetails.company && (
                                                        <li>
                                                            Company Name:
                                                            {userDetails && userDetails.company}{" "}
                                                        </li>
                                                    )}

                                                    <li>Email:&nbsp; {userDetails && userDetails.email} </li>
                                                    <li>
                                                        Gender:&nbsp; {userDetails && userDetails?.gender}
                                                    </li>
                                                    <li>
                                                        Number:&nbsp; {userDetails && userDetails.phone}
                                                    </li>
                                                    <li>
                                                        Address:&nbsp;{" "}
                                                        {userDetails && userDetails.address}
                                                    </li>
                                                    <li>City:&nbsp; {userDetails && userDetails.city}</li>
                                                    <li>
                                                        Pincode:&nbsp;{" "}
                                                        {userDetails && userDetails.postal_code}
                                                    </li>
                                                    <li>
                                                        State:&nbsp;
                                                        {userDetails && userDetails.federal_state}
                                                    </li>

                                                    <li>
                                                        Country:&nbsp;{" "}
                                                        {userDetails && userDetails.country}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {userDetails && userDetails?.otherAddress?.email ? (
                                        <div className="col-md-6">
                                            <div className="cart_details__box-left">
                                                <div className="box-title">
                                                    <h6>Billing information </h6>
                                                </div>

                                                <div className="box-desc">
                                                    <ul>
                                                        <li>
                                                            Name:
                                                            {userDetails?.First_name + "" + userDetails?.Last_name}{" "}
                                                        </li>
                                                        <li>
                                                            Company Name:
                                                            {userDetails && userDetails?.otherAddress !== null
                                                                ? userDetails?.otherAddress?.company
                                                                : userDetails?.company}{" "}
                                                        </li>

                                                        <li>
                                                            Email:&nbsp;{" "}
                                                            {userDetails && userDetails?.otherAddress?.email
                                                                ? userDetails?.otherAddress?.email
                                                                : userDetails.email}{" "}
                                                        </li>
                                                        <li>
                                                            Gender:&nbsp; {userDetails && userDetails?.gender}
                                                        </li>
                                                        <li>
                                                            Number:&nbsp;{" "}
                                                            {userDetails && userDetails?.otherAddress?.phone
                                                                ? userDetails?.otherAddress?.phone
                                                                : userDetails.phone}
                                                        </li>
                                                        <li>
                                                            Address:&nbsp;{" "}
                                                            {userDetails && userDetails.otherAddress !== null
                                                                ? userDetails?.otherAddress?.address
                                                                : userDetails?.address}
                                                        </li>
                                                        <li>
                                                            City:&nbsp;
                                                            {userDetails && userDetails?.otherAddress?.city
                                                                ? userDetails?.otherAddress?.city
                                                                : userDetails.city}
                                                        </li>
                                                        <li>
                                                            Pincode:&nbsp;{" "}
                                                            {userDetails && userDetails?.otherAddress?.postal_code
                                                                ? userDetails?.otherAddress?.postal_code
                                                                : userDetails.postal_code}
                                                        </li>
                                                        <li>
                                                            State:&nbsp;
                                                            {userDetails && userDetails?.otherAddress?.federal_state
                                                                ? userDetails?.otherAddress?.federal_state
                                                                : userDetails.federal_state}
                                                        </li>

                                                        <li>
                                                            Country:&nbsp;{" "}
                                                            {userDetails && userDetails?.otherAddress?.country
                                                                ? userDetails?.otherAddress?.country
                                                                : userDetails.country}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="info">
                                <div className="box-title">
                                    <h6>
                                        Info <i className="bx bx-info-circle" />
                                    </h6>
                                    <p>
                                        Im Ausbildungspreis inbegriffen sind Ausbildungsskript,
                                        Workbook, Prüfungsgebühr und Zertifikat.
                                    </p>
                                </div>
                                <div className="info_desc">
                                    <p>Mein Ausbildungsstatus:</p>
                                    <div className="info_desc__radio">
                                        <input
                                            name="student_type"
                                            defaultValue="Ich möchte Yogalehrer werden"
                                            type="radio"
                                            defaultChecked
                                        />
                                        <label htmlFor="">Ich möchte Yogalehrer werden</label>
                                    </div>
                                    <div className="info_desc__radio">
                                        <input
                                            name="student_type"
                                            type="radio"
                                            defaultValue="Ich bin bereits Yogalehrer"
                                        />
                                        <label htmlFor="">Ich bin bereits Yogalehrer</label>
                                    </div>
                                    <p>Ausbildungserwartung:</p>
                                    <div className="info_desc__radio">
                                        <input
                                            name="name1"
                                            type="checkbox"
                                            defaultValue="Ich mache die Ausbildung als reine Freizeitbeschäftigung für mich"
                                        />
                                        <label htmlFor="">
                                            Ich mache die Ausbildung als reine Freizeitbeschäftigung
                                            für mich
                                        </label>
                                    </div>
                                    <div className="info_desc__radio">
                                        <input
                                            name="name2"
                                            type="checkbox"
                                            defaultValue="Ich bin bereits selbständig und möchte Yoga mit ins Programm nehmen"
                                        />
                                        <label htmlFor="">
                                            Ich bin bereits selbständig und möchte Yoga mit ins
                                            Programm nehmen
                                        </label>
                                    </div>
                                    <div className="info_desc__radio">
                                        <input
                                            name="name3"
                                            type="checkbox"
                                            required
                                            defaultValue="Die Widerrufsbelehrung/ AGB habe ich zur Kenntnis genommen. Die Widerruffsmöglichkeit beträgt ab dem Tag der Anmeldung 14 Tage."
                                        />
                                        <label htmlFor="">
                                            Die Widerrufsbelehrung/ AGB habe ich zur Kenntnis
                                            genommen. Die Widerruffsmöglichkeit beträgt ab dem Tag
                                            der Anmeldung 14 Tage.{" "}
                                        </label>
                                    </div>
                                    <div className="info_desc__radio">
                                        <input
                                            name="name5"
                                            type="checkbox"
                                            required
                                            defaultValue="Ich akzeptiere die allgemeinen Geschäftsbedingungen, die Bestandteil dieses vereinbarung sind."
                                        />
                                        <label htmlFor="">
                                            {" "}
                                            Ich{" "}
                                            <span
                                                className="btn p-0"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal">
                                                akzeptiere die allgemeinen Geschäftsbedingungen{" "}
                                            </span>
                                            , die Bestandteil dieses vereinbarung sind.
                                        </label>
                                    </div>
                                    <span>
                                        *Die Ausbildung ist bei Privatpersonen inkl. MwSt. Nach
                                        Erhalt der Anmeldung/ Vereinbarung erhältst du von Turiya
                                        Yoga eine ordnungsgemäße Teilnahmebestätigung/Rechnung,
                                        die alle Zahlungsinformationen nochmals enthält. Für
                                        Firmen ist die MwSt. zusätzlich zu den Ausbildungsgebühren
                                        hinzuzurechnen
                                    </span>
                                    <div className="mt-3">
                                        Nicht enthalten sind z. B. Pflichtbücher, Reisekosten zum
                                        Seminarort. Solche trägt der Teilnehmer zusätzlich.
                                    </div>
                                    <div className="info_desc__radio">
                                        <input
                                            name="name6"
                                            type="checkbox"
                                            required
                                            defaultValue="ICH STIMME DEN Turiya Yoga"
                                        />
                                        <label htmlFor="name6">
                                            ICH STIMME DEN Turiya Yoga{" "}
                                            <span
                                                className="btn p-0"
                                                data-bs-toggle="modal"
                                                data-bs-target="#second_modal"
                                            >
                                                AGB ZU *
                                            </span>
                                            ,
                                        </label>
                                    </div>

                                </div>
                                <div className="order-now">
                                    <button
                                        className="btn btn-primary d-flex align-items-center gap-3"
                                        onClick={fetchModuleDetails}>
                                        Gebührenpflichtig bestellen
                                        {invoiceLoading && <div className="spinner-border text-light" role="status">
                                        </div>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingDetailsClient;
