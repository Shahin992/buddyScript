import React from 'react'

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "input search text", className = "", onChange }) => {
  return (
    <div className={`_reusable_search_wrap ${className}`}>
      <svg className="_reusable_search_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
        <circle cx="7" cy="7" r="6" stroke="#666"></circle>
        <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3"></path>
      </svg>
      <input 
        className="form-control me-2 _reusable_search_inpt" 
        type="search" 
        placeholder={placeholder} 
        onChange={onChange}
      />
    </div>
  )
}

export default SearchInput
