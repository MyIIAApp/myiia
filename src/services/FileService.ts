import { UploadFileUrl } from "../constants/Config";
import { FileResponse } from "../models/FileResponse";
import { LoginMetadata } from "../models/LoginMetadata";
import { PostFormData } from "./BaseService";

export class FileService {
  public static async UploadFile(
    loginMetadata: LoginMetadata,
    file: File,
    fileDirectory: string,
    fileName: string
  ): Promise<FileResponse> {
    const result = await PostFormData<FileResponse>(
      UploadFileUrl,
      loginMetadata,
      file,
      fileDirectory,
      fileName
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
    return result;
  }
}
