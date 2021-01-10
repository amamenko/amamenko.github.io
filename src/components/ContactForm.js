import React, { useState } from "react"
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader"
import "bootstrap/dist/css/bootstrap.min.css"

const ContactForm = () => {
  const [serverState, changeServerState] = useState({
    submitting: false,
    status: null,
  })

  const handleServerResponse = (ok, msg, form) => {
    changeServerState({
      submitting: false,
      status: { ok, msg },
    })

    if (ok) {
      form.reset()
    }
  }

  const handleOnSubmit = e => {
    e.preventDefault()

    const form = e.target

    changeServerState({ submitting: true })

    axios({
      method: "post",
      url: "https://getform.io/f/c43dd34a-a37e-4839-904a-b0ffd3630cf4",
      data: new FormData(form),
    })
      .then(r => {
        handleServerResponse(
          true,
          "Thank you, your message has been submitted and I will get back to you shortly!",
          form
        )
      })
      .catch(r => {
        handleServerResponse(false, r.response.data.error, form)
      })
  }

  return (
    <form onSubmit={handleOnSubmit} style={{ marginTop: "2rem" }}>
      <div className="form-group">
        <label for="exampleInputName">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="exampleInputName"
          required="required"
          maxlength="200"
        />
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1" required="required">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          maxlength="200"
        />
      </div>
      <div className="form-group">
        <label for="exampleFormControlSelect1">Message</label>
        <textarea
          required="required"
          style={{ resize: "none" }}
          name="message"
          id="confirmationText"
          className="form-control"
          id="exampleInputMessage"
          cols="5"
          rows="5"
          maxLength="1000"
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={serverState.submitting}
          style={{ marginRight: "1rem" }}
        >
          Submit
        </button>
        <ClipLoader loading={serverState.submitting} size={20} />
      </div>
      {serverState.status && (
        <p
          style={{ marginTop: "1rem" }}
          className={!serverState.status.ok ? "errorMsg" : ""}
        >
          {serverState.status.msg}
        </p>
      )}
    </form>
  )
}

export default ContactForm
