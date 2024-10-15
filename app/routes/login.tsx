import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const expectedUsername = process.env.EXPECTED_USERNAME; // Set in your .env file
    const expectedPassword = process.env.EXPECTED_PASSWORD; // Set in your .env file

    if (username === expectedUsername && password === expectedPassword) {
        // Set cookie for session
        const cookie = `logged_in=true; Max-Age=86400; HttpOnly`; // Cookie lasts 1 day
        return redirect("/dashboard", {
            headers: {
                "Set-Cookie": cookie,
            },
        });
    }

    return json({ error: "Invalid credentials" }, { status: 401 });
};

function Login() {
    const actionData = useActionData() as { error?: string };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form method="post" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {actionData?.error && (
                    <p className="text-red-500">{actionData.error}</p>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        name="username"
                        type="text"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
