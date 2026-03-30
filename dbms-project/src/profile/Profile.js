import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as authService from "../users/auth-service";
import HomeStoryCard from "../home/HomeStoryCard";
import DetailsPassageCard from "../details/DetailsPassageCard";
import PromptCard from "../prompts/PromptCard";

function Profile() {
    const { username } = useParams();
    const { currentUser } = useSelector((state) => state.auth);

    const [profile, setProfile] = useState({});
    const [stories, setStories] = useState([]);
    const [passages, setPassages] = useState([]);
    const [prompts, setPrompts] = useState([]);
    const [activeTab, setActiveTab] = useState('stories');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            let user;
            let content;
            if (username) {
                user = await authService.findUserByUsername(username);
                setProfile(user);
                content = await authService.getUserContent(username);
            } else if (currentUser) {
                setProfile(currentUser);
                content = await authService.getUserContent(currentUser.username);
            } else {
                navigate('/');
                return;
            }
            setStories(content.stories[0] || []);
            setPassages(content.passages || []);
            setPrompts(content.prompts || []);
        }
        fetchData();
    }, [username, currentUser]);

    const isOwnProfile = currentUser &&
        (username ? username === currentUser.username : true);

    const initial = profile.username ? profile.username[0].toUpperCase() : '?';

    const tabs = [
        { id: 'stories',  label: 'Stories',  count: stories.length  },
        { id: 'passages', label: 'Passages', count: passages.length },
        { id: 'prompts',  label: 'Prompts',  count: prompts.length  },
    ];

    return (
        <div className="sc-page">
            {/* Profile header */}
            <div className="sc-profile-header">
                <div className="sc-profile-avatar">{initial}</div>
                <div>
                    <h1 className="sc-profile-name">{profile.username}</h1>
                    {profile.email && (
                        <div className="sc-profile-detail">{profile.email}</div>
                    )}
                    {profile.phone_no && (
                        <div className="sc-profile-detail">{profile.phone_no}</div>
                    )}
                </div>
                {isOwnProfile && (
                    <div style={{ marginLeft: 'auto' }}>
                        <button
                            className="sc-btn sc-btn-ghost sc-btn-sm"
                            onClick={() => navigate('/profile/edit')}>
                            Edit profile
                        </button>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '4px',
                borderBottom: '1px solid var(--border)',
                marginBottom: '28px'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === tab.id
                                ? '2px solid var(--accent)'
                                : '2px solid transparent',
                            padding: '10px 18px',
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            transition: 'color 0.2s, border-color 0.2s',
                            marginBottom: '-1px',
                        }}>
                        {tab.label}
                        <span style={{
                            marginLeft: '6px',
                            fontWeight: 400,
                            opacity: 0.7
                        }}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tab content */}
            {activeTab === 'stories' && (
                stories.length > 0
                    ? stories.map(story => (
                        <div key={story.story_id} style={{ marginBottom: '16px' }}>
                            <HomeStoryCard story={story} />
                        </div>
                    ))
                    : <div className="sc-empty">No stories yet.</div>
            )}

            {activeTab === 'passages' && (
                passages.length > 0
                    ? passages.map(passage => (
                        <DetailsPassageCard key={passage.id} passage={passage} />
                    ))
                    : <div className="sc-empty">No passages yet.</div>
            )}

            {activeTab === 'prompts' && (
                prompts.length > 0
                    ? prompts.map(prompt => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))
                    : <div className="sc-empty">No prompts yet.</div>
            )}
        </div>
    );
}

export default Profile;
