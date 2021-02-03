import styled from 'styled-components';

export default function SearchArea ({ setQuery, query }) {
    const handleChange = (e) => {
        const nextValue = e.target.value;
        setQuery(nextValue);
    };

    return (
        <SearchBox>
            <SearchInput
                type='text'
                placeholder={`Search here`}
                value={query}
                onChange={(e) => handleChange(e)}
            />
        </SearchBox>
    )
};

const SearchBox = styled.div`
    justify-content: flex-start;
    display: flex;

	@media(max-width: 600px) {
        flex-wrap: wrap;
    }
`;

const SearchInput = styled.input`
	font-size: 1em;
	padding: 0.5rem 0.5em;
	border-radius: 4px;
	background-color: white;
	border: 1px solid transparent;
	margin: 1em;
	height: 1.2em;
	width: 100%;
	box-shadow: 0 0 0 1px #6b7177;
`;