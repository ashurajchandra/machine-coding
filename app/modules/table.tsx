import React from 'react';

interface Header {
  label: string;
  key: number | string;
}

interface TableProps {
  data: any[];
  header: Header[];
  dataKey: string[];
  handleSort: any;
  sortOrder: string;
  sortOrderKey:any;
}

const Table = (props: TableProps) => {
  const { data = [], header = [], dataKey = [] , handleSort=()=>{}, sortOrder='', sortOrderKey=''} = props;

  return (
    <div className="flex justify-center w-full">
      <div className="w-[60%] rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <div className={`overflow-y-auto ${data.length > 10 ? 'max-h-[580px]' : ''}`}>
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {header.map(({ label, key }) => (
                    <th 
                      key={key}
                      onClick={()=>handleSort(key)}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    >
                      {label} {sortOrder=='asc' && sortOrderKey===key? <span>&uarr;</span>: <span>&darr;</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {dataKey.map((itemKey, keyIndex) => (
                      <td 
                        key={`${index}-${keyIndex}`}
                        className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                      >
                        {item[itemKey]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;