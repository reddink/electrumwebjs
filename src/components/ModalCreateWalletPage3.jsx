import React, { useState } from 'react';

const Page3 = ({ previousPage, onCreate }) => {

  return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Ready to create wallet</h2>
        <div className="flex justify-end space-x-4">
          <button onClick={previousPage}
                  className="bg-blue-500 hover:bg-blue-700 text-white disabled:bg-blue-300 font-bold py-2 px-4 rounded transition duration-300">
            Back
          </button>
          <button
              onClick={onCreate}
              className="bg-blue-500 hover:bg-blue-700 text-white disabled:bg-blue-300 font-bold py-2 px-4 rounded transition duration-300">
            Create
          </button>
        </div>
      </div>
  );
};

export default Page3;
