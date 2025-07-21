import { type ChangeEvent, type Ref } from "react";

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
    <div>
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
