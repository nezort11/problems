import submitForm from "./submitForm";

export default function App() {
  return (
    <form
      method="POST"
      action="https://www.greatfrontend.com/api/questions/contact-form"
      // Ignore the onSubmit prop, it's used by GFE to
      // intercept the form submit event to check your solution.
      onSubmit={submitForm}
    >
      <div>
        <label>Your name</label>
      </div>
      <input name="name" type="text" required />

      <div>
        <label>Your email</label>
      </div>
      <input name="email" type="email" required />

      <div>
        <label>Message</label>
      </div>
      <textarea name="message" rows={10} required />

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
