import React, { useState } from 'react';
import Wrapper from "../assets/wrappers/LandingPage";
import innovify2 from "../assets/images/ino1.png";
import Wrapper2 from "../assets/wrappers/Support";
import { Link } from "react-router-dom";
import Logo from "../components/logo";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={toggleOpen}>
                {question}
                <span className="faq-toggle">{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <div className="faq-answer">{answer}</div>}
        </div>
    );
};

const FAQ = () => {
    const faqData = [
        { question: 'Who can submit a proposal?', answer: 'Anyone in the group can submit the proposal.' },
        { question: 'Can we upload supporting documents related to the proposal?', answer: 'Yes, you can upload supporting documents, they can be in word or pdf format.' },
        { question: 'How will I know what is the current status of my project?', answer: 'Once there is a change in the status, you will be notified by the application or approached by a Fanshawe Faculty on the phone number/email provided by you.' },
        { question: 'Can one user submit more than one proposal?', answer: 'Yes. A user can submit more than one proposal.' },
        { question: 'What happens after the proposal has been approved?', answer: 'Students at Fanshawe will then start working on the proposal and further information will be given to you regarding that.' },
        // { question: 'What if the project proposal I submit is too complex to finish in one term?', answer: 'You will have an option to split the project into more than 1 parts so that it can be completed in multiple terms.' },
        { question: 'What if I want to make changes to the proposal I have already submitted?', answer: 'You can resubmit the proposal with changes.' },
        { question: 'How to reset my password, If I forgot my password?', answer: 'On the login screen you can find the forgot password option to reset your password. Once you go to that option and add your email you will get a reset password mail to your email to create a new password.' },
        { question: 'I am a faculty member, but I don’t see the admin page?', answer: 'This is because when you register you didn’t register as a faculty member or the admin didn’t approve your role privilege. (Contact the admin for further assistance)' },
        { question: 'How do I contact support?', answer: 'We offer support over email (ideaflow@fanshawe.ca) please feel free to contact us!' }
    ];

    return (
      <Wrapper2>
        <div className="faq">
        <h3>
          Frequently <span>Asked</span> Questions 
          </h3> <br />
            {faqData.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
        </Wrapper2>
    );
};

export default function Support() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div> <br />
          {/* <h3>
          Frequently <span>Asked</span> Questions
          </h3> */}
          <FAQ />
        </div> 
        <img src={innovify2} alt="hunt" className="img main-img" /> 
        <br /><Link to="/" className="btn" > <center>Back</center> </Link>
      </div> 
    </Wrapper>
  );
}
