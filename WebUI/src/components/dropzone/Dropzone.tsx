import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

interface IDropzoneProps {
  readonly title: string;
  readonly onDrop: (files: File[]) => void;
  readonly initialFiles?: (File | string)[];
  readonly onDelete?: (file: File) => void;
}

export const acceptedFiles = {
  "jpg": "image/jpeg", 
  "png": "image/png", 
  "pdf": "application/pdf"
};

export function Dropzone(props: IDropzoneProps) {
  const getDropRejectMessage = (rejectedFile: File, acceptedFiles: string[], maxFileSize: number) => {
    if(!acceptedFiles.includes(rejectedFile.type))
      return `Datei "${rejectedFile.name}" konnte nicht hochgeladen werden, da eine ${rejectedFile.type.slice(rejectedFile.type.indexOf("/") + 1)}-Datei nicht erlaubt ist.`;
    if(rejectedFile.size > maxFileSize) 
      return `Datei "${rejectedFile.name}" konnte nicht hochgeladen werden, da Dateien nur ${maxFileSize} bytes groß sein dürfen.`;
    return `Datei "${rejectedFile.name}" konnte nicht hochgeladen werden`;
  }

  return (
    <DropzoneArea 
      dropzoneText={props.title}
      getFileLimitExceedMessage={filesLimit => `Datei konnte nicht hochgeladen werden. Maximal ${filesLimit} Dateien erlaubt.`}
      getFileAddedMessage={fileName => `Datei "${fileName}" hochgeladen.`}
      getFileRemovedMessage={fileName => `Datei "${fileName}" entfernt.`}
      getDropRejectMessage={getDropRejectMessage}
      alertSnackbarProps={{ autoHideDuration: 5000 }}
      acceptedFiles={Object.values(acceptedFiles)}
      initialFiles={props.initialFiles}
      showFileNames
      useChipsForPreview
      // 20 files can be sent in
      filesLimit={20}
      // 10 MB max size
      maxFileSize={10000000}
      onDelete={props.onDelete}
      onDrop={props.onDrop}
      clearOnUnmount
    />
  )
}