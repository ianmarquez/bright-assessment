import { useRef } from "react";
import Heading from "../Typography/Heading";
import Input from "./Input";
import Section from "./Section";

export default function Form() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <form className="w-full lg:w-1/2 gap-2 md:gap-5 flex flex-col md:p-10 p-5 bg-white h-full md:h-[100vh]">
      <Heading>Referral Builder</Heading>
      <Section subHeading="Personal Details">
        <Input
          type="text"
          placeholder="Given Name"
          label="Given Name"
          name="personal.givenName"
          required
        />
        <Input
          type="text"
          placeholder="Surname"
          label="Surname"
          name="personal.surname"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          label="Email"
          name="personal.email"
          required
        />
        <Input
          type="text"
          placeholder="Phone"
          label="Phone"
          name="personal.phone"
          required
        />
      </Section>
      <Section subHeading="Address">
        <Input
          type="text"
          placeholder="Home Name or #"
          label="Home Name or #"
          name="address.homeName"
          required
        />
        <Input
          type="text"
          placeholder="Street"
          label="Street"
          name="address.street"
          required
        />
        <Input
          type="text"
          placeholder="Suburb"
          label="Suburb"
          name="address.suburb"
          required
        />
        <Input
          type="text"
          placeholder="State"
          label="State"
          name="address.state"
          required
        />
        <Input
          type="text"
          placeholder="Postcode"
          label="Postcode"
          name="address.postcode"
          required
        />
        <Input
          type="text"
          placeholder="Country"
          label="Country"
          name="address.country"
          required
        />
      </Section>
      <Section>
        <button
          className="btn btn-outline uppercase"
          onClick={() => {
            dialogRef.current?.showModal();
          }}
        >
          Upload Avatar
        </button>
        <button className="btn btn-success uppercase">Create Referral</button>
      </Section>
      <dialog id="avatar_upload_modal" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <label className="form-control w-full">
            <input
              type="file"
              name="avatar"
              className="file-input file-input-bordered w-full"
            />
          </label>
          <div className="modal-action">
            <button
              className="btn btn-error"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </form>
  );
}
