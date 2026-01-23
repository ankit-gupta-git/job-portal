import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/"
          redirectUrl="/onboarding"
          appearance={{
            elements: {
              card: "bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl",
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
  );
};

export default SignUpPage;