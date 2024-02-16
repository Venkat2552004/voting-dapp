import React from 'react';

const Connected = (props) => {
  return (
    <section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center space-y-10">
      <h2>You are connected on account {props.account}</h2>
      <h3>Remaining time for voting is {props.remainingTime}</h3>
      {props.voted ? (
        <h3>You have already voted</h3>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full flex justify-center">
          <table className=" w-3/5 text-m text-left rtl:text-right text-gray-500 dark:text-gray-400 table-width">
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
                <th scope="col" className="px-6 py-3">
                  Action
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
                    <td className="px-6 py-4">
                      <button onClick={props.vote(index)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-transparent cursor-pointer">
                        Vote
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="bg-gradient-to-b from-black-50 to-transparent dark:from-black-300 w-full h-full absolute top-0 left-0 z-0"></div>
    </section>
  );
};

export default Connected;
