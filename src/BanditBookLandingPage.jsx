export default function BanditBookLandingPage() {
  return (
    <div className="book-page">

      {/* HERO */}
      <section className="book-hero">
        <div className="book-hero-text">
          <h1>Inside an Abrams Tank During Desert Storm</h1>
          <p>
            A gripping firsthand account of modern armored warfare. Follow the
            soldiers of Bravo Company as they deploy from Germany to the deserts
            of Iraq in one of the most decisive tank battles in modern history.
          </p>
          <div className="book-hero-cta">
            <a href="https://amzn.to/4uB0T4K" target="_blank" rel="noopener noreferrer" className="cta-button">
              Buy on Amazon
            </a>
          </div>
        </div>
        <div className="book-hero-cover">
          <img
            src="https://image.admin.solutions/bandit-book-cover/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/f4a4439d-88b7-4c0c-bc14-ca2cf6cef058"
            alt="Bandit Book Cover"
            className="book-cover-img"
          />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="book-reviews">
        <div className="container">
          <h2>What Military Historians Are Saying</h2>
          <div className="book-review-grid">
            <div className="book-review-card">
              <p>"Best book I've read on an armored force company in combat."</p>
              <span>Don Holder, LTG US Army (Ret.)</span>
            </div>
            <div className="book-review-card">
              <p>"One of the best accounts of life in an American tank unit at the end of the Cold War."</p>
              <span>Stephen A. Bourque</span>
            </div>
            <div className="book-review-card">
              <p>"A compelling ground-level account of the attack into Kuwait during Desert Storm."</p>
              <span>James H. Willbanks</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="book-features">
        <div className="book-features-grid">
          <div className="book-feature-card">
            <h3>Real Combat Story</h3>
            <p>Experience armored warfare from inside the turret of an Abrams tank during Operation Desert Storm.</p>
          </div>
          <div className="book-feature-card">
            <h3>Leadership Under Fire</h3>
            <p>Discover the decisions and leadership challenges faced by a tank company commander in combat.</p>
          </div>
          <div className="book-feature-card">
            <h3>Human Side of War</h3>
            <p>Letters, journals, and interviews reveal the emotional cost of war for soldiers and their families.</p>
          </div>
        </div>
      </section>

      {/* BOOK PREVIEW */}
      <section className="book-preview">
        <h2>Read a Sample Chapter</h2>
        <p>
          Get a preview of the powerful storytelling and firsthand combat
          experiences inside an Abrams tank during Desert Storm.
        </p>
        <a href="https://amzn.to/4uB0T4K" target="_blank" rel="noopener noreferrer" className="cta-button">
          Read on Amazon
        </a>
      </section>

      {/* ABOUT AUTHOR */}
      <section className="book-author">
        <div className="book-author-inner">
          <img
            src="https://image.admin.solutions/mark-t-gerges/141f6617-6095-43ee-bd53-44124cd7909e/541d63b2-6871-46b5-961b-8b61cf635dd8/1a83040e-41c0-454a-9272-ed0440ec03ca"
            alt="Author"
            className="book-author-img"
          />
          <div>
            <h2>About the Author</h2>
            <p>
              Mark T. Gerges is a former U.S. Army officer and commander of Bravo
              Company, 2nd Battalion, 70th Armor. Drawing from firsthand
              experience, journals, and interviews, he presents a powerful
              narrative of armored warfare during the Gulf War.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="book-final-cta">
        <h2>Get Your Copy Today</h2>
        <p>Available now in hardcover. Discover the untold story of a tank company in combat.</p>
        <a href="https://amzn.to/4uB0T4K" target="_blank" rel="noopener noreferrer" className="cta-button">
          Buy the Book on Amazon
        </a>
      </section>

      {/* FOOTER */}
      <footer className="book-footer">
        © 2026 Bandit Book. All rights reserved.
      </footer>

    </div>
  );
}
