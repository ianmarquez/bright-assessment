import axios from "axios";
import { ReferralShape } from "../types/Referral";

export const fetchReferrals = (): Promise<ReferralShape[]> =>
  axios
    .get("http://localhost:8080/v1/referrals")
    .then((response) => response.data);

export const deleteReferral = (id: string): Promise<ReferralShape[]> =>
  axios
    .delete("http://localhost:8080/v1/referrals", { params: { id } })
    .then((response) => response.data);

export const createReferral = (
  referral: ReferralShape,
): Promise<ReferralShape> =>
  axios
    .post("http://localhost:8080/v1/referrals", referral)
    .then((response) => response.data);

export const updateReferral = (
  referral: ReferralShape,
): Promise<ReferralShape> =>
  axios
    .put(`http://localhost:8080/v1/referrals/${referral.id}`, referral)
    .then((response) => response.data);
