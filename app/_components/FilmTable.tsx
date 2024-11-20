"use client";
import React from "react";
// import { FaCircle } from "react-icons/fa";
// import { IFilmDetail } from "../types";
// import { useAPI } from "../_hooks/useAPI";

export default function FilmTable() {
  // return null;
  // const { UserQueryResult, filmResults } = useAPI();

  // if (!UserQueryResult || !filmResults) {
  //   return null;
  // }
  return (
    <div className="hidden">
      {/* {Object.keys(results).length > 0 && (
        <p>
          Matches:{" "}
          {Object.keys(results).reduce(
            (acc, key) => acc + results[parseInt(key)].length,
            0,
          )}
        </p>
      )} */}
      {/* {Object.entries(filmResults)
        .sort(
          ([overlapA], [overlapB]) => parseInt(overlapB) - parseInt(overlapA),
        )
        .map(([overlap, group]) => (
          <React.Fragment key={overlap}>
            <h2>
              {overlap}/
              {Object.keys(UserQueryResult).filter((name) => name).length}
            </h2>
            <div className="dark:bg- rounded-lg border border-gray-200 bg-zinc-100 shadow dark:border-gray-700">
              <table className="w-full text-left text-sm  ">
                <thead className="text-xs uppercase dark:bg-highlight">
                  <tr className="border-b  dark:border-gray-700">
                    <th className="px-6 py-3">Film</th>
                    {Object.keys(UserQueryResult)
                      .filter((name) => name)
                      .map((username, index) => (
                        <th className="px-6 py-3" key={index}>
                          {username}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {group.map((film: IFilmDetail, index: number) => (
                    <tr className="border-b dark:border-gray-700" key={index}>
                      <td className="w-3/5 text-nowrap border-r text-lg dark:border-gray-700">
                        {film.slug}
                      </td>
                      {Object.keys(UserQueryResult).map((username, idx) => (
                        <td
                          className="max-w-1 items-center justify-center"
                          key={idx}
                        >
                          {film.users.includes(username) ? (
                            <FaCircle
                              style={{
                                width: "1em",
                                margin: "auto",
                              }}
                              color="rgb(98	197	84)"
                            />
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ))} */}
    </div>
  );
}
