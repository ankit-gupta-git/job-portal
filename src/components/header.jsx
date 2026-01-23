import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in") === "true") {
      setShowSignIn(true);
      setSearch({});
    }
  }, [search, setSearch]);

  useEffect(() => {
    document.body.style.overflow = showSignIn ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [showSignIn]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled
            ? "bg-gray-900/90 backdrop-blur-md border-b border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">

          {/* LEFT: Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link to="/">
              <img src="/logo.png" alt="logo" className="h-10 w-16" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-6 text-sm text-gray-300">
              <button
                onClick={() => {
                  if (user) {
                    window.location.href = '/jobs';
                  } else {
                    setShowSignIn(true);
                  }
                }}
                className="hover:text-white transition cursor-pointer"
              >
                Browse Jobs
              </button>
              <Link to="/companies" className="hover:text-white transition">
                Companies
              </Link>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <Button
                variant="outline"
                onClick={() => setShowSignIn(true)}
                className="hidden sm:flex"
              >
                Sign In
              </Button>
              <Link to="/sign-up">
                <Button className="bg-blue-600 hover:bg-blue-500">
                  Get Started
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              {user?.unsafeMetadata?.role === "recruiter" && (
                <Link to="/post-job">
                  <Button variant="outline" className="flex gap-2">
                    <PenBox size={16} />
                    Post Job
                  </Button>
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 text-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-3 space-y-2">
            <button
              onClick={() => {
                if (user) {
                  window.location.href = '/jobs';
                  setIsMenuOpen(false);
                } else {
                  setShowSignIn(true);
                  setIsMenuOpen(false);
                }
              }}
              className="text-left w-full hover:text-white transition"
            >
              Browse Jobs
            </button>
            <Link to="/companies" onClick={() => setIsMenuOpen(false)}>
              Companies
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <SignedOut>
              <button
                className="text-left w-full"
                onClick={() => setShowSignIn(true)}
              >
                Sign In
              </button>
            </SignedOut>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-20" />

      {/* SIGN IN MODAL */}
      {showSignIn && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={(e) =>
            e.target === e.currentTarget && setShowSignIn(false)
          }
        >
          <div className="relative w-full max-w-md">
            {/* Close */}
            <button
              className="absolute -top-10 right-0 text-gray-400 hover:text-white"
              onClick={() => {
                setShowSignIn(false);
                setSearch({});
              }}
            >
              ✕
            </button>

            {/* Clerk SignIn (single card, no extra wrapper) */}
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
              appearance={{
                elements: {
                  card:
                    "bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl",
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-400",
                  formFieldLabel: "text-gray-300",
                  formFieldInput:
                    "bg-gray-800 border-gray-700 text-white focus:ring-blue-500",
                  socialButtonsBlockButton:
                    "border-gray-700 hover:bg-gray-800",
                  dividerText: "text-gray-400",
                  footerActionLink: "text-blue-400 hover:text-blue-300",
                  formButtonPrimary:
                    "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400",
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
