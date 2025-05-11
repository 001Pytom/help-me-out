// components/Footer.js
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const menuSections = [
    {
      title: "Menu",
      items: [
        { label: "Home", href: "/" },
        { label: "Converter", href: "/" },
        { label: "How it Works", href: "#how-it-works" },
      ]
    },
    {
      title: "About us",
      items: [
        { label: "About", href: "/" },
        { label: "Contact Us", href: "/" },
        { label: "Privacy Policy", href: "/" },
      ]
    },
    {
      title: "Screen Record",
      items: [
        { label: "Browser Window", href: "/" },
        { label: "Desktop", href: "/" },
        { label: "Application", href: "/" },
      ]
    }
  ];

  return (
    <footer className="w-full bg-[#120B48] text-white py-12">
      <div className="max-w-[1440px] mx-auto md:px-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <div>
                <Image 
                  src="/logo-white.png" 
                  alt="HelpMeOut Logo" 
                  width={137} 
                  height={40} 
                />
              </div>
            </Link>
          </div>

          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-6 md:mt-0">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link 
                      href={item.href}
                      className="text-gray-300 hover:text-white hover:underline transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;