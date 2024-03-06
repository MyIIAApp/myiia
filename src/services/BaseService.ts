import { HttpRequestMethods } from "../constants/ServiceConstants";
import { LoginMetadata } from "../models/LoginMetadata";
import { StorageService } from "./StorageService";
import { Event } from "../components/Tracker";

export async function APICallerPost<Resp, Req>(
  url: string,
  body: Req,
  loginMetadata: LoginMetadata,
  cacheKey: string,
  useCache: boolean,
  cacheExpiry: number,
  updateCache: boolean,
  key: string
): Promise<Resp> {
  if (useCache) {
    return StorageService.Get(cacheKey).then((response: Resp) => {
      if (response) {
        return new Promise<Resp>((resolve) => {
          resolve(response);
        });
      } else {
        Event("API Call","Call",key)
        return Call<Resp, Req>(
          url,
          body,
          loginMetadata,
          cacheKey,
          cacheExpiry,
          updateCache
        );
      }
    });
  } else {
    Event("API Call","Call",key)
    return Call<Resp, Req>(
      url,
      body,
      loginMetadata,
      cacheKey,
      cacheExpiry,
      updateCache
    );
  }
}

async function Call<Resp, Req>(
  url: string,
  body: Req,
  loginMetadata: LoginMetadata,
  cacheKey: string,
  cacheExpiry: number,
  updateCache: boolean
): Promise<Resp> {
  const options = {
    method: HttpRequestMethods.POST,
    headers: {
      "Content-Type": "application/json",
      Authorization: loginMetadata.tokenString,
    },
    body: JSON.stringify(body),
  };
  return new Promise<Resp>(function (resolve, reject) {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        var data = response.json();

        if (updateCache) {
          StorageService.Set(cacheKey, data, cacheExpiry).then(() => {
            resolve(data);
          });
        } else {
          resolve(data);
        }
      })
      .catch((error) => reject(error));
  });
}

export async function Call2<Resp, Req>(
  url: string,
): Promise<Resp> {
  let formData = new FormData();
  formData.append("key","7rlFly");
  formData.append("productinfo","membership");
  formData.append("hash","06b99f107c58ae376de74f8309220d45a951acc5cfe1f8f99cfdc1ce4966552ecc0636251c8302591b146c8f4f79c4c8303305e953a2a02c4ab8b4893e558132");
  formData.append("txnid","5151515151515");
  formData.append("amount","100.00");
  formData.append("firstname","mohan");
  formData.append("email","mohan@gmail.com");
  formData.append("phone","9992323456");
  formData.append("surl","https://www.yahoo.com");
  formData.append("furl","https://www.yahoo.com");
  formData.append("service_provider","");
  formData.append("udf1","mohan");
  formData.append("udf2","9992323456");
  formData.append("udf3","mohan@gmail.com");
  formData.append("udf4","chandi");
  formData.append("udf5","rohtak");


  const options = {
    method: HttpRequestMethods.POST,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body:formData 
  };
  return new Promise<Resp>(function (resolve, reject) {
    fetch(url, options)
      .then((response) => {
        return response;
      })
      .catch((error) => reject(error));
  });
}

export async function PostFormData<Resp>(
  url: string,
  loginMetadata: LoginMetadata,
  file: File,
  fileDirectory: string,
  fileName: string
): Promise<Resp> {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("fileDirectory", fileDirectory);
  formData.append("fileName", fileName);

  const options = {
    method: HttpRequestMethods.POST,
    headers: {
      Authorization: loginMetadata.tokenString,
    },
    body: formData,
  };

  return new Promise<Resp>(function (resolve, reject) {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        var data = response.json();
        resolve(data);
      })
      .catch((error) => reject(error));
  });
}
