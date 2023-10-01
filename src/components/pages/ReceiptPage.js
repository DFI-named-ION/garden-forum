import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, Divider, Button, Dialog, DialogContent } from "@mui/material";
import {Favorite as FavoriteIcon, FavoriteBorder as UnFavoriteIcon } from "@mui/icons-material";

export const ReceiptPage = (props) => {
    const {user, setUser} = props;
    const [receipt, setReceipt] = useState({
        id: parseInt(useParams().id)
    });
    const [errors, setErrors] = useState({
        receiptsRequest: '',
        likeRequest: ''
    });
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const receiptsResponse = await axios.get("https://localhost:44347/api/Receipts");
                const receiptLikesResponse = await axios.get("https://localhost:44347/api/ReceiptLikes");
    
                const receipts = receiptsResponse.data;
                const receiptLikes = receiptLikesResponse.data;
    
                const updatedReceipt = receipts.find((res) => res.id === receipt.id);
    
                if (updatedReceipt) {
                    const likesForRecipe = receiptLikes.filter((like) => like.receiptId === updatedReceipt.id);
                    updatedReceipt.likes = likesForRecipe.length;
                    updatedReceipt.isLiked = likesForRecipe.some((like) => like.userId === user?.id);

                    const like = likesForRecipe.find((like) => like.userId === user?.id);
                    if (like) {
                        updatedReceipt.likeId = like.id;
                    } else {
                        updatedReceipt.likeId = null;
                    }
    
                    setReceipt(updatedReceipt);
                }
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    receiptsRequest: "",
                }));
            } catch (error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    receiptsRequest: "Під час завантаження рецепту сталася помилка!",
                }));
            }
        };
    
        fetchData();
    }, [receipt, user]);

    const getCurrentTime = () => {
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = (today.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = today.getUTCDate().toString().padStart(2, '0');
        const hours = today.getUTCHours().toString().padStart(2, '0');
        const minutes = today.getUTCMinutes().toString().padStart(2, '0');
        const seconds = today.getUTCSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    };

    const handleLikeClick = async (dir) => {
        try {
            if (dir === "add") {
                let like = {
                    userId: user.id,
                    receiptId: receipt.id,
                    publish: getCurrentTime()
                };
                await axios.post('https://localhost:44347/api/ReceiptLikes/', like);
            } else {
                await axios.delete('https://localhost:44347/api/ReceiptLikes/' + receipt.likeId);
            }
        } catch (error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                likeRequest: "Під час збереження лайку сталася помилка!",
            }));
        };

        setErrors((prevErrors) => ({
            ...prevErrors,
            likeRequest: '',
        }));
    };

    const calculateDaysAgo = (date) => {
        const currentDate = new Date();
        const publishDate = new Date(date);
        const timeDifference = currentDate - publishDate;
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysAgo;
    };

    const getRandomGif = () => {
        let data = [
            'https://media.giphy.com/media/3o6gE405qTZbYJHL0c/giphy.gif',
            'https://media.giphy.com/media/xT0GqszD0iDNq4YVpK/giphy.gif',
            'https://media.giphy.com/media/FXUJfwaLa5Q5F2H0zs/giphy.gif',
            'https://media.giphy.com/media/l41YokBAkjQZJ3Ds4/giphy.gif',
            'https://media.giphy.com/media/3oEjHEW5Ane7JX9Wr6/giphy.gif',
            'https://media.giphy.com/media/3o6gE5upyO0iQLxG1O/giphy.gif',
            'https://media.giphy.com/media/xT0GqFtTJBcNOdE9q0/giphy.gif',
            'https://media.giphy.com/media/3o6gE5cIANLpEBJokw/giphy.gif',
            'https://media.giphy.com/media/l41YpSn2y34Tz3vAk/giphy.gif',
            'https://media.giphy.com/media/3o7TKu0Pi947RZKo4E/giphy.gif',
            'https://media.giphy.com/media/l3vR4GeAVzSNPrcU8/giphy.gif',
            'https://media.giphy.com/media/l3vR7viIC98UJ79QI/giphy.gif',
            'https://media.giphy.com/media/3o6ZtpXCuo7totKZRm/giphy.gif',
            'https://media.giphy.com/media/3o6ZtflGh4meTzAJvq/giphy.gif',
            'https://media.giphy.com/media/l378rn2HLmGP5AnT2/giphy.gif',
            'https://media.giphy.com/media/9P1uT16ftIklT5ccsD/giphy.gif',
            'https://media.giphy.com/media/5Phplvwyk6rLXQUytd/giphy.gif',
            'https://media.giphy.com/media/BCeJKjpLTTYdkiQa8U/giphy.gif',
            'https://media.giphy.com/media/97F3NAIxcMSOH1ZlFH/giphy.gif',
            'https://media.giphy.com/media/gFt8NdWebiGRhcsTRS/giphy.gif',
            'https://media.giphy.com/media/OdvGHtngRi0Sy1eRba/giphy.gif',
            'https://media.giphy.com/media/zVRYxjLcmNK9a4vfUf/giphy.gif'
        ];

        const index = Math.floor(Math.random() * data.length);
        return data[index];
    };
    const [randomGif] = useState(getRandomGif());

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "50px"}}>
            <Paper elevation={3} style={{ width: '80%', padding: '16px' }}>
                <Typography variant="h5">{receipt.shortTitle}</Typography>
                <Typography variant="body1">{receipt.shortDescription}</Typography>
                <Divider style={{ margin: '16px 0' }} />
                <div dangerouslySetInnerHTML={{ __html: receipt.body }} />
                <Divider style={{ margin: '16px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2">
                        Опублікований {receipt.publish} ({calculateDaysAgo(receipt.publish)} днів тому)
                    </Typography>
                    {user ?
                        receipt?.isLiked ?
                            <Button
                                variant="contained"
                                color="warning"
                                endIcon={<UnFavoriteIcon />}
                                style={{ marginLeft: '8px' }}
                                onClick={() => handleLikeClick("rem")}
                            >
                                Прибрати вподобайку
                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="success"
                                endIcon={<FavoriteIcon />}
                                style={{ marginLeft: '8px' }}
                                onClick={() => handleLikeClick("add")}
                            >
                                Поставити вподобайку
                            </Button>
                        :
                        <Typography variant="body1">Авторизуйтеся, для того щоб поставити лайк!</Typography>
                    }
                </div>
            </Paper>
            {(errors?.receiptsRequest || errors?.likeRequest) && (
                <Dialog open={true} onClose={() => setOpenDialog(false)}>
                    <DialogContent>
                        <img src={randomGif} alt="Random GIF" />
                        <Typography variant="h6" mt={2}>Упс... Щось пішло не так!</Typography>
                        <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors?.receiptsRequest}</Typography>
                        <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors?.likeRequest}</Typography>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};