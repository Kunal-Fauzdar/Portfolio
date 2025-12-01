import dayjs from "dayjs";
import { navLinks , navIcons } from "@constants";
function Navbar(){
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Kunal's Portfolio</p>
        <ul>
          {navLinks.map(({id,name}) => (
            <li key={id}>
              <p>{name}</p>
            </li>
            ))
          }
        </ul>  
      </div>
      
      <div>
        <ul>
          {
            navIcons.map(({id,img})=>(
              <li key={id}>
                <img src={img} className="icon-hover" alt={`icon-${id}`} />
              </li>
            ))
          }
        </ul>
        <time>{dayjs().format("ddd D MMM h:mm A")}</time>
      </div>
      
    </nav>
  );
}
export default Navbar;