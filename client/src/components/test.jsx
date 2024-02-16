import React from 'react';

const Connected = (props) => {
  return (
    <section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center space-y-10">
      <h1>You are connected on account {props.account}</h1>
      {props.voted ? (
        <h3>You have already voted</h3>
      ) : (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full flex justify-center">
      <input
        type="number"
        value={props.number}
        onChange={props.handleNumberChange}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
            
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={props.voteFunction}
            >
              Vote
            </button>
          </div>
          <table className="w-3/5 text-m text-left rtl:text-right text-gray-500 dark:text-gray-400 table-width">
            <thead className="text-l text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Index
                </th>
                <th scope="col" className="px-6 py-3">
                  Party Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Vote Count
                </th>
              </tr>
            </thead>
            <tbody>
              {props.candidates.map((candidate, index) => {
                return (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {candidate.index}
                    </th>
                    <td className="px-6 py-4">{candidate.name}</td>
                    <td className="px-6 py-4">{candidate.voteCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </>
      )}
      {/* <div className="bg-gradient-to-b from-black-50 to-transparent dark:from-black-300 w-full h-full absolute top-0 left-0 z-0"></div> */}
    </section>
  );
};

export default Connected;
