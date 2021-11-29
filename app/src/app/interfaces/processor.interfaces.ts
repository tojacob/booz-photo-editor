export interface ProcessedImage {
  input: Response;
  name: string;
  lastModified: Date;
}

export interface ImageResolution {
  height: string;
  width: string;
}