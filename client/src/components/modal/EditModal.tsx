import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { FieldsWrapper } from './styled';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface EditModalProps {
    ifOpen: boolean,
    onClose: () => void,
    users: Array<any>,
    currUserId: string,
    onUpdateUser: (name: string, email: string, location: string) => void,
    onAddUser: (name: string, email: string, location: string, title: string, last: string) => void,
    type: string
}

export const EditModal = ({ ifOpen, onClose, users, onUpdateUser, type, onAddUser }: EditModalProps) => {

    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const [nameErr, setNameErr] = useState<string>("")
    const [emailErr, setEmailErr] = useState<string>("")
    const [locationErr, setLocationErr] = useState<string>("")

    const handleSave = () => {
        if (type === "edit") {
            if (checkInputs()) {
                onUpdateUser(name, email, location)
                clear()
                onClose()
            }
        } else {
            if (checkInputs()) {
                onAddUser(name, email, location, title, lastName)
                clear()
                onClose()
            }
        }
    }

    const clear = () => {
        setName("")
        setLastName("")
        setEmail("")
        setLocation("")
        setTitle("")
    }

    const checkInputs = () => {
        if (name.length < 3) {
            setNameErr("At least 3 characters")
            return false
        }
        if (isValidEmail(email)) {
            const ifExists = users.filter(user => user.email === email)
            if (ifExists.length) {
                setEmailErr("Email already exists")
                return false
            } else {
                setEmailErr("")
            }
        } else {
            setEmailErr("Email not valid")
            return false
        }
        if (!location) {
            setLocationErr("Must not be empty")
            return false
        }
        return true
    }

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    return (
        <div>
            <Modal
                open={ifOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {type === "edit" ? "Edit User" : "Add User"}
                    </Typography>
                    <FieldsWrapper>
                        {
                            type === "add" &&
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            >
                                <FormControlLabel defaultChecked value="Mr" control={<Radio />} label="Mr" />
                                <FormControlLabel value="Miss" control={<Radio />} label="Miss" />
                            </RadioGroup>
                        }
                        <TextField
                            required
                            id="outlined-error"
                            label="Name"
                            variant="filled"
                            helperText={nameErr}
                            error={nameErr ? true : false}
                            onBlur={(event) => {
                                if (name.length >= 3)
                                    setNameErr("")
                            }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                        />
                        {
                            type === "add" &&
                            <TextField
                                required
                                id="outlined-error"
                                label="Last Name"
                                variant="filled"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
                            />
                        }
                        <TextField
                            required
                            id="outlined-error-helper-text"
                            label="Email"
                            helperText={emailErr}
                            error={emailErr ? true : false}
                            variant="filled"
                            type="email"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-error-helper-text"
                            label="Location"
                            helperText={locationErr}
                            error={locationErr ? true : false}
                            variant="filled"
                            onBlur={() => {
                                if (location) {
                                    setLocationErr("")
                                }
                            }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLocation(event.target.value)}
                        />
                    </FieldsWrapper>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave} >Save</Button>
                </Box>
            </Modal>
        </div>
    );
}


