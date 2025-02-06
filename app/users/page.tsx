"use client";

// Import NPM modules
import { useMemo, useState } from "react";
// Import modules
import Table from "../modules/table";
import TablePagination from "../modules/pagination";
import BucketSize from "../modules/bucketSize";
// Import constants
import { usersData as initialUsersData, header, dataKey } from "./usersData";

type User = {
  id: number;
  name: string;
  age: number;
  occupation: string;
};


const sortUsers = (users: User[], order: "asc" | "desc", key?: keyof User): User[] => {
  if (!key) return users;

  const clonedUsers = [...users];

  return clonedUsers.sort((a, b) => {
    if (key === "id" || key === "age") {
      return order === "asc" ? a[key] - b[key] : b[key] - a[key];
    } else {
      return order === "asc"
        ? (a[key] as string).localeCompare(b[key] as string)
        : (b[key] as string).localeCompare(a[key] as string);
    }
  });
};

const Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortOrderKey, setSortOrderKey] = useState<keyof User | undefined>(undefined);
  const [users] = useState<User[]>(initialUsersData);

  const sortedUsers = useMemo(() => sortUsers(users, sortOrder, sortOrderKey), [
    users,
    sortOrder,
    sortOrderKey,
  ]);

  const { totalPages, paginatedData } = useMemo(() => {
    const totalItems = sortedUsers.length;
    const totalPages = Math.ceil(totalItems / itemPerPage);
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    return { totalPages, paginatedData: sortedUsers.slice(startIndex, endIndex) };
  }, [currentPage, itemPerPage, sortedUsers]);

  const handleSort = (key: keyof User) => {
    setSortOrder((prevOrder) => (sortOrderKey === key && prevOrder === "asc" ? "desc" : "asc"));
    setSortOrderKey(key);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Table
        handleSort={handleSort}
        data={paginatedData}
        header={header}
        dataKey={dataKey}
        sortOrder={sortOrder}
        sortOrderKey={sortOrderKey}
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-[60%] mt-4">
        <TablePagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        <div className="mt-[18px]">
          <BucketSize setCurrentPage={setCurrentPage} itemPerPage={itemPerPage} setItemPerPage={setItemPerPage} options={[5, 10, 15, 20, 40]} />
        </div>
      </div>
    </div>
  );
};

export default Users;
