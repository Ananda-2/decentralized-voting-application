import React from "react";

const Finished = (props) => {

  let winnerList = [];
  let maxVote = 0;
  props.candidatesList.map((candidate, ind) => {
    if (candidate.voteCount === maxVote) {
      winnerList.push(candidate.name);
    } else if (candidate.voteCount > maxVote) {
      winnerList = [];
      winnerList.push(candidate.name);
      maxVote = candidate.voteCount;
    }
  });


  return (
    <div className="text-center">
      <h1 className=" text-3xl font-bold mt-20 w-full text-center b ">
        Voting Finished
      </h1>

      <h3 className="my-10 text-2lg font-semibold text-center text-gray-500">
        Results - Candidate who got maximum votes is/are --
      </h3>

      {winnerList.map((winner, ind) => (
        <span className=" ml-10">{winner}</span>
      ))}

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

export default Finished;
