import React from "react";

const MakeStoryCard = ({ passage }) => {
    if (!passage) return null;

    const isPrompt = !!passage.name;

    return (
        <div className="sc-passage" style={{
            borderLeftColor: isPrompt ? 'var(--accent)' : 'var(--border-focus)',
            marginBottom: '0'
        }}>
            <div className="sc-passage-author">
                {isPrompt ? (
                    <>
                        <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Prompt
                        </span>
                        <span>{passage.name}</span>
                    </>
                ) : (
                    <>
                        <span>Passage by</span>
                        <span style={{ color: 'var(--text-dim)' }}>{passage.username}</span>
                    </>
                )}
            </div>
            <p className="sc-passage-text">{passage.text}</p>
        </div>
    );
};

export default MakeStoryCard;
