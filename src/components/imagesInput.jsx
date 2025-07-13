import { UploadImage } from "./bannerImage";

const { XIcon, PlusIcon } = require("lucide-react");
const { useRef } = require("react");

export function Images({ images, setImages, id }) {
  const inputRef = useRef(null);

  function handleInputImage() {
    inputRef.current.click();
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  }

  function handleRemoveImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2">
      <p>Trip Crousel Images blow</p>

      <div className="flex flex-wrap gap-2">
        {/* Loop through all images */}
        {images?.map((img, index) => (
          <div key={index} className="relative size-24">
            <img
              src={img}
              alt={`Banner ${index}`}
              className="w-full h-full object-cover rounded"
            />
            <XIcon
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-1 -right-1 border cursor-pointer bg-white rounded-full size-5 p-0.5"
            />
          </div>
        ))}

        {/* Upload box */}
        <UploadImage
          image=""
          setImage={(value) => setImages([...images, value])}
        />
      </div>

      {/* Hidden input for file upload */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
