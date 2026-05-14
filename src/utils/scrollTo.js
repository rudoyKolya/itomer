const HEADER_OFFSET = 88;

export function scrollToSection(id, extraOffset = 0) {
    const target = document.getElementById(id);
    if (!target) return;

    const pinSpacer = target.closest(".pin-spacer");
    const measureEl = pinSpacer || target;
    const top = measureEl.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: top - HEADER_OFFSET + extraOffset,
        behavior: "smooth",
    });
}

// Scrolls to the "featured" section so the first card is at the left edge.
// Uses the same geometry as FeaturedCarsSection's ScrollTrigger:
//   track starts at x = startOffset (W * 0.35), ends at x = -(trackW - endOffset)
//   total horizontal travel = startOffset + trackW - endOffset
//   to reach x = 0 we need to cover startOffset of that travel
//   progress = startOffset / totalHorizontalTravel
//   verticalTarget = pinStart + progress * totalScrollDist
export function scrollToFeaturedStart() {
    const section = document.getElementById("featured");
    if (!section) return;

    // On mobile there is no pin — just scroll normally to the section
    if (window.innerWidth < 1024) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top - HEADER_OFFSET, behavior: "smooth" });
        return;
    }

    const pinSpacer = section.closest(".pin-spacer");
    const measureEl = pinSpacer || section;
    const pinStart = measureEl.getBoundingClientRect().top + window.scrollY;

    const track = section.querySelector("[data-track]");
    if (!track) {
        // fallback — just go to section top
        window.scrollTo({ top: pinStart - HEADER_OFFSET, behavior: "smooth" });
        return;
    }

    const W = window.innerWidth;
    const trackW = track.scrollWidth;
    const startOffset = W * 0.35;
    const endOffset = W * 0.45;
    const totalScrollDist = (trackW + startOffset + endOffset) * 0.58;
    const totalHorizontalTravel = startOffset + trackW - endOffset;
    const progress = startOffset / totalHorizontalTravel;

    window.scrollTo({
        top: pinStart + progress * totalScrollDist,
        behavior: "smooth",
    });
}

export function handleAnchorClick(event, id, extraOffset = 0) {
    event.preventDefault();
    scrollToSection(id, extraOffset);
}
