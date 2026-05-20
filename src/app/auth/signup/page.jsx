import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <form className="fieldset bg-blue-100 border-base-300 rounded-box w-xs border p-4">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            className="input validator"
            placeholder="Name"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>
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
        <fieldset className="fieldset">
          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input validator"
            placeholder="Photo URL"
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
        <label className="fieldset">
          <span className="label">Confirm Password</span>
          <input
            type="password"
            className="input validator"
            placeholder="Confirm Password"
            required
          />
          <span className="validator-hint hidden">Required</span>
        </label>

        <button
          className="btn btn-neutral bg-black border-0 text-white mt-4"
          type="submit"
        >
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
