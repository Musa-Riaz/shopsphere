import SearchInput from "./search-input";
import Categories from "./categories";
interface SearchFilterProps {
  data: any;
}

const SearchFilters = ({ data }: SearchFilterProps) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4">
        <SearchInput data={data} />
        <div className="hidden lg:block">
        <Categories data={data} />
        </div>
    </div>
  );
};
export default SearchFilters;
