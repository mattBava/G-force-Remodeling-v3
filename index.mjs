import axios from "axios";
import { env } from "dotenv";

env.config();
const key = process.env.MAIL_TOKEN;

async function sendEmail(form) {
  const options = {
    method: "POST",
    url: "https://send.api.mailtrap.io/api/send",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Api-Token": key,
    },
    data: {
      to: [{ email: quote.email, name: "John Doe" }],
      from: { email: "matthew.bava@gmail.com", name: "Example Sales Team" },
      subject: "Thank you for Requesting a Quote!",
      text: "Hello, I will be reaching out shortly to let you know if I can help you remodel your home! In the meantime please send me some photos of what you need help remodeling so that I could have a better idea of the scope of work. Thanks Adam",
      category: "API Test",
    },
  };

  console.log(options);
  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

const quoteForm = document.getElementById("form");

quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let completed = false;

  for (let i = 0; i < 9; i++) {
    if (quoteForm[i].value === "") {
      alert("Please fill out all sections of the form");
      i = 9;
      completed = false;
    } else {
      const formFilled = {
        fName: quoteForm[0].value,
        lName: quoteForm[1].value,
        email: quoteForm[2].value,
        phone: quoteForm[3].value,
        adr: quoteForm[4].value,
        city: quoteForm[5].value,
        state: quoteForm[6].value,
        zip: quoteForm[7].value,
        project: quoteForm[8].value,
      };
      completed = true;
    }
  }
  if (completed == true) {
    sendEmail(formFilled);
    alert("Thank you");
  }
});
