import { useRef } from "react";
import { dockApps } from "@constants";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "@store/window";

function Dock() {
    const dockRef = useRef(null);
    const {openWindow , closeWindow , windows} = useWindowStore();
    useGSAP(() => {
        const dock = dockRef.current;
        if(!dock) return ()=>{};

        const icons = dock.querySelectorAll(".dock-icon");

        const animateIcons = (mousex ) => {
            const {left} = dock.getBoundingClientRect();

            icons.forEach((icon)=>{
                const {left:iconleft , width } = icon.getBoundingClientRect();
                const centre = iconleft - left + width /2;
                const distance = Math.abs(mousex - centre);
                const intensity = Math.exp(-(distance**2.5)/20000);

                gsap.to(icon, {
                    scale : 1 + 0.25*intensity,
                    y: -15*intensity,
                    duration: 0.2,
                    ease: "power1.out"
                });
            })
        }

        const resetIcons = () =>{
            icons.forEach((icon)=>{
                gsap.to(icon, {
                    scale : 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out"
                });
            })
        }
        const handleMouseMove = (e) => {    
            const {left} = dock.getBoundingClientRect();
            animateIcons(e.clientX - left);
        }  

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        }
    },[]);

    const toggleApps = (app)=>{
        if(!app.canOpen) return;

        const window = windows[app.id];

        if(!window) return;

        if(window.isOpen){
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }
        console.log(useWindowStore.getState().windows);
    }


    return (
        <section id='dock'>
            <div ref={dockRef} className="dock-container">
                {dockApps.map((app) => (
                    <div key={app.id} className="relative flex justify-center" >
                        <button 
                            type="button"
                            className="dock-icon"
                            aria-label={app.name}
                            data-tooltip-id = "dock-tooltip"
                            data-tooltip-content={app.name}
                            disabled = {!app.canOpen}
                            onClick = {() => toggleApps(app)}>
                                <img src={`/images/${app.icon}`} alt={app.name}
                                loading="lazy"
                                className={app.canOpen ? "" : "opacity-50"} />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" effect="solid" className="tooltip" />
            </div>
        </section>
    );
}
export default Dock;