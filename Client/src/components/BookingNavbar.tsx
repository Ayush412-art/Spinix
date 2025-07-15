import bg_trip from "../assets/bg-trip.jpeg"
const BookingNavbar = () => {
  return (
    <nav className="bg-black text-white shadow-md px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-semibold ">
        Spinix
      </div>

      <div className="flex items-center space-x-4">
        <p className="text-gray-200 font-medium hidden sm:block">Hi, User</p>
        <img
          src={bg_trip}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border"
        />
      </div>
    </nav>
  );
};

export default BookingNavbar