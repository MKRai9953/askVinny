import { FormEvent, useState } from "react";
import "./styles.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Instructions for Candidate:
// 1. Clone this repo
// 2. Add an input field to accept an email.
// 3. Add a button that passes the input value to the parent component.
// 4. In the parent component, add logic to send the value to a backend with a POST request to
//the following url https://webhook.site/30b1bdd1-b233-4262-b3f0-918cb9d94e71. Along with the email, send your github username in the JSON.
// 5. Add styling to the button (Button) and input (Input) using the ShadCN Component library here: https://ui.shadcn.com/docs/components/input
// 6. Please return your video, along with your cloned github repo link.

const EmailForm = ({ submit }: { submit(mail: string): void }) => {
  const [mail, setMail] = useState("");
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    submit(mail);
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setMail(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default function App() {
  const submitHandler = async (email: String) => {
    const payload = {
      email,
      github_user: "MKRai9953",
    };

    try {
      const response = await fetch(
        "https://webhook.site/30b1bdd1-b233-4262-b3f0-918cb9d94e71",
        {
          method: "POST",
          headers: {
            type: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Cannot submit your response");
      }
      console.log("email submitted");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <EmailForm submit={submitHandler} />
    </div>
  );
}
