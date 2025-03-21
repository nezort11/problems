import { useState } from "react";

const TabId = {
  Html: "HTML",
  Css: "CSS",
  JavaScript: "JAVASCRIPT",
};

export default function Tabs() {
  const [currentTab, setCurrentTab] = useState(TabId.Html);

  return (
    <div>
      <div>
        <button onClick={() => setCurrentTab(TabId.Html)}>HTML</button>
        <button onClick={() => setCurrentTab(TabId.Css)}>CSS</button>
        <button onClick={() => setCurrentTab(TabId.JavaScript)}>
          JavaScript
        </button>
      </div>
      <div>
        {
          {
            [TabId.Html]: (
              <p>
                The HyperText Markup Language or HTML is the standard
                markup language for documents designed to be displayed in a
                web browser.
              </p>
            ),
            [TabId.Css]: (
              <p>
                Cascading Style Sheets is a style sheet language used for
                describing the presentation of a document written in a
                markup language such as HTML or XML.
              </p>
            ),
            [TabId.JavaScript]: (
              <p>
                JavaScript, often abbreviated as JS, is a programming
                language that is one of the core technologies of the World
                Wide Web, alongside HTML and CSS.
              </p>
            ),
          }[currentTab]
        }
      </div>
    </div>
  );
}
