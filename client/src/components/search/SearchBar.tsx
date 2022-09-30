import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react'
import { Button, TextField } from '@mui/material';

export const SearchBar: React.FC<{ onSearch: (filter: string, value: string) => void, resetSearch: () => void }> = ({ onSearch, resetSearch }) => {

    const [filter, setFilter] = useState<string>("")
    const [searchValue, setSearchValue] = useState<string>("")

    const clear = () => {
        setFilter("")
        setSearchValue("")
    }

    return (
        <FormControl>
            <FormLabel>Search by:</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setFilter(e.target.value)}
            >
                <FormControlLabel value="name" control={<Radio />} label="Name" />
                <FormControlLabel value="email" control={<Radio />} label="Email" />
                <FormControlLabel value="id" control={<Radio />} label="Id" />
                <FormControlLabel value="location" control={<Radio />} label="City" />
            </RadioGroup>
            <TextField
                disabled={!filter}
                label="Search.."
                variant="standard"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button disabled={!searchValue} sx={{ margin: 1 }} variant="outlined" onClick={() => onSearch(filter, searchValue)}>Search</Button>
            <Button variant="contained" sx={{ margin: 1 }} onClick={() => {
                clear()
                resetSearch()
            }}>Reset</Button>
        </FormControl>
    );
}