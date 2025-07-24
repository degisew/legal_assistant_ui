import { type ChangeEvent, type Ref } from "react";
import "./fileUpload.css";
interface FileUploadProps {
  fileInputRef: Ref<HTMLInputElement> | undefined;
  fileChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  fileUploadHandler: () => void;
}

function FileUpload({
  fileInputRef,
  fileChangeHandler,
  fileUploadHandler,
}: FileUploadProps) {
  return (
    <div className="upload-container">
      <input
        type="file"
        ref={fileInputRef}
        id="file_input"
        onChange={fileChangeHandler}
      />
      <button onClick={fileUploadHandler}>Upload</button>
    </div>
  );
}

export default FileUpload;
