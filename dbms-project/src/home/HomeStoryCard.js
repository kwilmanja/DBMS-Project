import React from "react";
import { Link } from "react-router-dom";

const HomeStoryCard = ({ story, featured }) => {
    if (!story) return null;

    const themes = story.themes
        ? story.themes.split(',').map(t => t.trim()).filter(Boolean)
        : [];

    return (
        <div className="sc-card" style={{ minHeight: featured ? '280px' : 'auto' }}>
            <h2 className="sc-card-title">
                <Link to={'/details/' + story.story_id}>{story.title}</Link>
            </h2>

            <div className="sc-card-meta">
                <span className="sc-card-meta-item">
                    <strong>by</strong> {story.username}
                </span>
                {story.prompt_name && (
                    <span className="sc-card-meta-item">
                        <strong>prompt</strong> {story.prompt_name}
                    </span>
                )}
                {story.num_likes > 0 && (
                    <span className="sc-card-meta-item">
                        ♥ {story.num_likes}
                    </span>
                )}
            </div>

            {themes.length > 0 && (
                <div className="sc-tags">
                    {themes.map((theme, i) => (
                        <span key={i} className="sc-tag">{theme}</span>
                    ))}
                </div>
            )}

            {story.description && (
                <p className="sc-card-body">{story.description}</p>
            )}

            <div style={{ marginTop: '16px' }}>
                <Link to={'/details/' + story.story_id} className="sc-btn sc-btn-ghost sc-btn-sm">
                    Read story →
                </Link>
            </div>
        </div>
    );
};

export default HomeStoryCard;
