// image.jsx
import WindowWrapper from "@hoc/WindowWrapper";
import WindowControls from "@components/WindowControls";
import useWindowStore from "@store/window";

function Image() {
  const { windows } = useWindowStore();
  const windowState = windows.imgfile; // must match WINDOW_CONFIG key
  const file = windowState?.data;

  if (!file) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p className="ml-2 text-sm font-medium truncate">{file.name}</p>
      </div>

      <div className="bg-white h-full flex items-center justify-center p-4 overflow-auto">
        <img
          src={file.imageUrl}
          alt={file.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </>
  );
}

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
