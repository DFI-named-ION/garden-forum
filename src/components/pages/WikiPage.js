import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { Typography, Grid, Container, TextField, IconButton, Card, CardContent, CardActions, Paper, Dialog, DialogContent } from "@mui/material";
import { Search as SearchIcon, Favorite as FavoriteIcon } from "@mui/icons-material";
import axios from 'axios';

export const WikiPage = (props) => {
    const {user, setUser} = props;

    const [openDialog, setOpenDialog] = useState(false);
    const [articles, setArticles] = useState([]);
    const [errors, setErrors] = useState({
        articlesRequest: '',
        likeRequest: ''
    });
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchText(value);
      
        const filtered = articles.filter((article) => {
            const searchTerm = value.toLowerCase();
            return (
              article.slug.toLowerCase().includes(searchTerm) ||
              article.shortTitle.toLowerCase().includes(searchTerm) ||
              article.title.toLowerCase().includes(searchTerm) ||
              article.shortDescription.toLowerCase().includes(searchTerm) ||
              article.description.toLowerCase().includes(searchTerm) ||
              article.body.toLowerCase().includes(searchTerm)
            );
        });
      
        setSearchResults(filtered);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [articlesResponse, articleLikesResponse] = await Promise.all([
                    axios.get("https://localhost:44347/api/Articles").then((response) => response.data),
                    axios.get("https://localhost:44347/api/ArticleLikes").then((response) => response.data)
                ]);
    
                const likesByArticleId = {};
                articleLikesResponse.forEach((like) => {
                    const articleId = like.articleId;
                    if (!likesByArticleId[articleId]) {
                        likesByArticleId[articleId] = [];
                    }
                    likesByArticleId[articleId].push(like);
                });
    
                const updated = articlesResponse.map((article) => {
                    const likes = likesByArticleId[article.id] || [];
                    return {
                        ...article,
                        likes: likes.length,
                        isLiked: user && likes.some((like) => like.userId === user.id),
                    };
                });
    
                setArticles(updated);
    
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    articlesRequest: '',
                }));
            } catch (error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    articlesRequest: "Під час завантаження статей сталася помилка!",
                }));
            }
        };
    
        fetchData();
    }, [user]);

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
        <Container>
            <TextField
                label="Пошук"
                variant="outlined"
                fullWidth
                color="warning"
                InputProps={{
                    endAdornment: (
                    <IconButton>
                        <SearchIcon color="warning" />
                    </IconButton>
                    ),
                }}
                sx={{ marginTop: "50px", marginBottom: "20px" }}
                onChange={handleSearch}
                value={searchText}
            />
            <Paper sx={{p: "30px 10px 20px 10px"}}>
                {searchText.length > 0 ?
                    <>
                        <Typography variant="h5" mb={3}>Результати пошуку</Typography>
                        {searchResults.length > 0 ?
                            <>
                                <Grid container spacing={2}>
                                {searchResults
                                    .map((res) => (
                                        <Grid key={res.id} item xs={12} sm={6}>
                                            <Link to={`wiki/article/${res.id}`} style={{ textDecoration: 'none' }}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography variant="h6">{res.shortTitle}</Typography>
                                                        <Typography variant="body2" color="textSecondary">{res.shortDescription}</Typography>
                                                    </CardContent>
                                                    <CardActions disableSpacing>
                                                        <IconButton style={{ pointerEvents: 'none' }}>
                                                            {res?.isLiked ? <FavoriteIcon color="warning" /> : <FavoriteIcon />}
                                                        </IconButton>
                                                        <div style={{ marginLeft: "auto" }}>
                                                            <Typography>{res?.likes} лайків</Typography>
                                                        </div>
                                                    </CardActions>
                                                </Card>
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                            :
                            <>
                                <Typography variant="body1" mb={3}>Схоже, що нічого подібного не знайдено...</Typography>
                            </>
                        }
                    </>
                :
                    <>
                        <Typography variant="h5" mb={3}>Добірка популярних статей</Typography>
                        <Grid container spacing={2}>
                            {articles
                                .sort((a, b) => b?.likes - a?.likes)
                                .slice(0, 6)
                                .map((res) => (
                                    <Grid key={res.id} item xs={12} sm={6}>
                                        <Link to={`/wiki/article/${res.id}`} style={{ textDecoration: 'none' }}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">{res.shortTitle}</Typography>
                                                    <Typography variant="body2" color="textSecondary">{res.shortDescription}</Typography>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <IconButton style={{ pointerEvents: 'none' }}>
                                                        {res?.isLiked ? <FavoriteIcon color="warning" /> : <FavoriteIcon />}
                                                    </IconButton>
                                                    <div style={{ marginLeft: "auto" }}>
                                                        <Typography>{res?.likes} лайків</Typography>
                                                    </div>
                                                </CardActions>
                                            </Card>
                                        </Link>
                                    </Grid>
                            ))}
                        </Grid>
                    </>
                }
            </Paper>
            {(errors?.articlesRequest || errors?.likeRequest) && (
                <Dialog open={true} onClose={() => setOpenDialog(false)}>
                    <DialogContent>
                        <img src={randomGif} alt="Random GIF" />
                        <Typography variant="h6" mt={2}>Упс... Щось пішло не так!</Typography>
                        <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors?.articlesRequest}</Typography>
                        <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors?.likeRequest}</Typography>
                    </DialogContent>
                </Dialog>
            )}
        </Container>
    );
}