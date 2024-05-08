import React from "react";

const Connected = (props) => {
  console.log(props)
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold ">Metamask Is Connected</h1>
      <h3 className="mt-10 text-lg font-semibold">
        Account Address :{" "}
        <span className="text-gray-400 ">{props.address}</span>
      </h3>

      <div className="mt-10 ">
        {props.voteStatus ? (
          <h1>You Have Already Voted</h1>
        ) : (
          <>
            <input
              type="number"
              className=" border-opacity-30 border-black px-5 py-2 outline-gray-500"
              placeholder="enter a number"
              value={props.number}
              onChange={props.handleNumberChange}
            />
            <button
              type="submit"
              className="bg-blue-400 px-2 py-1 ml-5 rounded-md"
              onClick={props.voteFunction}
            >
              vote
            </button>
          </>
        )}
      </div>

      <h3 className="mt-10 text-xl ">Remaining Time - {props.remainingTime}</h3>

      <div className="">
        <table className="w-2/3 mt-20 m-auto">
          <thead>
            <tr className="p-10">
              <th>Index</th>
              <th>Candidate Name</th>
              <th>Vote Count</th>
            </tr>
          </thead>

          <tbody>
            {props.candidatesList.map((candidate, ind) => (
              <tr key={ind}>
                <td>{candidate.index}</td>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Connected;
