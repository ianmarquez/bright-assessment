import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import { useReferralStore } from "../../stores/referrals";
import { deleteReferral } from "../../api/referrals";

interface Props {
  id: string;
  content: string[];
}

export default function Row({ content, id }: Props) {
  const {
    deleteReferrals: deleteReferralStore,
    selected,
    setSelected,
    clearSelected,
  } = useReferralStore();
  const currentRowSelected = selected?.id === id;
  const mutation = useMutation({
    mutationFn: () => deleteReferral(id),
    onSuccess: () => deleteReferralStore(id),
  });

  return (
    <tr
      className={twMerge(
        "hover relative",
        currentRowSelected && "!bg-slate-200",
      )}
      onClick={() => {
        !currentRowSelected ? setSelected(id) : clearSelected();
      }}
    >
      {content.map((value, index) => (
        <td key={index + value} className="font-semibold text-center">
          {value}
        </td>
      ))}
      <td>
        <div className="flex gap-2 justify-center">
          {mutation.isPending || currentRowSelected ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <>
              <button
                className="hover:text-primary duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  mutation.mutateAsync();
                }}
              >
                <FaTrashAlt className="h-4 w-4" />
              </button>
              <button
                className="hover:text-primary duration-300"
                onClick={() => setSelected(id)}
              >
                <FaPencilAlt className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
