import React, { useState, useEffect } from 'react';
import './MainClubPage.css';
import Stars from './Stars';
const MainClubPage = () => {

    const [club_data, setClub_data] = useState(null);

    const [email, setEmail] = useState(null);
    const [comment, setComment] = useState(null);
    const [stars, setStars] = useState(0);
    const handleStarChange = (event) => {
        setStars(event.target.value)
    }

    const apiBase = process.env.REACT_APP_WATCLUB_API;
    const handleSubmit = async () => {

        console.log(email, comment, stars)
        try {
            const response = await fetch(`${apiBase}/comments/post_comment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    stars: stars,
                    comment: comment,

                    org_id: 0,
                    user_id: 0,
                })
            })
            if (response.ok) {
                console.log('added')
            }
        }
        catch (err) {
            console.log('error', err)
        }        
    }


    useEffect(() => {

        const get_club_data = async () => {
            try {
                const response = await fetch(`${apiBase}/comments/get_comments/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    console.log(response.json())
                }
            }
            catch (error) {
                console.error('Error fetching club data:', error);
            }
        }
        get_club_data();

    }, []);

    return <>
        <h1>Main Page</h1>


        <div className="card">
            <span className="title">Leave a Comment</span>
            <div className="form">
                <div className="group">
                    {/* <Stars className='stars' sendStarToParent = {handleStarChange}/> */}
                    <input placeholder="" type="rating" id="rating" name="rating" onChange={(e) => {setStars(e.target.value)}} required />
                    <label htmlFor="rating" >Rating</label>
                </div>
                <div className="group">
                    <input placeholder="" type="email" id="email" name="email" onChange={(e) => {setEmail(e.target.value)}} required />
                    <label htmlFor="email" >Email</label>
                </div>
                <div className="group">
                    <textarea placeholder="" id="comment" name="comment" rows="5" onChange={(e) => {setComment(e.target.value)}} required />
                    <label htmlFor="comment" >Comment</label>
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>


    </>
}

export default MainClubPage;