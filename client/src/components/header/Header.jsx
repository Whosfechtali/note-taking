import { SiTailwindcss, SiReact, SiRedux, SiMongodb, SiNodedotjs, SiGithub } from "react-icons/si";

function Header() {


  return (
      <div className=" py-8 flex justify-center">
        <div className="mx-4">
            <SiReact size={30} color={"#5FD3F3"}/>
        </div>
        <div className="mx-4">
            <SiRedux size={30} color={"#774BBC"}/>
        </div>
        <div className="mx-4">
          <SiTailwindcss size={32} color={"#00B8D5"}/>
        </div>
        <div className="mx-4">
          <SiNodedotjs size={28} color={"#67A063"}/>
        </div>
        <div className="mx-4">
          <SiMongodb size={28} color={"#00E760"}/>
        </div>
        <a class="absolute top-2 right-4" href="https://google.com" target="_blank" rel="noreferrer">
          <SiGithub size={32} color={"#1B1F23"}/>
          </a>
      </div>

  );
}

export default Header;
