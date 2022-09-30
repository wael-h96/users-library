import { Button, Grid } from "@mui/material"
import { Container, ToolbarWrapper } from "./styled"
import { useEffect, useState } from "react"
import { getUsers } from "../../data/data"
import { UserCard } from "../user-card/UserCard"
import { EditModal } from "../modal/EditModal"
import { v4 as uuidv4 } from 'uuid';
import { SearchBar } from "../search/SearchBar"


export const MainPage = () => {

    const [users, setUsers] = useState<any>([])
    const [ifOpen, setOpenModal] = useState<boolean>(false)
    const [currUser, setCurrUser] = useState<string>("")
    const [modalType, setModalType] = useState<string>("")

    useEffect(() => {
        fetchUsers()
    }, [])


    const fetchUsers = async () => {
        try {
            const usersData = await getUsers(10)
            setUsers(usersData)
            console.log(usersData)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteUser = (id: string) => {
        const newUsersList = users.filter((user: any) => user.login.uuid !== id)
        setUsers(newUsersList)
    }

    const updateUser = (name: string, email: string, location: string) => {
        const objIndex = users.findIndex((user: any) => user.login.uuid === currUser)
        if (objIndex === -1)
            return
        const updateObj: any = users[objIndex]
        updateObj.email = email
        updateObj.name.first = name
        updateObj.location.city = location
        setUsers(users)
    }

    const addUser = (name: string, email: string, location: string, title: string, last: string) => {
        const uuid = uuidv4()
        const newUser: any = {
            email,
            login: { uuid },
            name: {
                title,
                first: name,
                last
            },
            location: {
                street: {},
                city: location,
                country: ""
            }
        }
        users.push(newUser)
        setUsers(users)
    }

    const handleSearch = (filterValue: string, value: string) => {
        let searchRes = []
        if (filterValue === "email") {
            searchRes = users.filter((user: any) => user.email === value)
        } else {
            if (filterValue === "name") {
                searchRes = users.filter((user: any) => user.name.first === value)
            }
            else if (filterValue === "id")
                searchRes = users.filter((user: any) => user.login.uuid === value)
            else
                searchRes = users.filter((user: any) => user.location.city === value)

        }
        setUsers(searchRes)
    }

    return (
        <Container>
            <ToolbarWrapper>
                <SearchBar resetSearch={fetchUsers} onSearch={handleSearch} />
                <Button sx={{ alignSelf: "flex-end" }} variant="contained" onClick={() => {
                    setOpenModal(true)
                    setModalType("add")
                }}>Add User</Button>
            </ToolbarWrapper>
            <EditModal onAddUser={addUser} type={modalType} users={users} currUserId={currUser} ifOpen={ifOpen} onClose={() => setOpenModal(false)} onUpdateUser={updateUser} />
            {users.length ?
                <Grid container spacing={{ xs: 1, md: 8 }} columns={{ xs: 1, sm: 2, md: 18 }}>
                    {users.map((user: any, index: number) => (
                        <Grid item xs={2} sm={4} md={6} key={index}>
                            <UserCard openModal={(status: boolean, currUser) => {
                                setOpenModal(status)
                                setModalType("edit")
                                setCurrUser(currUser)
                            }} onDelete={deleteUser} name={`${user.name.title}. ${user.name.first} ${user.name.last}`} email={user.email} img={user.picture?.large || ""} location={{ city: user.location.city, country: user.location.country, street: user.location.street }} id={user.login.uuid} />
                        </Grid>
                    ))}
                </Grid>
                :
                <div>No Users found!</div>
            }
        </Container>
    )
}