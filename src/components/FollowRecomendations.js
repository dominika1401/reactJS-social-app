import { useEffect, useState } from "react";
import './FollowRecomendations.css';
import axios from "axios";
const FollowRecomendations = (props) => {

    const [recomendations, setRecomendatios] = useState([]);

    const getRecomendations = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((res) => {
                setRecomendatios(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        getRecomendations()
    }, [props.posts]);

    const follow = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/follow', {
            leader_id: id,
        })
            .then(() => {
                props.getLatesPosts();
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="followRecomendations">
            {recomendations.map((recomendation) => {
                return (
                    <div className="followRecomendation" key={recomendation.id}>
                        <img src={recomendation.avatar_url} alt={recomendation.username} />
                        <h3>{recomendation.username}</h3>
                        <button className="btn" onClick={() => follow(recomendation.id)}>Follow</button>
                    </div>)
            })}
        </div>
    )
};

export default FollowRecomendations;