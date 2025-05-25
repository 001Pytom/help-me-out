import toast from "react-hot-toast";
import { create } from "zustand";

type ConfirmStore = {
  promiseResolver: ((value: boolean) => void) | null;
  setResolver: (resolver: (value: boolean) => void) => void;
};

const useConfirmStore = create<ConfirmStore>((set) => ({
  promiseResolver: null,
  setResolver: (resolver) => set({ promiseResolver: resolver }),
}));

export function useToastConfirm() {
  return (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const { setResolver } = useConfirmStore.getState();

      toast.custom((t) => (
        <div className="bg-white border shadow p-4 rounded-md w-[280px] space-y-2 ">
          <p className="text-sm text-gray-900">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ));
    });
  };
}
