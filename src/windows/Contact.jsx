import { socials } from "@constants";
import WindowControls from "@components/WindowControls";
import WindowWrapper from "@hoc/WindowWrapper";
function Contact() {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact"/>
                <h2>Contact Me</h2>
            </div>

            <div className="p-5 space-y-5">
                <img src="/images/adrian.jpg" alt="Kunal Fauzdar" 
                className="w-20 rounded-full"/>
                <h3>Let's Connect</h3>
                <p>Got an idea or want to collaborate? A Bug to squash? 
                    Or just wanna talk tech? I'm in.
                </p>
                <p>kunalfauzdar4@gmail.com</p>
                <ul>
                    {socials.map(({id,bg,link,icon,text})=>(
                        <li key={id} style={{backgroundColor: bg}}>
                            <a href={link} target="_blank" rel="noreferrer">
                                <img src={icon} alt={text} className="size-5"/>
                                <span>{text}</span>
                            </a>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}
const ContactWindow = WindowWrapper(Contact , 'contact');
export default ContactWindow;