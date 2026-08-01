const axios = require("axios");
const e = require("express");


const fetchAnime = async (query) => {

    const response = await axios.post(
        "https://graphql.anilist.co",
        {
            query
        }
    );

    return response.data.data.Page.media.map(item => ({

        id: item.id,

        title:
            item.title.english ||
            item.title.romaji,

        image:
            item.coverImage.large,

        year:
            item.startDate.year,

        score:
            item.averageScore,

        genres:
            item.genres

    }));

};

const searchAnime = async (req, res) => {

    try {

        const {
            q,
            genre,
            format,
            year,
            season,
            status,
            sort
        } = req.query;


        let filters = `
            type: ANIME
        `;


        if(q){

            filters += `
                search: "${q}"
            `;

        }


        if(genre){

            filters += `
                genre: "${genre}"
            `;

        }


        if(format){

            filters += `
                format: ${format}
            `;

        }


        if(year){

            filters += `
                seasonYear: ${year}
            `;

        }


        if(season){

            filters += `
                season: ${season}
            `;

        }


        if(status){

            filters += `
                status: ${status}
            `;

        }


        const sorting =
            sort || "POPULARITY_DESC";


        const query = `

        query {

            Page(perPage: 20) {

                media(

                    ${filters}

                    sort: ${sorting}

                ) {

                    id


                    title {

                        romaji

                        english

                    }


                    coverImage {

                        large

                        extraLarge

                    }


                    startDate {

                        year

                    }


                    season

                    episodes

                    format

                    status

                    averageScore

                    genres

                }

            }

        }

        `;


        const response = await axios.post(
            "https://graphql.anilist.co",
            {
                query
            }
        );


        const anime =
        response.data.data.Page.media.map(item => ({

            id:item.id,

            title:
                item.title.english ||
                item.title.romaji,


            image:
                item.coverImage.large,


            year:
                item.startDate.year,


            season:
                item.season,


            episodes:
                item.episodes,


            format:
                item.format,


            status:
                item.status,


            score:
                item.averageScore,


            genres:
                item.genres

        }));


        res.json({

            success:true,

            results:anime

        });


    } catch(error){


        console.error(
            error.response?.data ||
            error.message
        );


        res.status(500).json({

            success:false,

            message:"Anime service unavailable"

        });

    }

};

const getTrendingAnime = async (req, res) => {

    try {

        const query = `
        query {

            Page(perPage: 10) {
            media(type: ANIME, sort: TRENDING_DESC) {

                    id

                    title {
                        romaji
                        english
                    }

                    coverImage {
                        large
                        extraLarge
                    }

                    bannerImage

                    startDate {
                        year
                    }

                    season

                    episodes

                    format

                    status

                    averageScore

                    genres

                }

            }

        }
        `;


        const response = await axios.post(
            "https://graphql.anilist.co",
            {
                query
            }
        );


        const anime = response.data.data.Page.media.map(item => ({
            id: item.id,

            title: item.title.english || item.title.romaji,

            image: item.coverImage.large,

            heroImage:
                item.bannerImage ||
                item.coverImage.extraLarge,

            year: item.startDate.year,

            season: item.season,

            episodes: item.episodes,

            format: item.format,

            status: item.status,

            score: item.averageScore,

            genres: item.genres
        
        }));


        res.json({

            success:true,

            results:anime

        });


    } catch(error){

        console.error(
            error.response?.data || error.message
        );


        res.status(500).json({

            success:false,

            message:"Unable to fetch trending anime"

        });

    }

};

const getFeaturedAnime = async (req, res) => {

    try {

        const query = `
        query {

            Page(perPage: 4) {
                media(type: ANIME, sort: TRENDING_DESC) {

                    id

                    title {
                        romaji
                        english
                    }

                    coverImage {
                        large
                        extraLarge
                    }

                    bannerImage

                    startDate {
                        year
                    }

                    season

                    episodes

                    format

                    status

                    averageScore
                    
                    genres

                    description

                }

            }

        }
        `;


        const response = await axios.post(
            "https://graphql.anilist.co",
            {
                query
            }
        );


        const animeList = response.data.data.Page.media;



        res.json({

            success: true,

            results: animeList.map(anime => ({

                id: anime.id,

                title:
                    anime.title.english ||
                    anime.title.romaji,

                image:
                    anime.coverImage.extraLarge,

                heroImage:
                    anime.bannerImage ||
                    anime.coverImage.extraLarge,

                description:
                    anime.description,

                year:
                    anime.startDate.year,

                season:
                    anime.season,

                episodes:
                    anime.episodes,

                format:
                    anime.format,

                status:
                    anime.status,

                score:
                    anime.averageScore,

                genres:
                    anime.genres

            }))

        });


    } catch(error){

        console.error(
            error.response?.data || error.message
        );


        res.status(500).json({

            success:false,

            message:"Unable to fetch featured anime"

        });

    }

};

// ========================================
// Get Anime Details
// ========================================

const getAnimeById = async (req, res) => {

    try {

        const { id } = req.params;

        const query = `
        query($id: Int){

            Media(id: $id, type: ANIME){

                id

                title{
                    romaji
                    english
                }

                description

                bannerImage
                trailer{
                    id
                    site
                }
                coverImage{
                    extraLarge
                }

                averageScore

                episodes

                duration

                format

                status

                season

                genres

                recommendations(sort: RATING_DESC, perPage: 6){

                    nodes{

                        mediaRecommendation{

                            id

                            title{
                                romaji
                                english
                            }

                            coverImage{
                                extraLarge
                            }

                            averageScore

                        }

                    }

                }

                startDate{
                    year
                }

                studios(isMain:true){

                    nodes{
                        name
                    }

                }

            }

        }
        `;

        const response = await axios.post(
            "https://graphql.anilist.co",
            {
                query,
                variables:{
                    id:Number(id)
                }
            }
        );

        const anime = response.data.data.Media;

        res.json({

            success:true,

            result:{

                id:anime.id,

                title:
                    anime.title.english ||
                    anime.title.romaji,

                description:anime.description
                ?.replace(/<[^>]*>/g, "")
                .replace(/\n/g, " ")
                .trim(),

                image:anime.coverImage.extraLarge,

                banner:anime.bannerImage,
                trailer:anime.trailer,

                score:anime.averageScore,

                episodes:anime.episodes,

                duration:anime.duration,

                format:anime.format,

                status:anime.status,

                season:anime.season,

                year:anime.startDate.year,

                genres:anime.genres,

                recommendations:anime.recommendations.nodes.map(item => ({

                    id:item.mediaRecommendation.id,

                    title:
                        item.mediaRecommendation.title.english ||
                        item.mediaRecommendation.title.romaji,

                    image:item.mediaRecommendation.coverImage.extraLarge,

                    score:item.mediaRecommendation.averageScore

                })),

                studio:
                    anime.studios.nodes[0]?.name ||
                    "Unknown"

            }

        });

    } catch(error){

        console.error(error.response?.data || error);

        res.status(500).json({

            success:false,

            message:"Unable to fetch anime."

        });

    }

};
// ========================================
// New Releases
// ========================================

const getNewReleases = async (req, res) => {

    try {

        const query = `
        query {

            Page(perPage: 12) {

                media(
                    type: ANIME
                    sort: START_DATE_DESC
                ) {

                    id

                    title {
                        romaji
                        english
                    }

                    coverImage {
                        large
                    }

                    startDate {
                        year
                    }

                    averageScore

                    genres

                }

            }

        }
        `;

        const response = await axios.post(
            "https://graphql.anilist.co",
            { query }
        );

        const anime =
        response.data.data.Page.media.map(item => ({

            id: item.id,

            title:
                item.title.english ||
                item.title.romaji,

            image:
                item.coverImage.large,

            year:
                item.startDate.year,

            score:
                item.averageScore,

            genres:
                item.genres

        }));


        res.json({

            success: true,

            results: anime

        });

    } catch(error){

        console.error(error.response?.data || error.message);

        res.status(500).json({

            success: false,
            error: 
                error.response?.data || error.message,            

        });

    }

};

const getTopRatedAnime = async (req,res)=>{

    try{

    const query = `
        query {

        Page(perPage:12){

        media(
        type:ANIME
        sort:SCORE_DESC
        ){

        id

        title{
        english
        romaji
        }

        coverImage{
        large
        }

        startDate{
        year
        }

        averageScore

        genres

        }

        }

        }
    `;

    const anime = await fetchAnime(query);


    res.json({

        success:true,

        results:anime

    });


    }catch(error){

        console.error(error.message);

        res.status(500).json({

        success:false

    });

    }

};

const getMovies = async(req,res)=>{

try{

const query = `
query{

Page(perPage:12){

media(
type:ANIME
format:MOVIE
sort:POPULARITY_DESC
){

id

title{
english
romaji
}

coverImage{
large
}

startDate{
year
}

averageScore

genres

}

}

}
`;

const anime = await fetchAnime(query);


res.json({

success:true,

results:anime

});


}catch(error){

    console.error(
        error.response?.data || error.message
    );

    res.status(500).json({

        success:false,

        message:
        error.response?.data || error.message

    });

}









};


const getHorrorAnime = async(req,res)=>{

try{

const query = `
query{

Page(perPage:12){

media(
type:ANIME
genre:"Horror"
sort:POPULARITY_DESC
){

id

title{
english
romaji
}

coverImage{
large
}

startDate{
year
}

averageScore

genres

}

}

}
`;

const anime = await fetchAnime(query);


res.json({

success:true,

results:anime

});


}catch(error){

    console.error(
        error.response?.data || error.message
    );

    res.status(500).json({

        success:false,

        message:
        error.response?.data || error.message

    });

}
};


const getUpcomingAnime = async(req,res)=>{

try{

const query = `
query{

Page(perPage:12){

media(
type:ANIME
status:NOT_YET_RELEASED
sort:POPULARITY_DESC
){

id

title{
english
romaji
}

coverImage{
large
}

startDate{
year
}

averageScore

genres

}

}

}
`;

const anime = await fetchAnime(query);


res.json({

success:true,

results:anime

});


}catch(error){

    console.error(
        error.response?.data || error.message
    );

    res.status(500).json({

        success:false,

        message:
        error.response?.data || error.message

    });

}

};





module.exports = {
    searchAnime,
    getTrendingAnime,
    getFeaturedAnime,
    getAnimeById,
    getNewReleases,
    getTopRatedAnime,
    getMovies,
    getHorrorAnime,
    getUpcomingAnime
};