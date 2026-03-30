import React from "react";
import { Link } from "react-router-dom";

const PromptCard = ({ prompt }) => {
    if (!prompt) return null;

    const genres = prompt.genres
        ? prompt.genres.split(',').map(g => g.trim()).filter(Boolean)
        : [];

    return (
        <Link to={'/prompts/' + prompt.id} className="sc-prompt-card">
            <h3 className="sc-prompt-title">{prompt.name}</h3>

            {genres.length > 0 && (
                <div className="sc-tags" style={{ margin: '8px 0' }}>
                    {genres.map((g, i) => <span key={i} className="sc-tag">{g}</span>)}
                </div>
            )}

            {prompt.description && (
                <p className="sc-prompt-desc">{prompt.description}</p>
            )}

            <div className="sc-prompt-byline">
                by {prompt.username}
            </div>
        </Link>
    );
};

export default PromptCard;
