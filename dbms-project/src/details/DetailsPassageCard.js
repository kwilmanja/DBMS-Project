import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DetailsPassageCard = ({ passage }) => {
    const { currentUser } = useSelector((state) => state.auth);
    if (!passage) return null;

    return (
        <div className={`sc-passage${currentUser ? ' link-passage' : ''}`}>
            <div className="sc-passage-author">
                <Link to={'/profile/' + passage.username}>
                    {passage.username}
                </Link>
                {currentUser && (
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
                        · click to continue from here
                    </span>
                )}
            </div>

            {currentUser ? (
                <Link
                    to={'/make/' + passage.id}
                    style={{ textDecoration: 'none', display: 'block' }}>
                    <p className="sc-passage-text">{passage.text}</p>
                </Link>
            ) : (
                <p className="sc-passage-text">{passage.text}</p>
            )}
        </div>
    );
};

export default DetailsPassageCard;
