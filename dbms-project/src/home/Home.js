import { useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import HomeStoryCard from "./HomeStoryCard";
import { getAllStoriesThunk } from "../stories/stories-thunks";

export default function Home() {
    const [stories, setStories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animDir, setAnimDir] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const action = await dispatch(getAllStoriesThunk());
            if (action.payload) {
                setStories(action.payload.slice());
            }
        }
        fetchData();
    }, []);

    const go = useCallback((dir) => {
        if (stories.length < 2) return;
        setAnimDir(dir);
        setTimeout(() => {
            setCurrentIndex(i =>
                dir === 'next'
                    ? (i + 1) % stories.length
                    : (i - 1 + stories.length) % stories.length
            );
            setAnimDir(null);
        }, 280);
    }, [stories.length]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowRight') go('next');
            if (e.key === 'ArrowLeft')  go('prev');
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [go]);

    if (stories.length === 0) {
        return (
            <div className="sc-page">
                <h1 className="sc-page-title">Stories</h1>
                <p className="sc-page-subtitle">Community-crafted collaborative fiction</p>
                <div className="sc-loading">Loading stories…</div>
            </div>
        );
    }

    const prev2 = (currentIndex - 2 + stories.length) % stories.length;
    const prev1 = (currentIndex - 1 + stories.length) % stories.length;
    const showDots = stories.length <= 12;

    return (
        <div className="sc-page">
            <h1 className="sc-page-title">Stories</h1>
            <p className="sc-page-subtitle">Community-crafted collaborative fiction</p>

            <div className="deck-wrapper">
                <div className="deck-stack" style={{ perspective: '1200px' }}>
                    {/* Ghost cards showing stack depth */}
                    {stories.length > 2 && (
                        <div className="deck-ghost deck-ghost-2" />
                    )}
                    {stories.length > 1 && (
                        <div className="deck-ghost deck-ghost-1" />
                    )}

                    {/* Active card */}
                    <div
                        key={currentIndex}
                        className={`deck-card-active${animDir ? ` anim-${animDir}` : ''}`}
                    >
                        <HomeStoryCard story={stories[currentIndex]} featured />
                    </div>
                </div>

                {/* Navigation controls */}
                <div className="deck-nav">
                    <button
                        className="deck-arrow"
                        onClick={() => go('prev')}
                        disabled={stories.length < 2}
                        aria-label="Previous story"
                    >‹</button>

                    <span className="deck-counter">
                        {currentIndex + 1} / {stories.length}
                    </span>

                    <button
                        className="deck-arrow"
                        onClick={() => go('next')}
                        disabled={stories.length < 2}
                        aria-label="Next story"
                    >›</button>
                </div>

                {/* Dot indicators for small collections */}
                {showDots && (
                    <div className="deck-dots" style={{ marginTop: '14px' }}>
                        {stories.map((_, i) => (
                            <button
                                key={i}
                                className={`deck-dot${i === currentIndex ? ' active' : ''}`}
                                onClick={() => {
                                    if (i === currentIndex) return;
                                    go(i > currentIndex ? 'next' : 'prev');
                                    setTimeout(() => setCurrentIndex(i), 280);
                                }}
                                aria-label={`Story ${i + 1}`}
                            />
                        ))}
                    </div>
                )}

                <p style={{
                    textAlign: 'center',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-ui)',
                    letterSpacing: '0.06em',
                    marginTop: '14px',
                    textTransform: 'uppercase'
                }}>
                    ← → arrow keys to navigate
                </p>
            </div>
        </div>
    );
}
