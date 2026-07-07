interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="search-bar">
            <span className="search-bar__label">Search</span>
            <input
                className="search-bar__input"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type here"
                aria-label="Search products by name"
                autoFocus
            />
        </div>
    );
}
