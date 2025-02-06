interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: any;
}

const TablePagination = (props: PaginationProps) => {
    const { currentPage, totalPages, setCurrentPage } = props;
    return (
        <div className="flex items-center justify-center gap-4 mt-4">
            <button 
                onClick={() => setCurrentPage((prevState: number) => prevState - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &larr;
            </button>
            <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </span>
            <button 
                onClick={() => setCurrentPage((prevState: number) => prevState + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &rarr;
            </button>
        </div>
    );
};

export default TablePagination;