"use client";

import AuthLayout from "@/components/AuthLayout";
import {
  createChecklist,
  createChecklistItem,
  deleteChecklist,
  deleteChecklistItem,
  getChecklistList,
} from "@/lib/checklistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function ItemPage() {
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["checklist"],
    queryFn: getChecklistList,
  });

  const createMutation = useMutation({
    mutationFn: (name: string) => createChecklist(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklist"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => deleteChecklist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklist"] });
    },
  });

  const createMutationItems = useMutation({
    mutationFn: ({ name, id }: { name: string; id: string | number }) =>
      createChecklistItem(name, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklist"] });
    },
  });

  const deleteMutationItems = useMutation({
    mutationFn: ({
      checklistId,
      itemId,
    }: {
      checklistId: string | number;
      itemId: string | number;
    }) => deleteChecklistItem(checklistId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklist"] });
    },
  });

  const handleCreateChecklist = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const value = input.value;

      if (value) {
        createMutation.mutate(value);
        input.value = "";
      }
    }
  };

  const handleCreateItems = (
    e: React.KeyboardEvent<HTMLInputElement>,
    checklistId: string | number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const value = input.value;

      if (value) {
        createMutationItems.mutate({ name: value, id: checklistId });
        input.value = "";
      }
    }
  };

  const colors = [
    "bg-red-800",
    "bg-green-800",
    "bg-blue-800",
    "bg-yellow-800",
    "bg-purple-800",
    "bg-pink-800",
    "bg-indigo-800",
    "bg-teal-800",
    "bg-orange-800",
    "bg-lime-800",
  ];

  return (
    <AuthLayout>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}
      <div className="mb-10 flex flex-col gap-4">
        <div className="text-xl">Add Checklist</div>
        <input
          onKeyDown={handleCreateChecklist}
          type="text"
          className="border border-neutral-50 p-1"
          placeholder="Please Press Key Enter"
        />
      </div>

      {!isLoading && !isError && (
        <>
          {data.length === 0 && <p>No items found.</p>}
          <div className="grid grid-cols-3 gap-4">
            {data.map((item: any, index: number) => {
              const colorClass = colors[index % colors.length];
              return (
                <div className={`shadow-2xl p-4 ${colorClass}`} key={item.id}>
                  <div className="flex justify-between">
                    <div className="font-bold text-xl">{item?.name || "-"}</div>
                    <div>
                      <button
                        onClick={() => deleteMutation.mutate(item?.id)}
                        className="cursor-pointer border border-neutral-50 rounded-2xl py-1 px-3"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                  <div className="py-2">
                    <input
                      onKeyDown={(e) => handleCreateItems(e, item?.id)}
                      type="text"
                      className="border border-neutral-50 p-1"
                      placeholder="Please Press Key Enter"
                    />
                  </div>
                  <div>
                    {item?.items?.map((value: any, x: number) => (
                      <div
                        className="text-md py-2 flex justify-between"
                        key={x}
                      >
                        <div>{value?.name}</div>
                        <div>
                          <button
                            onClick={() => {
                              deleteMutationItems.mutate({
                                checklistId: item?.id,
                                itemId: value?.id,
                              });
                            }}
                            className="cursor-pointer border border-neutral-50 rounded-2xl py-1 px-2"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </AuthLayout>
  );
}
