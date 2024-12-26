const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
            {/* Contact Information Section */}
            <div className="flex flex-col w-full md:w-1/3">
  <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
  <p className="text-gray-400 mb-2">Prishtina</p>
  <p className="text-gray-400 mb-2">Email: curridion21@gmail.com</p>
  <p className="text-gray-400">Phone: 049 978 264</p>
</div>
  
            {/* Quick Links Section */}
            <div className="flex flex-col w-full md:w-1/3">
              <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="/favorite" className="text-gray-400 hover:text-white">favorite recepies </a></li>
           
              </ul>
            </div>
  
            {/* Social Media Section */}
            <div className="flex flex-col w-full md:w-1/3">
              <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"> facebook</i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter">twitter</i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram">instagram</i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-youtube">youtube</i>
                </a>
              </div>
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="text-center mt-10">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} FoodApp. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  