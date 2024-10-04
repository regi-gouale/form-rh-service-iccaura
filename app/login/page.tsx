import { signIn } from "@/auth";

const LoginPage = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Login with Google</button>
    </form>
  );
};

export default LoginPage;
