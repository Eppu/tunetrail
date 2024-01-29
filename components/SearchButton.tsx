export const SearchButton = ({
  onClick,
  isLoading,
  disabled,
}: {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}) => (
  <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
    disabled={disabled}
    onClick={() => onClick()}
  >
    {isLoading ? <span className="loading loading-dots loading-xs"></span> : 'Search'}
  </button>
);
