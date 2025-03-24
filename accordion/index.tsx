import { useState, useId } from "react";

/*
Accordion using:
1 JavaScript (react)
2 CSS (checkbox :checked label + "~")

Content toggling:
1. Rerendering (DOM manipulation)
2. Styling (display none / visibility hidden)

Styling:
1. Inline styles (not overridable)
2. Styles sheets
*/

const AccordionSectionState = ({ title, ...props }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div {...props}>
      <div role="button" onClick={toggleAccordion}>
        {title}{" "}
        <span
          aria-hidden={true}
          className={`accordion-icon ${
            isOpen ? "" : "accordion-icon--rotated"
          }`}
        />
      </div>
      <div
        // use css classes
        style={isOpen ? undefined : { display: "none" }}
        children={props.children}
      />
    </div>
  );
};

const AccordionSection = ({ title, ...props }) => {
  const accordionId = useId();

  return (
    <div {...props} className="accordion">
      <input
        type="checkbox"
        id={accordionId}
        className="accordion__checkbox"
        defaultChecked
      />

      <label for={accordionId} role="button">
        <div className="accordion__toggle">
          {title} <span aria-hidden={true} className="accordion-icon" />
        </div>
      </label>

      <div className="accordion__content" children={props.children} />
    </div>
  );
};

export default function Accordion() {
  return (
    <div>
      <AccordionSection title="HTML" style={{ marginBottom: 16 }}>
        The HyperText Markup Language or HTML is the standard markup
        language for documents designed to be displayed in a web browser.
      </AccordionSection>

      <AccordionSection title="CSS" style={{ marginBottom: 16 }}>
        Cascading Style Sheets is a style sheet language used for
        describing the presentation of a document written in a markup
        language such as HTML or XML.
      </AccordionSection>

      <AccordionSection title="JavaScript">
        JavaScript, often abbreviated as JS, is a programming language that
        is one of the core technologies of the World Wide Web, alongside
        HTML and CSS.
      </AccordionSection>
    </div>
  );
}
