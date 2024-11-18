import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <header>
        {/* If user is Signed Out, show SignIn  */}
        <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>

        {/* If user is Signed In, show SignOut  */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  );
}

export default App;
