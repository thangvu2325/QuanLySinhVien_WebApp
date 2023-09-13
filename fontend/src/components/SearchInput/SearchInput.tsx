import { FunctionComponent } from "react";
import className from "classnames/bind";
import styles from "./SearchInput.module.scss";
import { IconSearch } from "@tabler/icons-react";

const cx = className.bind(styles);
interface SearchInputProps {
  title: string;
}
const SearchInput: FunctionComponent<SearchInputProps> = ({
  title,
  ...props
}) => {
  return (
    <div className="relative text-2xl bg-transparent text-gray-800">
      <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          className="bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder={title}
          {...props}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          <IconSearch width={15} height={15} stroke={2} />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
