import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <form className="fieldset bg-blue-100 border-base-300 rounded-box w-xs border p-4">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input validator"
            placeholder="Email"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>

        <label className="fieldset">
          <span className="label">Password</span>
          <input
            type="password"
            className="input validator"
            placeholder="Password"
            required
          />
          <span className="validator-hint hidden">Required</span>
        </label>

        <button
          className="btn btn-neutral bg-blue-500 border-0 text-white mt-4"
          type="submit"
        >
          Sign In
        </button>
        <p>
          Don&apos;t Have an Account?{" "}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
