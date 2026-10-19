'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { surveyQuestions, galleryImages } from '@/lib/data';

/* ============================================
   STAR FIELD COMPONENT
   ============================================ */
function StarField({ className = '' }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generated = [];
    const count = 80;
    for (let i = 0; i < count; i++) {
      const size = Math.random() < 0.6 ? 'small' : Math.random() < 0.8 ? 'medium' : 'large';
      generated.push({
        id: i,
        size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${2 + Math.random() * 5}s`,
        delay: `${Math.random() * 5}s`,
      });
    }
    setStars(generated);
  }, []);

  return (
    <div className={`star-field ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star star--${star.size}`}
          style={{
            left: star.left,
            top: star.top,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================
   FLOATING HEARTS COMPONENT
   ============================================ */
function FloatingHearts() {
  return (
    <div className="floating-hearts">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="heart" />
      ))}
    </div>
  );
}

/* ============================================
   PROGRESS INDICATOR
   ============================================ */
function ProgressIndicator({ current, total }) {
  const percent = ((current) / total) * 100;
  return (
    <div className="progress">
      <div className="progress__bar-track">
        <div className="progress__bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="progress__text">
        Question {current} of {total}
      </div>
    </div>
  );
}

/* ============================================
   WELCOME SCREEN
   ============================================ */
function WelcomeScreen({ onNext }) {
  return (
    <div className="screen-container">
      <div className="content-card screen-transition welcome">
        <div className="welcome__ornament">✦ ♥ ✦</div>
        <h1 className="welcome__title">Our Memories</h1>
        <div className="welcome__subtitle">a space for what remains</div>
        <div className="divider" />
        <div className="welcome__message">
          <p>
            Some memories never really leave us. Some dates stay in our hearts,
            even when life takes us in different directions.
          </p>
          <p>
            I made this little space for a memory, a few questions, and the words
            we may never have found the courage to say.
          </p>
          <p>
            If you&apos;re willing, let&apos;s look back one last time.
          </p>
        </div>
        <button
          id="btn-open-memories"
          className="btn btn--primary"
          onClick={onNext}
        >
          Open Our Memories
        </button>
      </div>
    </div>
  );
}

/* ============================================
   FIRST QUESTION SCREEN
   ============================================ */
function FirstQuestionScreen({ answer, onChange, onNext, error }) {
  return (
    <div className="screen-container">
      <div className="content-card screen-transition">
        <div className="question-number">Before we begin</div>
        <h2 className="question-text">
          Do you remember what happened on October 20?
        </h2>
        <textarea
          id="input-october20"
          className="text-input"
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tell me what you remember..."
          rows={4}
        />
        {error && <div className="validation-message">{error}</div>}
        <div className="nav-bar nav-bar--center">
          <button
            id="btn-first-next"
            className="btn btn--primary"
            onClick={onNext}
          >
            Continue ♥
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   GALLERY SCREEN
   ============================================ */
function GalleryScreen({ onNext }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = galleryImages;

  return (
    <div className="screen-container">
      <div className="content-card screen-transition gallery">
        <h2 className="gallery__title">Our Moments</h2>
        <div className="gallery__subtitle">the snapshots of us</div>
        <div className="divider" />

        {images.length > 0 ? (
          <div className="gallery__grid">
            {images.map((img, index) => (
              <div
                key={index}
                className="gallery__item"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  className="gallery__image"
                  src={img.src}
                  alt={img.caption || `Memory ${index + 1}`}
                  loading="lazy"
                />
                {(img.caption || img.date) && (
                  <div className="gallery__caption">
                    {img.caption && (
                      <div className="gallery__caption-text">{img.caption}</div>
                    )}
                    {img.date && (
                      <div className="gallery__caption-date">{img.date}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery__grid">
            <div className="gallery__placeholder">
              <div className="gallery__placeholder-icon">📷</div>
              <div className="gallery__placeholder-text">
                Our photos will appear here.<br />
                <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                  Moments frozen in time, waiting to be shared.
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="nav-bar nav-bar--center">
          <button
            id="btn-gallery-continue"
            className="btn btn--primary"
            onClick={onNext}
          >
            Continue to the Questions
          </button>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && images[lightboxIndex] && (
          <div className="lightbox" onClick={() => setLightboxIndex(null)}>
            <button
              className="lightbox__close"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              aria-label="Close"
            >
              ✕
            </button>

            {lightboxIndex > 0 && (
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                aria-label="Previous"
              >
                ‹
              </button>
            )}

            <img
              className="lightbox__image"
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].caption || ''}
              onClick={(e) => e.stopPropagation()}
            />

            {lightboxIndex < images.length - 1 && (
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                aria-label="Next"
              >
                ›
              </button>
            )}

            {images[lightboxIndex].caption && (
              <div className="lightbox__caption">{images[lightboxIndex].caption}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================
   SURVEY QUESTION SCREEN
   ============================================ */
function SurveyQuestionScreen({ question, questionIndex, totalQuestions, answer, onChange, onNext, onBack, error }) {
  const showExplain = question.type === 'radio-with-explain' &&
    answer?.selected === "I'd rather explain in my own words";

  return (
    <div className="screen-container">
      <div className="content-card screen-transition">
        <ProgressIndicator current={questionIndex + 1} total={totalQuestions} />
        <div className="question-number">Question {questionIndex + 1}</div>
        <h2 className="question-text">{question.text}</h2>

        {question.type === 'radio-with-explain' && (
          <>
            <div className="radio-group">
              {question.options.map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    className="radio-option__input"
                    type="radio"
                    id={`${question.id}-opt-${i}`}
                    name={question.id}
                    value={option}
                    checked={answer?.selected === option}
                    onChange={() => onChange({ selected: option, explanation: answer?.explanation || '' })}
                  />
                  <label className="radio-option__label" htmlFor={`${question.id}-opt-${i}`}>
                    <span className="radio-option__circle" />
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {showExplain && (
              <div className="explain-field">
                <textarea
                  className="text-input"
                  value={answer?.explanation || ''}
                  onChange={(e) => onChange({ ...answer, explanation: e.target.value })}
                  placeholder="Share your thoughts..."
                  rows={3}
                />
              </div>
            )}
          </>
        )}

        {question.type === 'text' && (
          <textarea
            className="text-input"
            value={typeof answer === 'string' ? answer : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || 'Write your answer...'}
            rows={4}
          />
        )}

        {error && <div className="validation-message">{error}</div>}

        <div className="nav-bar">
          <button
            className="btn btn--ghost"
            onClick={onBack}
          >
            ← Back
          </button>
          <button
            id={`btn-survey-next-${questionIndex}`}
            className="btn btn--primary"
            onClick={onNext}
          >
            {questionIndex === totalQuestions - 1 ? 'Almost Done ♥' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   FREEDOM WALL SCREEN
   ============================================ */
function FreedomWallScreen({ value, onChange, onSubmit, onBack, isSubmitting, error }) {
  return (
    <div className="screen-container">
      <div className="content-card screen-transition freedom-wall">
        <h2 className="freedom-wall__title">The Words We Never Said</h2>
        <div className="freedom-wall__subtitle">a space for honesty</div>
        <div className="divider" />
        <div className="freedom-wall__message">
          Here is a space for anything you still want to say. It doesn&apos;t have
          to be perfect, and it doesn&apos;t have to be something I want to hear.
          Just let it be honest.
        </div>
        <textarea
          id="input-freedom-wall"
          className="text-input text-input--large"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="If there's anything left in your heart, you can leave it here..."
          rows={8}
        />

        {error && <div className="validation-message">{error}</div>}

        <div className="nav-bar">
          <button
            className="btn btn--ghost"
            onClick={onBack}
          >
            ← Back
          </button>
          <button
            id="btn-submit"
            className={`btn btn--primary ${isSubmitting ? 'btn--loading' : ''}`}
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending' : 'Leave Your Words'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   FINAL SCREEN
   ============================================ */
function FinalScreen() {
  return (
    <div className="final-screen">
      <StarField className="star-field--final" />
      <div className="final-screen__content">
        <div className="final-screen__ornament">✦ ✦ ✦</div>
        <div className="final-screen__message">
          <p>Thank you for taking the time to look back with me.</p>
          <p>
            Whatever your answers were, I&apos;m grateful that our paths crossed.
            You became a part of my story, and the memories we made will always
            be a part of it.
          </p>
          <p>
            Maybe life has different plans for us now. Maybe some stories are
            meant to change us rather than last forever.
          </p>
          <p>
            Wherever life takes you, I hope you find happiness, peace, and the
            love you deserve.
          </p>
          <p>
            And if there&apos;s one thing I want this little space to remind you of,
            it&apos;s that what we shared once mattered to me.
          </p>
        </div>
        <div className="final-screen__divider" />
        <div className="final-screen__closing">
          till the stars lights up the sky again
        </div>
      </div>
    </div>
  );
}

/* ============================================
   MAIN APP COMPONENT
   ============================================ */
const SCREENS = {
  WELCOME: 'welcome',
  FIRST_QUESTION: 'first_question',
  GALLERY: 'gallery',
  SURVEY: 'survey',
  FREEDOM_WALL: 'freedom_wall',
  FINAL: 'final',
};

export default function Home() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [october20, setOctober20] = useState('');
  const [freedomWall, setFreedomWall] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Honeypot field for spam protection
  const [honey, setHoney] = useState('');

  // Fingerprint for duplicate prevention
  const fingerprintRef = useRef('');
  useEffect(() => {
    fingerprintRef.current = `fp_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }, []);

  const transition = useCallback((nextAction) => {
    setIsTransitioning(true);
    setError('');
    setTimeout(() => {
      nextAction();
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, []);

  // ---- Screen Handlers ----
  const handleWelcomeNext = () => {
    transition(() => setScreen(SCREENS.FIRST_QUESTION));
  };

  const handleFirstQuestionNext = () => {
    if (!october20.trim()) {
      setError('Please share your memory before continuing.');
      return;
    }
    transition(() => setScreen(SCREENS.GALLERY));
  };

  const handleGalleryNext = () => {
    transition(() => {
      setCurrentQuestionIndex(0);
      setScreen(SCREENS.SURVEY);
    });
  };

  const handleSurveyNext = () => {
    const question = surveyQuestions[currentQuestionIndex];
    const answer = answers[question.id];

    // Validate
    if (question.required) {
      if (question.type === 'text') {
        if (!answer || (typeof answer === 'string' && !answer.trim())) {
          setError('Please share your thoughts before continuing.');
          return;
        }
      } else if (question.type === 'radio-with-explain') {
        if (!answer || !answer.selected) {
          setError('Please choose an answer to continue.');
          return;
        }
        if (answer.selected === "I'd rather explain in my own words" && (!answer.explanation || !answer.explanation.trim())) {
          setError('Please share your explanation.');
          return;
        }
      }
    }

    if (currentQuestionIndex < surveyQuestions.length - 1) {
      transition(() => setCurrentQuestionIndex(currentQuestionIndex + 1));
    } else {
      transition(() => setScreen(SCREENS.FREEDOM_WALL));
    }
  };

  const handleSurveyBack = () => {
    if (currentQuestionIndex > 0) {
      transition(() => setCurrentQuestionIndex(currentQuestionIndex - 1));
    } else {
      transition(() => setScreen(SCREENS.GALLERY));
    }
  };

  const handleFreedomWallBack = () => {
    transition(() => {
      setCurrentQuestionIndex(surveyQuestions.length - 1);
      setScreen(SCREENS.SURVEY);
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting || hasSubmitted) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Build submission data
      const submissionData = {
        answers: {
          october20,
          ...answers,
        },
        freedomWall,
        fingerprint: fingerprintRef.current,
        _honey: honey,
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit.');
      }

      setHasSubmitted(true);
      transition(() => setScreen(SCREENS.FINAL));
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError('');
  };

  // ---- Render ----
  const isFinalScreen = screen === SCREENS.FINAL;

  return (
    <div className="app-wrapper">
      {!isFinalScreen && <StarField />}
      {!isFinalScreen && <FloatingHearts />}

      {/* Honeypot field - hidden from users, visible to bots */}
      <div className="honey-field" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="honey-input">Leave this empty</label>
        <input
          id="honey-input"
          type="text"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        {screen === SCREENS.WELCOME && (
          <WelcomeScreen onNext={handleWelcomeNext} />
        )}

        {screen === SCREENS.FIRST_QUESTION && (
          <FirstQuestionScreen
            answer={october20}
            onChange={(val) => { setOctober20(val); setError(''); }}
            onNext={handleFirstQuestionNext}
            error={error}
          />
        )}

        {screen === SCREENS.GALLERY && (
          <GalleryScreen onNext={handleGalleryNext} />
        )}

        {screen === SCREENS.SURVEY && (
          <SurveyQuestionScreen
            question={surveyQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={surveyQuestions.length}
            answer={answers[surveyQuestions[currentQuestionIndex].id]}
            onChange={(val) => updateAnswer(surveyQuestions[currentQuestionIndex].id, val)}
            onNext={handleSurveyNext}
            onBack={handleSurveyBack}
            error={error}
          />
        )}

        {screen === SCREENS.FREEDOM_WALL && (
          <FreedomWallScreen
            value={freedomWall}
            onChange={(val) => { setFreedomWall(val); setError(''); }}
            onSubmit={handleSubmit}
            onBack={handleFreedomWallBack}
            isSubmitting={isSubmitting}
            error={error}
          />
        )}

        {screen === SCREENS.FINAL && (
          <FinalScreen />
        )}
      </div>
    </div>
  );
}
