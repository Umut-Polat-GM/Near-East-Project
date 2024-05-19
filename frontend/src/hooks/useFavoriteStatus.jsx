import { useState, useEffect } from 'react';
import { checkFavoritePost } from '../services/Requests';

const useFavoriteStatus = (postId) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const response = await checkFavoritePost(postId);
                const result = await response.json();
                if (response.ok) {
                    setIsFavorite(result.hasLiked);
                } else {
                    console.warn(result.msg);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavoriteStatus();
    }, [postId]);

    return [isFavorite, setIsFavorite];
};

export default useFavoriteStatus;
