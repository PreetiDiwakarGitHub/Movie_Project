import React, { useEffect, useState } from "react";
import image from "../image/image.avif";
import movie from "../image/movie.avif"
import movie1 from "../image/movie1.avif";
import movies from "../image/movies.avif";
import './Photo.css';

function Photo() {
    const images = [image, movie, movies, movie1]; 
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    
    useEffect(() => {
        const intervalId = setInterval(nextImage, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className="all_image">
                <img src={images[currentIndex]} alt="Slider" />
            </div>
        </div>
    );
}

export default Photo;
