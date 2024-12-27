import { FC } from "react";

interface SidebarIcon {
  id: string;
  icon: React.ReactNode; // Can be an <img>, <svg>, or JSX
  bgColor?: string; // Background color for the icon container
  onClick?: () => void; // Optional click handler
}

interface SidebarProps {
  logo: string; // Path to the logo image
  icons: SidebarIcon[]; // Array of icon objects
  profileImage: string; // Path to the profile image
  containerStyles?: string; // Optional custom styles for the container
}

const Sidebar: FC<SidebarProps> = ({ 
  logo, 
  icons, 
  profileImage, 
  containerStyles = "h-screen w-24 bg-white shadow-lg p-6 rounded-2xl" 
}) => {
  return (
    <div className={`flex sm:flex-col mb-6 sm:mb-0 justify-between items-center ${containerStyles}`}>
      {/* Sidebar Logo */}
      <div className="sm:mb-6">
        <img
          src={logo}
          alt="Logo"
          className="w-10 sm:w-16 h-auto object-contain"
        />
      </div>

      {/* Navigation Icons */}
      <div className="flex sm:flex-col items-center sm:gap-6 gap-3">
        {icons.map(({ id, icon, bgColor = "bg-gray-200", onClick }) => (
          <div 
            key={id} 
            onClick={onClick} 
            className={`flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 ${bgColor} rounded-full cursor-pointer`}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Profile */}
      <div>
        <img
          src={profileImage}
          alt="Profile"
          className="sm:w-16 sm:h-16 w-10 h-10 rounded-full object-cover"
          onClick={()=>{
            localStorage.clear();
            window.location.reload()
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
