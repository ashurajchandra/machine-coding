"use client"

//Import Npm modules
import { useMemo, useState } from "react";
//Import modules
import Table from "../modules/table";
import TablePagination from "../modules/pagination";
import BucketSize from '../modules/bucketSize';
//Import constants
import {usersData as initialUsersData, header, dataKey} from './usersData';

const sortUsers = (users, order, key) =>{
 
    const clonedUsers = users.slice();

    switch(key){
        case 'id':
        case 'age':
            return clonedUsers.sort((a,b)=>(
                order ==='asc'
                ? a[key] - b[key]
                : b[key] - a[key]
            ))

      case 'name':
      case 'occupation':

      return clonedUsers.sort((a,b)=>(
        order ==='asc'
        ?
        a[key].localeCompare(b[key])
        :b[key].localeCompare(a[key])

      ))

      default: return clonedUsers
    }
}

const Users = () =>{
const [currentPage, setCurrentPage] = useState(1);
const [itemPerPage, setItemPerPage] = useState(5);
const [sortOrder, setSortOrder] = useState('asc');
const [sortOrderKey, setSortOrderKey] = useState();
const [users, setUsers] = useState(initialUsersData);

const sortedUser = useMemo(()=>{
   return sortUsers(users, sortOrder,sortOrderKey)
},[users, sortOrder, sortOrderKey])

const {totalPages, paginatedData} = useMemo(()=>{
 const totalItems = sortedUser.length;
 const totalPages = Math.ceil(totalItems/itemPerPage);
 const startIndex = (currentPage-1)* itemPerPage;
 const endIndex = startIndex +itemPerPage;

 return {totalPages, paginatedData: sortedUser.slice(startIndex,endIndex)}
},[currentPage, itemPerPage, sortedUser])
const handleSort = (key:any) =>{
 //check if current key pressed by user is same as previous if same reverse the order 
   setSortOrder((prevOrder)=> sortOrderKey ===key && prevOrder==='asc'? 'dsc':'asc');
   setSortOrderKey(key)
}

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
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
            <div className="mt-[18px]">
            <BucketSize
                itemPerPage={itemPerPage}
                setItemPerPage={setItemPerPage}
                options={[5, 10, 15, 20, 40]}
            />
            </div>
        </div>
    </div>
    )
}

export default Users