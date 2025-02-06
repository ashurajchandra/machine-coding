interface Props {
    itemPerPage: number;
    setItemPerPage: any;
    options: number[];
}

const BucketSize = (props: Props) => {
    const { itemPerPage, setItemPerPage, options } = props;

    return (
        <div className="flex items-center gap-2">
            <select
                value={itemPerPage}
                onChange={(e) => setItemPerPage(Number(e.target.value))}
                className="px-3 py-1 border rounded text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {`Shows - ${option}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BucketSize;