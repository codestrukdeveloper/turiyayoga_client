"use client";
import React, { useState } from "react";
import "./yoga1.scss";
import "./yoga2.scss";
import NewsShelter from "@/app/components/NewsShelter";
import Contact from "@/app/components/Contact";
import Testimonial from "@/app/components/Testimonial";
import Link from "next/link";
import SimpleBanner4 from "@/app/components/banners/SimpleBanner4";

const YogaTeacherTraining200h = () => {

  const faqItems1 = [
    {
      question:
        "What happens if I miss a class or need to take a break during the yoga instructor training program?",
      answer: [
        "There are times when you might just miss the programs, but you do not have to worry at all as you can always communicate with the program coordinator instructor. There are several programs where we also offer recordings or sessions to help you catch up on the missed content.",
      ],
    },
  ];

  const faqItems2 = [
    {
      question:
        "Can I get a refund if I need to withdraw from the yoga instructor training program due to unforeseen circumstances?",
      answer: [
        "The different policy will depend on the yoga instructor training program that you choose. In many cases you can get partial refills if you withdraw within a certain time frame before the program starts. You can check out our refund policy before you enroll in the program.",
      ],
    },
  ];

  const faqItems3 = [
    {
      question:
        "How can I stay updated on the latest information about course updates, schedule changes, and other announcements?",
      answer: [
        "There are different communication channels available Like emails dedicated to student portals and social media platforms. After enrollment, you will receive login credentials where you can access your course material and receive important Announcements.",
      ],
    },
  ];

  const faqItems4 = [
    {
      question:
        "Can international students enroll in your yoga teacher training courses, and what is the process for obtaining a visa, if required?",
      answer: [
        "Yes, international students can also enroll in yoga teacher training courses. It is advisable for you to check the specific visa requirements for the host country before you enroll in the program. Furthermore, reaching out to the program coordinator team for guidance is important.",
      ],
    },
  ];

  const [activeIndex1, setActiveIndex1] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [activeIndex3, setActiveIndex3] = useState(null);
  const [activeIndex4, setActiveIndex4] = useState(null);
  const [activeIndex5, setActiveIndex5] = useState(null);
  const [activeIndex6, setActiveIndex6] = useState(null);
  const [activeIndex7, setActiveIndex7] = useState(null);
  const [activeIndex8, setActiveIndex8] = useState(null);

  const handleToggle = (section: any, index: any) => {
    if (section === 1) {
      setActiveIndex1(activeIndex1 === index ? null : index);
    } else if (section === 2) {
      setActiveIndex2(activeIndex2 === index ? null : index);
    }
    if (section === 3) {
      setActiveIndex3(activeIndex3 === index ? null : index);
    } else if (section === 4) {
      setActiveIndex4(activeIndex4 === index ? null : index);
    } else if (section === 5) {
      setActiveIndex5(activeIndex5 === index ? null : index);
    } else if (section === 6) {
      setActiveIndex6(activeIndex6 === index ? null : index);
    } else if (section === 7) {
      setActiveIndex7(activeIndex7 === index ? null : index);
    } else if (section === 8) {
      setActiveIndex8(activeIndex8 === index ? null : index);
    }
  };

  return (
    <>
      <section id="yoga_teacher">
        <SimpleBanner4
          banner="/assets/banner/rishikesh_banner_img.webp"
          heading={"Yoga Teacher Training"}
          para={"null"}
          videoLink={
            "https://www.youtube.com/embed/z6z4-bnDhws?si=Ta2BO26WIj6YIa-a"
          }
          buttonTxt="null"
        />

        <section className="global_wrapper about_wrapper" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="about_wrapper__left aos-init aos-animate"
                  data-aos="fade-up">
                  <h1>200 Hour Yoga Teacher Training</h1>
                  <div className="kurse_link"></div>
                  <div className="bali-list">
                    <p>Embarking on a journey to become a certified yoga instructor is truly a transformative and
                      empowering experience. We take immense pride in offering you the best 200-hour yoga teacher
                      training. When you choose us, you can get your hands on the best training program that equips
                      you with the skills to teach yoga and at the same time you can also nurture your personal growth
                      and well-being.</p>
                    <h6>Why Us For 200-Hour Yoga Teacher Training</h6>
                    <h6>State-of-the-Art Facilities</h6>
                    <p>Our 200-yoga teacher training center boasts the latest facilities which are especially designed
                      to create a perfect environment for learning and self-discovery. From spacious and velvet yoga
                      studios to comfortable meditation spaces we focus on your comfort and also, we focus on creating
                      an atmosphere that improves your overall well-being and experience. </p>
                    <h6>Personalized Learning</h6>
                    <p>We understand that every individual comes with unique strengths and areas for growth. Our program
                      is especially designed to provide your customized attention ensuring that you receive the best
                      guidance to improve your understanding of yoga philosophy and teaching methodologies. I would
                      experience instructors who are committed to supporting your individual journey towards becoming
                      a confident yoga teacher.</p>
                    <h6>Holistic Approach</h6>
                    <p>You need to know that yoga is not just physical practice, but it is a holistic lifestyle. Our
                      training program goes beyond the posters diving deep into the philosophical and spiritual parts
                      of yoga. We look forward to nurturing your physical abilities and also your mental and emotional
                      well-being. We foster a holistic approach that prepares you to share your complete experience
                      with your future students.</p>
                    <h6>-Expert Instructors</h6>
                    <p>Our team of seasoned yoga instructors bring a lot of knowledge and experience to the training
                      program. All our experts are dedicated to imparting the best teachings of yoga drawing from both
                      traditional wisdom and modern insights with a huge range of expertise of instructors to create a
                      dynamic enriching learning environment ensuring that you receive the best training. </p>
                    <h6>Affordable Investment</h6>
                    <p>We believe that best quality yoga teacher training should be accessible for everyone. Our program
                      offers an affordable investment in your personal and professional development. We understand
                      that financial commitment is involved in pursuing a 200-hour yoga teacher training, so we look
                      forward to making the transformative journey really affordable. When you choose us, you can
                      expect the best training program without burning a hole in your pocket.</p>
                    <h6>Community Support</h6>
                    <p>When you join our program, you can become a part of a supportive and like-Minded community. We
                      look forward to fostering a sense of belonging and connection among our trainees, creating a
                      network that goes beyond the training time. The community support that you will find here is
                      completely invaluable as you navigate all the challenges and triumphs of your yoga teacher
                      training journey.</p>
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="bali-list">
                          <h6>Proven Success Stories</h6>
                          <p>Our track record truly speaks for itself and with plenty of success stories from our
                            past students who have made a major impact in the yoga community. Our alumni makes
                            us proud, and we also take pride in their contributions to spreading the teachings
                            of yoga globally. We believe that your success is our success, and we are committed
                            to guiding you on the path of becoming the best yoga teacher.</p>
                          <h6>Flexible Training Options</h6>
                          <p>We understand the unique commitments that you might have so we offer flexible
                            training options to accommodate different schedules. Whether you prefer intensive
                            immersion, or a part time schedule, our program is especially designed to provide
                            you with flexibility while maintaining the depth and integrity of your training
                            curriculum. We understand that life is multifaceted, and we look forward to making
                            our training accessible to you even if you have varying time constraints.</p>
                          <h6>Comprehensive Curriculum</h6>
                          <p>Our 200-yoga teacher training curriculum is perfectly crafted to cover all modern
                            parts of yoga education from foundational arsenals and alignments to philosophy and
                            teaching. We offer a comprehensive curriculum which ensures that you receive the
                            perfect education. When you leave our program you not just leave a certified yoga
                            instructor but of course a knowledgeable and a confident ambassador of the yogic
                            tradition.</p>
                          <h6>Yoga Alliance Accreditation</h6>
                          <p>We take pride in being accredited by Yoga Alliance, a globally recognized
                            organization that sets the standards for yoga teacher training programs. Our
                            accreditation reflects our commitment to meet and exceed the highest educational
                            standards. After completing our yoga teacher training course, you would be eligible
                            to register with Yoga Alliance enhancing your credibility as the best qualified yoga
                            instructor.</p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="bali-img">
                          <div className="div">
                            <img src="/assets/rishikeshimg/200h_yoga_teacher_training2.webp" className="img-fluid" alt="training" />
                          </div>

                        </div>
                      </div>
                    </div>
                    <h6>Program Details</h6>
                    <p>Our yoga 200-hour training is one of the best courses that you can ever take as in our program
                      the ancient wisdom of yoga blends with modern teaching methodologies. Our training is especially
                      designed to provide you with a comprehensive understanding of yoga including different physical
                      posture’s philosophy anatomy and teaching techniques.</p>
                    <h6>Yoga Teacher Training Modules</h6>
                    <p>Foundations of yoga practice next line in the foundational model you can learn more about the
                      essence of yoga exploring its history philosophy and fundamental principles. We draw inspiration
                      from our commitment to impart wisdom and our experienced instructors will guide you through the
                      roots of yoga. We will help you build a strong foundation for your teaching journey.</p>
                    <h6>Asana exploration</h6>
                    <p>In our ryt 200 you can learn everything about the alignment and precision of asanas. We guide you
                      through a detailed study of yoga posters focusing on the right alignment adjustments and the
                      therapeutic benefits of every pose. The module will equip you with the skills to teach all the
                      posters effectively.</p>
                    <h6>Anatomy and physiology</h6>
                    <p>You can understand the human body when you choose our yoga teacher training course. We are
                      committed towards holistic learning as we cover all the anatomical structures involved in yoga
                      postures. The effects of yoga on your body and how to adapt all the practices for your
                      individual needs.</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="global_wrapper third_section">
          <div className="container">
            <div className="global_wrapper__content" data-aos="zoom-in-up">
              <div className="leaf">
                <i className="bx bxs-leaf" />
              </div>
              <div className="main_heading">
                <h1>Turiya Yoga bietet Yogalehrer-Ausbildungen in</h1>
              </div>
            </div>
          </div>
          <div className="global_content">
            <div className="container">
              <div className="yogalehrer-grid">
                <div
                  className="third_section__box"
                  data-aos="fade-up"
                  data-aos-delay={100}>
                  <div className="box_img">
                    <img src="/assets/bali_banner_img/mallorca_thumb.webp" className="img-fluid" alt="yoga" />
                  </div>
                  <div className="box_content">
                    <h3>Deutschland</h3>
                    <p>
                      Für diejenigen, die ihre Yogalehrerausbildung in einem
                      behaglichen Rückzugsort im eigenen Land absolvieren
                      möchten – umgeben von Quellen, frischer Luft und den
                      Wäldern des Taunus, ist das Sampurna Seminarhaus nur 30
                      Minuten von Wiesbaden und Mainz entfernt und somit ideal
                      erreichbar.
                    </p>
                    <div className="mehr--btn">
                      <Link href="/yogalehrer-ausbildung-in-sampurna-seminarhaus">
                        MEHR
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="third_section__box"
                  data-aos="fade-up"
                  data-aos-delay={200}>
                  <div className="box_img">
                    <img
                      src="/assets/bali_banner_img/sampurna_thumb.webp"
                      className="img-fluid"
                      alt="sampurna_thumb"
                    />
                  </div>
                  <div className="box_content">
                    <h3>Mallorca</h3>
                    <p>
                      Für all jene, die die berühmten Sandstrände Mallorcas
                      genießen möchten – bieten wir die Yogalehrer-Ausbildung
                      auf Mallorca an. Besuche uns und erlebe eine wundervolle
                      Zeit in der Turiya Yoga Finca. Unser Paket beinhaltet
                      erstklassige Verpflegung und Unterkunft.
                    </p>
                    <div className="mehr--btn">
                      <Link href="/200h-yogalehrer-ausbildung-mallorca">
                        MEHR
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="third_section__box"
                  data-aos="fade-up"
                  data-aos-delay={300}>
                  <div className="box_img">
                    <img src="/assets/bali_banner_img/goa_thumb.webp" className="img-fluid" alt="goa_thumb" />
                  </div>
                  <div className="box_content">
                    <h3>Goa, Indien</h3>
                    <p>
                      Wenn du deine Yogaausbildung am Strand absolvieren
                      möchtest, jedoch auch einen Einblick in die Wurzeln des
                      Yoga erhalten willst, bieten wir dir die Möglichkeit, in
                      Goa, Indien, deine Ausbildung zu machen. Dort, vor der
                      Kulisse von Kokosnussplantagen und grünen Hügeln, findest
                      du zweifellos einige der schönsten Strände.
                    </p>
                    <div className="mehr--btn">
                      <Link href="/yogalehrer-ausbildung-goa-indien">MEHR</Link>
                    </div>
                  </div>
                </div>
                <div
                  className="third_section__box"
                  data-aos="fade-up"
                  data-aos-delay={400}>
                  <div className="box_img">
                    <img
                      src="/assets/bali_banner_img/himachal_thumb.webp"
                      className="img-fluid"
                      alt="himachal_thumb"
                    />
                  </div>
                  <div className="box_content">
                    <h3>Himachal, Indien</h3>
                    <p>
                      Himachal in Indien ist bekannt für seine fröhlichen
                      Menschen, die immergrüne Natur und die außerordentlich
                      frische Luft. Es ist ein herausragender Ort für die
                      Yoga-Praxis in Indien. Das Dorf Bhagsu, das etwa 2100
                      Meter über dem Meeresspiegel liegt und in der Nähe des
                      Haupttempels des Dalai Lama zu finden ist...
                    </p>
                    <div className="mehr--btn">
                      <Link href="/yogalehrer-ausbildung-himalaya-indien">
                        MEHR
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">

          <div className="training_bali__list">
            <h6>Yoga Teacher Training Modules</h6>
            <h6>Foundations of yoga philosophy</h6>
            <p>At the heart of our best yoga teacher training in India lies a deep dive into the philosophical roots
              of yoga. We draw inspiration from the ancient texts like yoga sutras of Patanjali and the Bhagavad
              Gita. The module explores the ethical principles of yoga which is the path to self-realization and
              the interconnectedness of your mind, body and spirit.</p>
            <h6>Asanas</h6>
            <p>It is very important for you to understand and master the yoga postures if you want to become a yoga
              instructor. In this module you can explore different types of yoga postures which focus on your
              physical execution and also alignment principles that ensure a safe and a transformative experience
              for you.</p>
            <h6>Pranayama</h6>
            <p>The breath is the bridge between the mind and body in yoga. The module dives deep in the science of
              pranayama which explores different breathing techniques to improve vitality, balance energy and
              cultivate a deep connection with the life force. You can learn to guide breath work for holistic
              well-being. </p>
            <h6>Meditation and mindfulness practices</h6>
            <p>Irritation is a very important part of your yogic journey. We can foster inner peace and mental
              clarity. The module introduces you to different meditation techniques from mindfulness practices to
              guided visualizations. We can provide you tools to cultivate a focused and a tranquil mind.</p>
            <h6>Anatomy and Physiology </h6>
            <p>Our comprehensive understanding of the human body is integral to the safe and effective yoga
              instruction. The module explores anatomy and Physiology focusing on how different yoga practices
              impact the skeletal muscular and respiratory and nervous systems. You can get insights into adapting
              practices for your individual needs.</p>
            <h6>Teaching methodology and class sequencing</h6>
            <p>You can become a skilled yoga instructor with our best teaching methodology. The module covers class
              sequencing instructional techniques and creating a supportive and inclusive environment. You can
              learn hands-on adjustments effectively for communication and the nuances of teaching diverse groups.
            </p>
            <h6>Yogic lifestyles and ethics</h6>
            <p>Yoga extends beyond the mat in your daily life. The module explores the principles of a yogic
              lifestyle. It can include ethical considerations, diet and mindfulness practices. You can dive deep
              into the yams guiding principles that form the ethical moral foundation of yoga.</p>
            <h6>Business of yoga and entrepreneurship</h6>
            <p>It is very important for you to learn the important business skills. Here you can learn everything
              about branding marketing studio management and ethical considerations of the business of yoga. You
              can learn how to establish a successful and a sustainable career whether through teaching classes or
              establishing your own studios. </p>
            <h6>Continuing education</h6>
            <p>The journey of a yoga teacher is constant. The module encourages you to commit to lifelong learning,
              explore advanced studies, attend workshops, and nurture your personal practice. The focus is on the
              significance of self-care and self-inquiry.</p>
            <div className="row">
              <div className="col-lg-8">
                <div className="bali-list">
                  <h6>Yoga Teacher Courses We Offer In Goa, India </h6>
                  <h6>200H yoga teacher training</h6>
                  <p>Our 200-hour yoga teacher training course India works like the foundational step for you
                    if you are embarking on your yoga teaching journey. It is a special design for both
                    beginners and intermediate practitioners. You must know that the program covers the
                    important parts of yoga philosophy and meditation.</p>
                  <h6> +300H yoga teacher training</h6>
                  <p>If you are seeking to deepen your understanding and expertise, then our 300-hour yoga
                    teacher training is your next step. It is built upon the foundations laid in a 200-hour
                    program. The advanced course explores the delicate asanas in depth philosophies and
                    advanced teaching techniques. You can elevate your practice and teaching to new heights
                    in the vibrant setting of Goa.</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="bali-img">
                  <img src="/assets/banner/rishikesh_banner_img.webp" className="img-fluid" alt="training" />
                </div>
              </div>
            </div>
            <h6>Yoga teacher training +400H</h6>
            <p>Our yoga teacher training 400 hours program is a great experience that combines the curriculum of 200
              hour and 300-hour yoga teacher training. It is a comprehensive training program that certifies you
              as an accomplished yoga instructor and also dives deep into the elements of advanced practices.</p>
            <h6>Yoga teacher for seniors</h6>
            <p>Understanding the different needs of yoga practitioners our yoga teacher for senior’s program focuses
              on adapting yoga practices for an older demographic. The specialized training covers modifications
              and therapeutic approaches to ensure a safe and beneficial experience for seniors.</p>
            <h6>How I Can Enroll</h6>
            {/* about turiya */}
            <div>
              <div className="col-lg-12">
                <div className="about_turiya__right">
                  <ul>
                    <li>
                      You can visit our official website to explore detailed descriptions about our yoga
                      teacher training India. You need to understand the curriculum and the prerequisites.
                    </li>
                    <li>Once you understand the prerequisites you can review the eligibility criteria for
                      the program that you are interested in and ensure that you align with the
                      prerequisites</li>
                    <li>You can reach out to our admission support team, and they can provide you with
                      admission details like accommodation and the overall experience. You should feel
                      free to ask about any specific considerations if you have.</li>
                    <li>Once you have chosen the program and confirm your eligibility you can complete the
                      online application form available on our website. All you need to do is provide
                      accurate and detailed information to help us understand your background objectives
                      and expectations. </li>
                    <li>Carefully you need to review all the terms and conditions of the enrollment
                      including the payment details, cancellation policies and any other relevant
                      information. This is very important for you to ensure transparency and a smooth
                      enrollment process. If you have any queries or concerns you need to seek
                      clarification from our enrollment team. </li>
                    <li>To secure your spot in the chosen program you need to submit the required deposit as
                      outlined in the terms and conditions. The deposit will confirm your enrollment and
                      also contribute towards the overall logistics. We can plan the program accordingly
                      once we know that you are going to enroll in our best yoga course. </li>
                    <li>Once your application and deposit is received you will receive a confirmation from
                      our missions’ team. The e-mail will include essential pre arrival information and it
                      will also include details about your accommodation recommended packing lists and any
                      other pre course readings or preparations.</li>
                    <li>As the start date of your chosen program approaches you need to make important
                      travel arrangements. Our team is always available to you to assist with any travel
                      related inquiries including airport transfers.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


        </div>
        <section className="global_wrapper faq_wrapper" id="see_faq">
          <div className="container">
            <div className="faq_wrapper__content" data-aos="fade-up">

              {/* ============================== latest updated =============================== */}
              <div className="container">
                <div className="faq_wrapper__content" data-aos="fade-up">
                  <div className="faq_heading">
                    <h3>FAQs Yoga Teacher Training</h3>
                  </div>
                  {/* Section 1 */}
                  <div className="faq_box">
                    {faqItems1.map((faq, index) => (
                      <div
                        key={index}
                        className={`faq_box__content ${activeIndex1 === index ? "active" : ""
                          }`}
                        onClick={() => handleToggle(1, index)}>
                        <div className="question">
                          <div className="plus">
                            <i
                              className={`bx ${activeIndex1 === index ? "bx-minus" : "bx-plus"
                                }`}
                            />
                          </div>
                          <h6>{faq.question}</h6>
                        </div>
                        {activeIndex1 === index && (
                          <div className="answer">
                            {faq.answer.map((paragraph, idx) => (
                              <p key={idx} className="mb-3">
                                <span
                                  style={{
                                    fontWeight:
                                      idx === 2 || idx === 3
                                        ? "normal"
                                        : "normal",
                                  }}>
                                  {paragraph}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="faq_box">
                    {faqItems2.map((faq, index) => (
                      <div
                        key={index}
                        className={`faq_box__content ${activeIndex2 === index ? "active" : ""
                          }`}
                        onClick={() => handleToggle(2, index)}>
                        <div className="question">
                          <div className="plus">
                            <i
                              className={`bx ${activeIndex2 === index ? "bx-minus" : "bx-plus"
                                }`}
                            />
                          </div>
                          <h6>{faq.question}</h6>
                        </div>
                        {activeIndex2 === index && (
                          <div className="answer">
                            {faq.answer.map((paragraph, idx) => (
                              <p key={idx} className="mb-3">
                                <span
                                  style={{
                                    fontWeight: idx === 0 ? "bold" : "normal",
                                  }}>
                                  {paragraph}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Section 2 */}

                  {/* ======================================================== */}
                  <div className="faq_box">
                    {faqItems3.map((faq, index) => (
                      <div
                        key={index}
                        className={`faq_box__content ${activeIndex3 === index ? "active" : ""
                          }`}
                        onClick={() => handleToggle(3, index)}>
                        <div className="question">
                          <div className="plus">
                            <i
                              className={`bx ${activeIndex3 === index ? "bx-minus" : "bx-plus"
                                }`}
                            />
                          </div>
                          <h6>{faq.question}</h6>
                        </div>
                        {activeIndex3 === index && (
                          <div className="answer">
                            <p className="mb-3">
                              Die 200H Yogalehrer Ausbildung von Turiya Yoga
                              widmet sich den Stilen des Hatha Yoga
                              (traditionell und modern, mit und ohne Verwendung
                              von Requisiten), Vinyasa und gibt gleichzeitig
                              einen kurzen Einblick in die Tradition des
                              Ashtanga Vinyasa Yoga. Nachdem die Teilnehmer die
                              200h Yogalehrer Ausbildung erfolgreich
                              abgeschlossen haben, sind sie mehr als bereit,
                              Hatha und Vinyasa zu kombinieren und es geschickt
                              zu unterrichten. Werfen wir einen Blick auf diese
                              Traditionen und was du von ihr erwarten kannst, da
                              die Terminologie heutzutage aufgrund von
                              Informationsmangel und anderen, leider auch
                              Marketingstrategien fließend geworden ist:
                            </p>
                            <p className="mb-3">
                              <strong>Hatha Yoga </strong>ist die Mutter aller
                              Yoga-übungen, die den Körper und insbesondere den
                              Atem beeinflussen. Eine typische Praxis von Hatha
                              ist eine langsame Praxis, die traditionelle
                              Körperhaltungen (Asana), Atmungsbewusstsein
                              Pranayama (Beibehaltung der Atemtechniken),
                              Meditation und in einigen übungslinien Mantras
                              kombiniert. In unserer heutigen Gesellschaft
                              konzentrieren sich die Kurse jedoch oft nur auf
                              die Körperhaltung. Der Stil verwendet auch
                              Reinigungstechniken (Kriyas), gelegentlichen
                              Gebrauch von Bandhas (Muskelmanipulationen, die
                              als Energieblockaden angesehen werden) und
                              spezielle Körper- und Atemmanipulationen,
                              sogenannte Mudras.
                            </p>
                            <p className="mb-3">
                              <strong>Ashtanga Vinyasa Yoga</strong> und seine
                              Nachkommen Vinyasa sind moderne, rasante übungen,
                              bei denen die Teilnehmer zwischen Körperhaltungen
                              wechseln, während Atem und manchmal auch Drishti
                              (Blick) in festgelegten Abfolgen synchronisiert
                              werden. Der Ashtanga-Stil zählt Pattabhi Jois und
                              sein Guru Krishnamacharya als die Gründer und hat
                              Asana-übungssequenzen festgelegt, während Vinyasa
                              Flow eine westliche Entwicklung ist, die dem
                              Lehrer die Möglichkeit gibt, verschiedene
                              Lehrsequenzen zu erstellen.
                            </p>
                            <p className="mb-3">
                              Ein weiterer Schüler von Krishnamacharya und ein
                              weiteres Juwel des modernen Yoga war BKS Iyengar.
                              Iyengar entwickelte einen Hatha Yoga-Stil, der
                              häufig Hilfsmittel verwendet und als Iyengar-Stil
                              bezeichnet wird. Der Stil ist in der
                              therapeutischen Yoga-Nische bekannt und hat
                              weitere westliche Lehrer dazu inspiriert, andere
                              inspirierte Traditionen wie Anusara Yoga zu
                              entwickeln.
                            </p>
                            <p className="mb-3">
                              Unser Programm deckt jedoch nicht den Iyengar-Stil
                              ab, der sich offen auf die milimetrische
                              Ausrichtung des Praktikers stützt und einen
                              anderen Yogalehrer-Ausbildungsstil verlangt.
                              Unsere Schulung behandelt die Verwendung von
                              Requisiten und deren Verbindung zum Yoga als
                              unterstützende Praxis für Wohlbefinden und
                              Gesundheit. Unsere Yogalehrer Ausbildung zielen
                              unter anderem darauf ab, ein tieferes Erleben der
                              Körperhaltungen zu fördern und die Teilnehmer in
                              unterschiedlichen Ausrichtungen und Perspektiven
                              der Asana-Praxis zu erleuchten.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="faq_box">
                    {faqItems4.map((faq, index) => (
                      <div
                        key={index}
                        className={`faq_box__content ${activeIndex4 === index ? "active" : ""
                          }`}
                        onClick={() => handleToggle(4, index)}>
                        <div className="question">
                          <div className="plus">
                            <i
                              className={`bx ${activeIndex4 === index ? "bx-minus" : "bx-plus"
                                }`}
                            />
                          </div>
                          <h6>{faq.question}</h6>
                        </div>
                        {activeIndex4 === index && (
                          <div className="answer">
                            {faq.answer.map((paragraph, index) => (
                              <p key={index} className="mb-3">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* ============================================================= */}
                </div>
              </div>
              {/* =========================================================================================== */}
            </div>
          </div>
        </section>

        <Testimonial />
        <Contact />
        <NewsShelter />
      </section>
    </>
  );
};

export default YogaTeacherTraining200h;
