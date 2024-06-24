import React from "react";

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full flex justify-center items-center bg-yellow-900 bg-opacity-40">
      <div className="relative w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b-8 rounded-t dark:border-orange-600">
            <h3 className="text-xl font-medium text-gray-900">
              Hoe te spelen in 3 simpele stappen
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4 ">
            <p className="text-base leading-relaxed text-orange-700">
              Stap 1: Maak je kaart
            </p>
            <p className="text-base leading-relaxed ">
              Je kunt je eigen bingokaart maken met woorden die je zelf kiest.
              Of, je kunt een kaart laten maken voor een speciaal thema.
            </p>
            <p className="text-base leading-relaxed text-orange-700">
              Stap 2: Kijk goed om je heen
            </p>
            <p className="text-base leading-relaxed ">
              Tijdens je reis in de auto, kijk goed naar buiten en zoek naar de
              woorden op je bingokaart.
            </p>
            <p className="text-base leading-relaxed text-orange-700 ">
              Stap 3: Vink de woorden af
            </p>
            <p className="text-base leading-relaxed ">
              Als je een woord hebt gevonden, kruis het dan af op je kaart. Het
              doel is om een horizontale, verticale, of diagonale lijn te maken.
            </p>
            <p className="text-base leading-relaxed ">
              Veel plezier met spelen en kijk goed om je heen!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
