"use client";
import { useState } from "react";
import "./modules.css";

const sortData = (data) => {
  if (data.length === 0) return [];
  //sort top level folders and files
  const sortItems = [...data].sort((a, b) => {
    const aIsFolder = Boolean(a?.children);
    const bIsFolder = Boolean(b?.children);

    if (aIsFolder && !bIsFolder) return -1;
    if (!aIsFolder && bIsFolder) return 1;

    return a.name.toLowerCase().localeCompare(b.name);
  });
  //sort child items of folders
  return sortItems.map((item) => {
    if (item?.children) {
      return {
        ...item,
        children: sortData(item.children),
      };
    } else {
      return item;
    }
  });
};

const SubFile = ({ item = {}, depth = 0, isItemOpen = [], handleClick ,handleEdit, inputValue, setInputValue}) => {
  return (
    <div
      className={`${
        item?.children?.length > 0 ? "folder-item item" : "file-item item"
      }`}
      style={{ marginLeft: `${depth * 10}px` }}>
      <div className='single-item' onClick={() => handleClick(item.id)}>
        {item?.children?.length > 0 ? (
          <span className='icon'>&#128193;</span>
        ) : (
          <span className='icon'>&#128196;</span>
        )}
        <p className='name'>{ isItemOpen.find((editItem)=> editItem.id===item.id)?.edit ?<input value={item.name} onChange={(e)=>setInputValue(e.target.value)}  /> : item?.name}</p>
        <span className="edit-icon" onClick={(e)=>handleEdit(e,item.id)}>&#9998;</span>
      </div>
      {item?.children?.length > 0 &&
      isItemOpen?.find((data) => data.id === item.id)?.open
        ? item.children.map((child, index) => (
            <SubFile
              item={child}
              depth={depth + 1}
              key={index}
              isItemOpen={isItemOpen}
              handleClick={handleClick}
              handleEdit={handleEdit}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          ))
        : null}
    </div>
  );
};

const FileExplorer = ({ data = [] }) => {
  const [isItemOpen, setIsItemOpen] = useState([]);
  const [inputValue, setInputValue] = useState('')
  console.log("isItemOpen", isItemOpen);
  const handleClick = (id) => {
    const itemExist = isItemOpen.find((item) => item.id === id);
    console.log("id", id);
    console.log("itemExist", itemExist);
    if (itemExist) {
      setIsItemOpen((prevState) => {
        const state = prevState.map((item) => {
          return item.id === itemExist.id
            ? { ...item, open: !item.open }
            : item;
        });
        return state;
      });
    } else {
      setIsItemOpen([...isItemOpen, { id: id, open: true, edit:false }]);
    }
  };

  const handleEdit = (event,id) =>{
    event.stopPropagation()
    console.log("id-edit",id)
    const itemEdit = isItemOpen.find((item)=>item.id===id);
    console.log("itemEdit",itemEdit)
    if(itemEdit){
        setIsItemOpen((prevState)=>{
             const state = prevState.map((item)=>{
                if(item.id === itemEdit.id){
                    return {
                        ...item,
                        edit: !item.edit
                    }
                }else{
                    return item
                }
            })
            return state
        })
    }else{
        setIsItemOpen([...isItemOpen, {id,open:false, edit:false}])
    }
  }

  const sortedData = sortData(data);
  console.log("data", data);
  return (
    <div className='file-container'>
      {sortedData?.length > 0 &&
        sortedData.map((item, index) => (
          <SubFile
            isItemOpen={isItemOpen}
            handleClick={handleClick}
            handleEdit={handleEdit}
            setInputValue={setInputValue}
            inputValue={inputValue}
            key={index}
            item={item}
            depth={0}
          />
        ))}
    </div>
  );
};
export default FileExplorer;
