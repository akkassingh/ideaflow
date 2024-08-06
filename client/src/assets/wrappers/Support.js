import styled from "styled-components";

const Wrapper2 = styled.section`
  .app {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
}

.app-header {
    background-color: #282c34;
    padding: 20px;
    color: white;
}

.faq {
    margin: 20px auto;
    max-width: 45%;
    text-align: left;
    position: absolute;
    top: 20%;
    overflow: hidden; 
}

.faq-item {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}

.faq-question {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
}

.faq-answer {
    padding-top: 10px;
}

.faq-toggle {
    font-size: 1.2em;
}

.wrapper {
    /* Your existing styles for the Wrapper component */
}

.container {
    /* Your existing styles for the container */
}

.page {
    /* Your existing styles for the page */
}

.img {
    /* Your existing styles for images */
}

.main-img {
    /* Your existing styles for main images */
}
`;
export default Wrapper2;
