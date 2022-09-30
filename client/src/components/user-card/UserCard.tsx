import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fade, Paper, Popper } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import React, { useState } from 'react';

interface UserCardProps {
    name: string,
    email: string,
    img: string,
    location: {
        city: string,
        country: string,
        street: any
    },
    id: string,
    onDelete: (id: string) => void,
    openModal: (status: boolean, currUserId: string) => void
}

export const UserCard = ({ name, email, img, location, id, onDelete, openModal }: UserCardProps) => {
    return (
        <Card>
            <Typography gutterBottom variant="body1" component="p">
                {`ID: ${id}`}
            </Typography>
            <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                image={img}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" sx={{ color: "#030140" }} component="p">
                    {name}
                </Typography>
                <Typography gutterBottom variant="h6" component="p">
                    {email}
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                    {`Location: ${location.city} / ${location.country || ""} St. ${location.street.name || ""}-${location.street.number || ""}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='outlined' size="small" onClick={() => openModal(true, id)}>Edit</Button>
                <DeleteButton onDelete={() => onDelete(id)} />
            </CardActions>
        </Card>
    );
}



const DeleteButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {

    const [open, setOpen] = useState<boolean>(false)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    return (
        <div>
            <Button onClick={(e) => {
                handleClick(e)
                setOpen(true)
            }} variant="outlined" size='small' sx={{ marginLeft: 1 }} startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Popper open={open} transition anchorEl={anchorEl}>
                {({ TransitionProps }) => (
                    <Fade style={{ backgroundColor: "#F2F2F2" }} {...TransitionProps} timeout={350}>
                        <Paper>
                            <Typography sx={{ p: 2 }}>
                                Are you sure you want to delete?
                            </Typography>
                            <Button onClick={() => {
                                onDelete()
                                setOpen(false)
                                setAnchorEl(null)
                            }} >Confirm</Button>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    );

}