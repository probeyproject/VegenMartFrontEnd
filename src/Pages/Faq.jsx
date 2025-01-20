import React, { useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Common/Footer";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap";
import { Link } from "react-router-dom";

const faqData = [
  {
    iconSrc: "../assets/images/inner-page/faq/start.png",
    title: "Getting Started",
    description:
      "Bring to the table win-win survival strategies to ensure proactive domination.",
  },
  {
    iconSrc: "../assets/images/inner-page/faq/help.png",
    title: "Sales Question",
    description: "Lorizzle ipsizzle boom shackalack sit get down get down.",
  },
  {
    iconSrc: "../assets/images/inner-page/faq/price.png",
    title: "Pricing & Plans",
    description:
      "Curabitizzle fizzle break yo neck, yall quis fo shizzle mah nizzle fo rizzle.",
  },
  {
    iconSrc: "../assets/images/inner-page/faq/contact.png",
    title: "Support Contact",
    description:
      "Gizzle fo shizzle bow wow wow bizzle leo bibendizzle check out this.",
  },
];

const AccordionData = [
  {
    id: "1",
    question: "What is Fastkart and why was the name changed?",
    answer: `Fastkart is leading the charge in transforming India's vast, unorganised grocery landscape through cutting-edge technology and innovation. Blinkit is India's largest and most convenient hyper-local delivery company, which enables you to order grocery, fruits & vegetables, and other daily essential products, directly via your mobile or web browser.
      To know the reason why we changed our brand name from Grofers to Fastkart, read this blog post.`,
  },
  {
    id: "2",
    question: "How to remove the impurities of Graphene oxide?",
    answer: `Discover, Explore & Understanding The Product Description Maecenas ullamcorper eros libero, facilisis tempor mi dapibus vel. Sed ut felis ligula. Pellentesque vestibulum, tellus id euismod aliquet, justo velit tincidunt justo, nec pulvinar tortor elit vitae urna.`,
  },
  {
    id: "3",
    question: "How long will delivery take?",
    answer: `Discover, Explore & Understanding The Product Description Maecenas ullamcorper eros libero, facilisis tempor mi dapibus vel. Sed ut felis ligula. Pellentesque vestibulum, tellus id euismod aliquet, justo velit tincidunt justo, nec pulvinar tortor elit vitae urna.`,
  },
  
];



function Faq() {
  const [openId, setOpenId] = useState("1"); // Initial open item

  const toggle = (id) => {
    if (openId === id) {
      setOpenId(null); // Close if already open
    } else {
      setOpenId(id); // Open the selected item
    }
  };

  return (
    <>
      <div className="container-fluid px-0 overflow-hidden ">
        <header className="pb-md-4 pb-0">
          <HeaderTop />
          <HeaderMiddle />
          <HeaderBottom />
        </header>
        <section className="faq-breadcrumb pt-0">
          <div className="container-fluid-lg">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-contain">
                  <h2>Help Center</h2>
                  <p>
                    We are glad having you here looking for the answer. As our
                    team hardly working on the product, feel free to ask any
                    questions. We Believe only your feedback might move us
                    forward.
                  </p>
                  <div className="faq-form-tag"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-box-contain section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-xl-5">
                <div className="faq-contain">
                  <h2>Frequently Asked Questions</h2>
                  <p>
                    We are answering most frequent questions. No worries if you
                    not find exact one. You can find out more by searching or
                    continuing clicking button below or directly{" "}
                    <Link
                      to="/contact"
                      className="theme-color text-decoration-underline"
                    >
                      contact our support.
                    </Link>
                  </p>
                </div>
              </div>

              <div className="col-xl-7">
                <div className="faq-accordion">
                  <Accordion
                    open={openId}
                    toggle={toggle}
                    className="accordion"
                  >
                    {AccordionData.map((item) => (
                      <AccordionItem key={item.id} className="accordion-item">
                        <AccordionHeader
                          targetId={item.id}
                          className="accordion-header position-relative "
                        >
                          {item.question}
                          <span className="ml-2 position-absolute end-0 top-25 pe-3">
                            {openId === item.id ? (
                              <FontAwesomeIcon icon={faChevronUp} />
                            ) : (
                              <FontAwesomeIcon icon={faChevronDown} />
                            )}
                          </span>
                        </AccordionHeader>
                        <AccordionBody accordionId={item.id}>
                          <p>{item.answer}</p>
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Faq;
