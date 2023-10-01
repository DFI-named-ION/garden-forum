import React from 'react';
import { Container, Typography, Grid, Paper, CardMedia, Divider } from '@mui/material';

export const AboutPage = () => {
    return (
        <Container>
            <Paper sx={{ p: 2, textAlign: 'center', mb: 2, mt: 5 }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    Про нас
                </Typography>
                <CardMedia
                    component="img"
                    height="600"
                    image="/img/carousel-1.jpg"
                    alt="Фото"
                    sx={{ mx: 'auto', mb: 2 }}
                />
                <Typography variant="body1">
                    Суть нашого сайту - спільнота, яка об'єднує огородників та гурманів.
                    Діліться досвідом, запитуйте поради та насолоджуйтеся врожаем, що росте на ваших ділянках.
                    Приєднуйтесь до нас, і ми разом створимо справжній рай для огороджиків та шанувальників смачної їжі!
                </Typography>
            </Paper>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <CardMedia
                            component="img"
                            height="550"
                            image="/img/service-5.jpg"
                            alt="Фото"
                            sx={{ mx: 'auto', mb: 2 }}
                        />
                        <Typography variant="body1">
                            Адміністратор форуму приймає участь у волонтерському заході!
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{textAlign: "justify"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;Наш сайт - оазис для всіх огородників та любителів смачної їжі! Ми раді представити вам форум, створений саме для вас. 
                            Тут ви знайдете вичерпну інформацію про різноманітні овочі, фрукти, злаки та багато інше. 
                            Ми ділимось та збираємо досвід від талановитих огородників з усього світу, допомагаючи вам виростити найкращі культури.
                            <br/>
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Але це не все! На нашому сайті ви також знайдете неймовірні рецепти смачних страв на будь-який смак. 
                            Ми регулярно публікуємо ідеї для страв із свіжих овочів та фруктів, допомагаючи вам готувати смачно та здорово.
                        </Typography>
                        <Typography variant="body1" sx={{textAlign: "right"}}>
                            Сгенеровано нейромережею
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 2, textAlign: 'center', mt: 1 }}>
                        <Typography variant="body1" sx={{textAlign: "justify"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;Волонтерство - це ключ до покращення нашого світу. 
                            Ми віримо, що кожен з нас має змогу внести важливий внесок у збереження природи і благополуччя нашого оточення. 
                            Займаючись волонтерством, ми даруємо свій час та енергію для того, щоб підтримувати чистоту та красу нашого середовища.
                            <br/>
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Природа - наше найбільше скарбниця. 
                            Вона надає нам повітря для дихання, воду для пиття та ресурси для життя. 
                            Тому важливо берегти її, не смітити і дбати про її збереження. 
                            Кожен смітник, покиданий у природі, може завдати шкоди її екосистемі та загострити проблеми забруднення.
                        </Typography>
                        <Typography variant="body1" sx={{textAlign: "right"}}>
                            Сгенеровано нейромережею
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Paper sx={{p: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/team-1.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/service-2.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/service-3.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/service-4.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/team-4.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/service-6.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
