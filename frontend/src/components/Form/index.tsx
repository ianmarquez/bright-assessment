import { useRef } from "react";
import Heading from "../Typography/Heading";
import Input from "./Input";
import Section from "./Section";
import { useReferralStore } from "../../stores/referrals";
import { useMutation } from "@tanstack/react-query";
import { createReferral, updateReferral } from "../../api/referrals";

export default function Form() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { selected, updateSelected, clearSelected, addReferrals } =
    useReferralStore();
  const isEditing = !!selected.id;
  const mutation = useMutation({
    mutationFn: () => {
      console.log(selected);
      if (isEditing) {
        return updateReferral(selected);
      }
      return createReferral(selected);
    },
    onSuccess: (data) => {
      if (!isEditing) {
        addReferrals({ ...selected, id: data.id });
      }
      clearSelected();
    },
  });

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
    mutation.mutate();
  };

  return (
    <form
      className="w-full lg:w-1/2 gap-2 md:gap-5 flex flex-col md:p-10 p-5 bg-white h-full md:h-[100vh]"
      onSubmit={onFormSubmit}
    >
      <Heading>Referral Builder</Heading>
      <Section subHeading="Personal Details">
        <Input
          type="text"
          placeholder="Given Name"
          label="Given Name"
          name="name"
          onChange={updateSelected}
          value={selected.name}
          required
        />
        <Input
          type="text"
          placeholder="Surname"
          label="Surname"
          name="surname"
          value={selected.surname}
          onChange={updateSelected}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          label="Email"
          name="email"
          value={selected.email}
          onChange={updateSelected}
          required
        />
        <Input
          type="text"
          placeholder="Phone"
          label="Phone"
          name="phone"
          value={selected.phone}
          onChange={updateSelected}
          required
        />
      </Section>
      <Section subHeading="Address">
        <Input
          type="text"
          placeholder="Home Name or #"
          label="Home Name or #"
          name="address.name"
          value={selected.address.name}
          onChange={updateSelected}
          required
        />
        <Input
          type="text"
          placeholder="Street"
          label="Street"
          name="address.street"
          value={selected.address.street}
          onChange={updateSelected}
          required
        />
        <Input
          type="text"
          placeholder="Suburb"
          label="Suburb"
          name="address.suburb"
          value={selected.address.suburb}
          onChange={updateSelected}
          required
        />
        <Input
          type="text"
          placeholder="State"
          label="State"
          name="address.state"
          value={selected.address.state}
          onChange={updateSelected}
          required
        />
        <Input
          type="text"
          placeholder="Postcode"
          label="Postcode"
          name="address.postcode"
          value={selected.address.postcode}
          onChange={updateSelected}
          required
        />
        <Input
          type="text"
          placeholder="Country"
          label="Country"
          name="address.country"
          value={selected.address.country}
          onChange={updateSelected}
          required
        />
      </Section>
      <Section>
        <button
          type="button"
          className="btn btn-outline uppercase"
          onClick={() => {
            dialogRef.current?.showModal();
          }}
        >
          Upload Avatar
        </button>
        <button type="submit" className="btn btn-success uppercase">
          {isEditing ? "Update Referral" : "Create Referral"}
        </button>
      </Section>
      <dialog id="avatar_upload_modal" className="modal" ref={dialogRef}>
        <div className="modal-box">
          <label className="form-control w-full">
            <input
              type="file"
              name="avatar"
              ref={fileInputRef}
              onChange={(event) => {
                const newValue = event.target.files;
                const reader = new FileReader();
                if (!newValue) return;
                updateSelected("fileName", newValue[0].name);
                reader.readAsDataURL(newValue[0]);
                reader.onload = () => {
                  updateSelected("avatar", reader.result as string);
                };
              }}
              className="file-input file-input-bordered w-full"
              accept=".jpeg,.png,.jpg"
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
