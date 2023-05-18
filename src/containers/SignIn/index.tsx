import { FC, FormEvent, memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { login } from "@/src/utils/auth";

const SignInContainer: FC = memo(() => {
  const { replace } = useRouter();

  useEffect(() => {
    // Handle if user already logged in
    const role = sessionStorage.getItem("role");
    if (role === "bpjs") {
      replace("/bpjs");
    } else if (role === "hospital") {
      replace("/hospitals");
    }
  }, [replace]);

  const [loading, setLoading] = useState(false);
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const email = (e.target as any)?.email?.value;
      const password = (e.target as any)?.password?.value;

      setLoading(true);
      login(email, password)
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error(response.status.toString());
        })
        .then((response) => {
          sessionStorage.setItem("api-key", response["x_api_key"]);
          sessionStorage.setItem("role", response.role);

          // Redirect to respective pages
          if (response.role === "bpjs_admin") {
            replace("/bpjs");
          } else if (response.role === "hospital_admin") {
            replace("/hospitals");
          }
        })
        .catch((e) => {
          process.env.NODE_ENV === "development" && console.log(e);
          if (e === "401") alert("Your email or password is incorrect");
          else alert("Something went wrong, please try again later");
        })
        .finally(() => setLoading(false));
    },
    [replace]
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-700">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-primary-800"
                disabled={loading}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

SignInContainer.displayName = "SignInContainer";
export { SignInContainer };
