import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { FaLock, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import { useReferralStore } from "../../stores/referrals";
import { deleteReferral } from "../../api/referrals";

export interface Props {
  id: string;
  content: string[];
  avatar?: {
    fileName: string;
    data: string;
  };
}

export default function Row({ content, id, avatar }: Props) {
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
      <td>
        <div className="avatar">
          <div className="rounded-full w-8">
            <img src={avatar ? avatar.data : "/avatar.png"} />
          </div>
        </div>
      </td>
      {content.map((value, index) => (
        <td key={index + value} className="font-semibold text-center">
          {value}
        </td>
      ))}
      <td>
        <div className="flex gap-2 justify-center">
          {mutation.isPending || currentRowSelected ? (
            <FaLock className="h-4 w-4" />
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
