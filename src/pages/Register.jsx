function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="border p-6 rounded w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>
        <input className="w-full border p-2" placeholder="Username" />
        <input className="w-full border p-2" placeholder="Email" />
        <input className="w-full border p-2" placeholder="Password" type="password" />
        <button className="w-full bg-black text-white py-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
