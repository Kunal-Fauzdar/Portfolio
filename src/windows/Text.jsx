import WindowWrapper from "@hoc/WindowWrapper";
import WindowControls from "@components/WindowControls";
import useWindowStore from "@store/window";

function Text() {
    const { windows } = useWindowStore();
    const data = windows.txtfile ?.data;

    if(!data) return null;

    const { name , image , subtitle , description } = data;
    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile"/>
                <h2>{name}</h2>
            </div>
            <div className="p-5 space-y-6 bg-white">
                {image ? (
                    <div>
                        <img src={image} alt={name} 
                        className="w-full h-auto rounded-lg"/>
                    </div>
                ) : null}
                {subtitle ? <h3 className="text-lg font-semibold">{subtitle}</h3> : null}

                {Array.isArray(description) && description.length > 0 ? (
                    <div className="space-y-4">
                        {description.map((item, index) => (
                            <p key={index} className="text-gray-700">{item}</p>
                        ))}
                    </div>
                ) : null}
            </div>
        </>
    )
}
const TextWindow = WindowWrapper(Text , 'txtfile');
export default TextWindow;