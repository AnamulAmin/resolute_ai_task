"use client";
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";

function ParticipantFormModal({ setUser }) {
  const closeBtn = useRef(null);
  const handleForm = (e) => {
    e.preventDefault();
    const userName = e.target.username.value;

    sessionStorage.setItem("userName", JSON.stringify({ userName }));
    setUser({ userName });
    closeBtn.current.click();
  };

  return (
    <dialog id="my_modal_1" className="modal w-3/4 rounded">
      <div className="modal-box w-full">
        <div className="modal-action mt-0 mb-2">
          <form method="dialog">
            <button className="btn" ref={closeBtn}>
              <IoMdClose className="text-2xl" />
            </button>
          </form>
        </div>
        <div className="">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border"
            onSubmit={handleForm}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                name="username"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="btn btn-neutral text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Participant
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ParticipantFormModal;
