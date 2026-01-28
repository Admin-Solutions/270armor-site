import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

// SVG Icon Components
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="6 3 20 12 6 21 6 3"></polygon>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const HeartIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6"></path>
    <path d="M10 14 21 3"></path>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

const HlsVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.play();
    }
  }, [src]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        controls
        className="hls-video-player"
      />
    </div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoPlayerRef = useRef(null);

  const handleVideoSelect = (index) => {
    setActiveVideoIndex(index);
  };

  const videos = [
    { title: "Tigers in the Sand", date: "1991", description: "Documentary footage of Iron Tigers operations in the Saudi desert.", hlsUrl: "https://image.admin.solutions/raw-video-2-70-armor-desert-storm/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/1f93cdd4-b9bb-49b9-9321-ae1faeae031d" },
    { title: "Tigers in the Sand (with music)", date: "1991", description: "Documentary with musical score capturing the battalion's Desert Storm experience.", hlsUrl: "https://image.admin.solutions/tigers-in-the-sand-with-music/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/ee11ddb8-1051-4c99-96c7-8444ae163be0" },
    { title: "Iron Tigers Homecoming", date: "May 5, 1991", description: "The battalion returns to Erlangen, Germany after liberating Kuwait.", hlsUrl: "https://image.admin.solutions/iron-tigers-homecoming/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/ab59482a-2cda-4959-9dc6-1a02ddb3084a" },
    { title: "Army Recruiting Video", date: "1991", description: "Official Army recruiting footage featuring 2-70 Armor soldiers.", hlsUrl: "https://image.admin.solutions/army-recruiting-video/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/d896b3fa-4c81-420a-8403-c668b30395ab" },
    { title: "Raw Video: April-May 1991", date: "April-May 1991", description: "Unedited footage from the final weeks of deployment through homecoming ceremonies.", hlsUrl: "https://image.admin.solutions/raw-video/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/4561c78f-9f25-4f9b-b0cf-414c1fafa29a" },
    { title: "Saudi Arabia & Erlangen Homecoming", date: "1991", description: "Miscellaneous video from deployment in Saudi Arabia and the return to Germany.", hlsUrl: "https://image.admin.solutions/more-misc-video-of-saudi-and-in-erlangen-homecoming/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/0f43c61e-207f-4571-aa4c-1414ba1f53c9" },
    { title: "HHC Award Ceremony", date: "1991", description: "Soldiers arriving home and Headquarters Company award ceremony.", hlsUrl: "https://image.admin.solutions/homecoming-videos-of-people-arriving-hhc-award-ceremony/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/1d3b1f71-aef9-49bc-8ecb-69daf7b38e19" }
  ];

  const timeline = [
    { date: "August 1990", title: "Iraq Invades Kuwait", description: "Saddam Hussein orders Iraqi forces into Kuwait. The UN condemns the invasion and begins building a military coalition." },
    { date: "November 1990", title: "1st Armored Division Alerted", description: "The 'Old Ironsides' division receives deployment orders. 2-70 Armor begins preparations at Erlangen, Germany." },
    { date: "December 31, 1990", title: "Deployment to Saudi Arabia", description: "Most battalion personnel fly from Germany to Saudi Arabia. Equipment ships from Bremerhaven arrive at Dammam." },
    { date: "February 24, 1991", title: "G-Day: Ground War Begins", description: "2-70 Armor crosses into Iraq as part of VII Corps' main flanking attack against the Republican Guard." },
    { date: "February 25, 1991", title: "Battle of Al Busayyah", description: "The Iron Tigers attack a major Iraqi logistics center defended by infantry and tanks, quickly defeating the enemy." },
    { date: "February 27, 1991", title: "Battle of Medina Ridge", description: "The largest tank battle since World War II. 2nd Brigade destroys 61 T-72s and T-55s, 34 APCs in under an hour." },
    { date: "February 28, 1991", title: "Ceasefire Declared", description: "Combat operations end. The battalion maintains combat posture in northern Kuwait and southern Iraq." },
    { date: "May 1991", title: "Homecoming to Erlangen", description: "The main body redeploys to Erlangen, Germany. The Iron Tigers are awarded the Valorous Unit Award." }
  ];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <h1>2-70 ARMOR</h1>
            <span>Iron Tigers</span>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {[['battalion', 'Battalion'], ['timeline', 'Timeline'], ['videos', 'Videos'], ['book', 'Book'], ['forward-together', 'Forward Together'], ['connect', 'Connect']].map(([id, label]) => (
              <li key={id}>
                <button onClick={() => scrollToSection(id)}>{label}</button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-badge">A Living History Project</div>
          <h1>2-70 ARMOR</h1>
          <h2>"Iron Tigers" • Desert Storm 1991</h2>
          <p className="hero-tagline">
            Preserving the stories of the soldiers who fought in the largest tank battle since World War II
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">89</span>
              <span className="stat-label">Hours of Combat</span>
            </div>
            <div className="stat">
              <span className="stat-number">250</span>
              <span className="stat-label">Kilometers Traveled</span>
            </div>
            <div className="stat">
              <span className="stat-number">768</span>
              <span className="stat-label">Enemy Vehicles Destroyed</span>
            </div>
          </div>
          <div className="scroll-indicator" onClick={() => scrollToSection('battalion')}>
            <ChevronDownIcon />
          </div>
        </div>
      </section>

      {/* Battalion */}
      <section id="battalion" className="section section-tan">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">1st Armored Division • 2nd Brigade • VII Corps</span>
            <h2>The Iron Tigers</h2>
            <p>
              2nd Battalion, 70th Armor Regiment was part of the "heaviest brigade in the war"—three armor battalions 
              and a mechanized infantry battalion that led the 1st Armored Division's assault on the Iraqi Republican Guard.
            </p>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-image">M1A1</div>
              <div className="card-body">
                <h3>Main Battle Tanks</h3>
                <p>
                  The battalion deployed with M1A1 Abrams tanks, equipped with 120mm main guns and advanced thermal sights 
                  that proved decisive in engagements with Iraqi T-72s at ranges beyond enemy capability.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-image">2BDE</div>
              <div className="card-body">
                <h3>2nd Brigade "Iron Brigade"</h3>
                <p>
                  Alongside 4/70 Armor, 1/35 Armor, and 6/6 Infantry, the 2nd Brigade acted as the lead brigade during 
                  combat operations, engaging the Medina Division of the Republican Guard.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-image">VUA</div>
              <div className="card-body">
                <h3>Valorous Unit Award</h3>
                <p>
                  For extraordinary heroism in action against the Iraqi Republican Guard Forces Command, the battalion 
                  was awarded the Valorous Unit Award for actions from February 24-28, 1991.
                </p>
              </div>
            </div>
          </div>

          <div className="health-callout">
            <h3>Gulf War Veteran Health</h3>
            <p>
              Many Desert Storm veterans have experienced health issues related to toxic exposures during deployment—including 
              oil well fire smoke, chemical agents, depleted uranium, and other hazards. If you served in the Gulf War and are 
              experiencing unexplained symptoms, the VA offers presumptive conditions under the PACT Act.
            </p>
            <a href="https://www.va.gov/health-care/health-needs-conditions/health-issues-related-to-service-era/gulf-war/" target="_blank" rel="noopener noreferrer">
              Learn about VA benefits for Gulf War veterans →
            </a>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Operation Desert Shield / Desert Storm</span>
            <h2>The Road to Victory</h2>
            <p>
              From alert in Germany to the largest tank battle since World War II, 
              the Iron Tigers traveled thousands of miles to liberate Kuwait.
            </p>
          </div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">
                  <span>{item.date}</span>
                </div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section id="videos" className="section section-olive">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Primary Source Footage</span>
            <h2>Tigers in the Sand</h2>
            <p>
              Original video footage from Desert Storm and the homecoming to Erlangen—preserved
              for future generations to understand what these soldiers experienced.
            </p>
          </div>

          <div className="video-layout">
            <div className="video-main">
              <div className="featured-video" ref={videoPlayerRef}>
                {videos[activeVideoIndex].hlsUrl ? (
                  <HlsVideoPlayer src={videos[activeVideoIndex].hlsUrl} />
                ) : (
                  <div className="video-placeholder">
                    <p>Video coming soon</p>
                  </div>
                )}
              </div>
              <div className="video-info">
                <h3>{videos[activeVideoIndex].title}</h3>
                <p className="video-date">{videos[activeVideoIndex].date}</p>
                <p>{videos[activeVideoIndex].description}</p>
              </div>
            </div>

            <div className="video-playlist">
              <h4 className="playlist-header">Videos</h4>
              <div className="playlist-items">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className={`playlist-item ${index === activeVideoIndex ? 'active' : ''} ${!video.hlsUrl ? 'coming-soon' : ''}`}
                    onClick={() => video.hlsUrl && handleVideoSelect(index)}
                  >
                    <div className="playlist-item-icon">
                      {index === activeVideoIndex ? (
                        <span className="now-playing-icon">▶</span>
                      ) : (
                        <PlayIcon />
                      )}
                    </div>
                    <div className="playlist-item-info">
                      <span className="playlist-item-title">{video.title}</span>
                      <span className="playlist-item-date">{video.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book */}
      <section id="book" className="section section-dark">
        <div className="container">
          <div className="book-section">
            <div className="book-cover">
              <img
                src="https://image.admin.solutions/bandit-book-cover/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/f4a4439d-88b7-4c0c-bc14-ca2cf6cef058"
                alt="Bandit: The Inside Story of an Abrams Tank Company During Desert Storm - Book Cover"
              />
            </div>
            <div className="book-info">
              <h2>The Book</h2>
              <p className="author">By Mark T. Gerges • Coming April 2026</p>
              <p>
                <em>Bandit: The Inside Story of an Abrams Tank Company during Desert Storm</em> tells the tale of 
                Bravo Company, 2nd Battalion, 70th Armor Regiment—"Bandit"—and the sixty-three soldiers who 
                served in the unit during the Gulf War.
              </p>
              <p>
                Written by Captain Mark T. Gerges, who commanded Bandit during Desert Storm, the book draws on 
                journals, letters, military orders, and extensive interviews with veterans across the battalion 
                to present the full story of one unit inside the arrows drawn on the map.
              </p>
              <p>
                From the final months of the Cold War in Germany through deployment to Saudi Arabia and combat 
                in Iraq—including a firsthand account of the Battle of Medina Ridge—this is the ground-level 
                story of American tankers at war.
              </p>
              <a 
                href="https://www.amazon.com/Bandit-Inside-Company-Battles-Campaigns/dp/1985903903" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button"
              >
                <BookIcon /> Pre-Order on Amazon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Forward Together */}
      <section id="forward-together" className="section forward-together">
        <div className="container">
          <div className="ft-content">
            <div className="ft-story">
              <h2>From Desert Storm to <span className="highlight">Forward Together</span></h2>
              <p>
                Some battles don't end when the war does. Many Gulf War veterans returned home with invisible 
                wounds—toxic exposures that would manifest years later as cancers and chronic illness.
              </p>
              <p>
                <strong>Forward Together</strong> was born from one veteran's journey through cancer—a journey 
                connected to his service in Desert Storm. Built to help cancer survivors and their caregivers 
                navigate the hardest moments, the project carries forward the bonds formed in combat.
              </p>
              <blockquote>
                "Someone helped me back then. That's what I'm here to do for you."
              </blockquote>
              <p>
                The AI guides in Forward Together are named after the people who made a difference: 
                <strong> Bob</strong>, named after a company commander who led soldiers through combat, 
                and <strong> Miri</strong>, named after a wife who stood by her husband through his cancer journey.
              </p>
              <a 
                href="https://theforwardtogetherproject.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button"
              >
                <HeartIcon size={20} /> Visit Forward Together
              </a>
            </div>
            <div className="ft-guides">
              <div className="guide-card">
                <div className="guide-avatar">B</div>
                <h3>Bob</h3>
                <p className="guide-role">Guide for Survivors</p>
                <p className="guide-quote">"I'm a survivor too. I remember what it felt like in the beginning."</p>
              </div>
              <div className="guide-card">
                <div className="guide-avatar">M</div>
                <h3>Miri</h3>
                <p className="guide-role">Guide for Caregivers</p>
                <p className="guide-quote">"I see you too. The person showing up every day."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="section section-tan">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Veterans & Families</span>
            <h2>Connect With Us</h2>
            <p>
              This is a living history project. If you served with 2-70 Armor, knew someone who did, 
              or have photos, stories, or memories to share, we want to hear from you.
            </p>
          </div>

          <div className="connect-grid">
            <div className="connect-card">
              <div className="connect-icon">
                <UsersIcon />
              </div>
              <h3>Veterans</h3>
              <p>
                Share your stories, photos, and memories from Desert Storm. Help us build a complete 
                picture of what the Iron Tigers experienced.
              </p>
            </div>

            <div className="connect-card">
              <div className="connect-icon">
                <HeartIcon size={28} />
              </div>
              <h3>Families</h3>
              <p>
                If you're a family member of someone who served with 2-70 Armor, your perspective 
                matters too. The home front was part of the story.
              </p>
            </div>

            <div className="connect-card">
              <div className="connect-icon">
                <MailIcon />
              </div>
              <h3>Get In Touch</h3>
              <p>
                Have photos, documents, or stories to contribute? Want to connect with fellow veterans? 
                Reach out and help us preserve this history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3>Strike Swiftly</h3>
        <p>
          Honoring the soldiers of 2nd Battalion, 70th Armor Regiment who served in Operation Desert Storm. 
          Their courage and sacrifice will not be forgotten.
        </p>
        <div className="footer-links">
          <button onClick={() => scrollToSection('battalion')}>Battalion</button>
          <button onClick={() => scrollToSection('timeline')}>Timeline</button>
          <button onClick={() => scrollToSection('videos')}>Videos</button>
          <button onClick={() => scrollToSection('book')}>Book</button>
          <a href="https://www.ndswm.org" target="_blank" rel="noopener noreferrer">
            National Desert Storm Memorial <ExternalLinkIcon />
          </a>
        </div>
        <div className="footer-bottom">
          <p>A Living History Project • 2-70 Armor "Iron Tigers" • 1st Armored Division</p>
          <p>This site is dedicated to preserving the memory and stories of all who served.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
