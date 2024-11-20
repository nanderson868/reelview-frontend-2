"use client";
import React from "react";
import { Checkbox, Table } from "flowbite-react";
import { HiOutlineRefresh } from "react-icons/hi";
import { timeAgo } from "_utils/helpers";
import { useAPI } from "_hooks/useAPI";
import SmartButton from "./SmartButton";
import { UserData } from "_utils/types";

function isUser(object: any): object is UserData {
  return (
    object !== undefined &&
    object.id !== undefined &&
    object.username !== undefined
  );
}

export default function UserTable() {
  const { api } = useAPI();

  const users = Object.values(api.getStore())
    .filter(
      (query) => query.data !== undefined && query.data.user !== undefined,
    )
    .map((query) => {
      return query.data?.user ?? {};
    })
    .filter(isUser); // This will ensure only User objects are included

  if (!users || !users.length) return null;

  return (
    <div className="panel-wrapper">
      <div className="item-display-wrapper">
        <Table>
          <Table.Head>
            <Table.HeadCell className="table-head-cell-first">
              <Checkbox />
            </Table.HeadCell>
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Count</Table.HeadCell>
            <Table.HeadCell>Synced</Table.HeadCell>
            <Table.HeadCell className="table-head-cell-last">
              <span className="sr-only">Refresh</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {users.map((user: UserData, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    {/* <Table.Cell className=" p-4"> */}
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="table-body-cell-index">
                    {user.username}
                  </Table.Cell>
                  <Table.Cell>{user.movie_count || "-"}</Table.Cell>
                  <Table.Cell className="table-body-cell-date">
                    {timeAgo(user.synced_at) ?? "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Table.Cell className=" p-4"> */}
                    <SmartButton
                      key={index}
                      onClick={() => api.syncUsers([user.username])}
                      Icon={HiOutlineRefresh}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
