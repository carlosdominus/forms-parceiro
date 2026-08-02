import { useEffect, useRef, useState, ElementType, MouseEvent } from "react";

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  highlights?: string[];
  highlightClassName?: string;
  staggerMs?: number;
  initialDelayMs?: number;
  threshold?: number;
  immediateVisible?: boolean;
}

function tokenizeText(text: string, highlights: string[]) {
  if (!highlights.length) {
    return text.split(" ").map((word) => ({ word, isHighlighted: false }));
  }

  const ranges: { start: number; end: number }[] = [];
  for (const phrase of highlights) {
    let pos = 0;
    while ((pos = text.indexOf(phrase, pos)) !== -1) {
      ranges.push({ start: pos, end: pos + phrase.length });
      pos += phrase.length;
    }
  }

  const words = text.split(" ");
  let currentPos = 0;

  return words.map((word) => {
    const wordStart = text.indexOf(word, currentPos);
    const wordEnd = wordStart + word.length;
    currentPos = wordEnd > -1 ? wordEnd : currentPos;

    const isHighlighted = ranges.some(
      (r) => wordStart >= r.start && wordEnd <= r.end
    );

    return { word, isHighlighted };
  });
}

function InteractiveGreenWord({
  word,
  isVisible,
  delay,
  prefersReducedMotion,
  immediateVisible = false,
  customClassName = "",
}: {
  key?: number | string;
  word: string;
  isVisible: boolean;
  delay: number;
  prefersReducedMotion: boolean;
  immediateVisible?: boolean;
  customClassName?: string;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (prefersReducedMotion || !spanRef.current) return;
    const rect = spanRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const dx = e.clientX - centerX;
    const distRatio = Math.max(-1, Math.min(1, dx / 250));
    const targetGradPos = 50 + distRatio * 50;
    spanRef.current.style.backgroundPosition = `${targetGradPos.toFixed(1)}% 50%`;
  };

  const isEager = immediateVisible || prefersReducedMotion;

  return (
    <span
      ref={spanRef}
      onMouseMove={handleMouseMove}
      className={`inline-block mr-[0.22em] font-semibold sm:font-bold select-none text-transparent bg-clip-text bg-[length:220%_auto] transition-all duration-300 ${customClassName}`}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #2bb102 0%, #41F20A 30%, #c4ff9e 50%, #41F20A 70%, #1a8300 100%)",
        backgroundPosition: "50% 50%",
        opacity: isEager || isVisible ? 1 : 0,
        filter: isEager || isVisible ? "none" : "blur(4px)",
        transition: isEager
          ? "none"
          : `opacity 0.6s ease-out ${delay}ms, filter 0.6s ease-out ${delay}ms, background-position 0.2s ease-out`,
      }}
    >
      {word}
    </span>
  );
}

export function AnimatedText({
  text,
  as: Component = "p",
  className = "",
  highlights = [],
  highlightClassName = "font-semibold sm:font-bold",
  staggerMs = 35,
  initialDelayMs = 0,
  threshold = 0.2,
  immediateVisible = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(immediateVisible);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setIsVisible(true);
      return;
    }

    if (immediateVisible) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, immediateVisible]);

  const tokens = tokenizeText(text, highlights);
  const isEager = immediateVisible || prefersReducedMotion;

  return (
    <Component ref={ref as any} className={`break-words max-w-full ${className}`}>
      {tokens.map(({ word, isHighlighted }, idx) => {
        const delay = initialDelayMs + idx * staggerMs;
        if (isHighlighted) {
          return (
            <InteractiveGreenWord
              key={idx}
              word={word}
              isVisible={isVisible}
              delay={delay}
              prefersReducedMotion={prefersReducedMotion}
              immediateVisible={immediateVisible}
              customClassName={highlightClassName}
            />
          );
        }

        return (
          <span
            key={idx}
            className="inline-block mr-[0.25em]"
            style={{
              opacity: isEager || isVisible ? 1 : 0,
              transform: isEager || isVisible ? "none" : "translateY(16px)",
              filter: isEager || isVisible ? "none" : "blur(4px)",
              transition: isEager
                ? "none"
                : `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms, filter 0.6s ease-out ${delay}ms`,
            }}
          >
            {word}
          </span>
        );
      })}
    </Component>
  );
}
