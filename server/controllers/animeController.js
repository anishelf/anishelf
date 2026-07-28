const axios = require("axios");

const searchAnime = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const query = `
        query {
            Page(perPage: 10) {
                media(search: "${q}", type: ANIME) {
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
            {
                query
            }
        );

        const anime = response.data.data.Page.media.map(item => ({
            id: item.id,
            title: item.title.english || item.title.romaji,
            image: item.coverImage.large,
            year: item.startDate.year,
            score: item.averageScore,
            genres: item.genres
        }));

        res.json({
            success: true,
            results: anime
        });

    } catch (error) {
        console.error(
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false,
            message: "Anime service unavailable"
        });
    }
};

module.exports = {
    searchAnime
};