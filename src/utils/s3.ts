import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import CustomError from './customError';

// Configuración del cliente S3
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('No se encontraron las credenciales de AWS');
  process.exit(1);
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  // endpoint: process.env.AWS_ENDPOINT,
  // forcePathStyle: true,
});

/**
 * Función para obtener un archivo de un bucket de S3
 *
 * @param {S3FileParams} params - Parámetros necesarios para obtener el archivo
 * @returns {Promise<GetObjectCommandOutput>} - Resultado de la operación en S3
 */
const getFile = async ({
  BucketName,
  Key,
}: S3FileParams): Promise<GetObjectCommandOutput> => {
  try {
    console.log(
      'Obteniendo archivo en S3, en el bucket:',
      BucketName,
      ' con la key:',
      Key
    );
    const data = await s3Client.send(
      new GetObjectCommand({ Bucket: BucketName, Key })
    );
    console.log('Success', data);
    return data;
  } catch (err: any) {
    console.log('Error', err);
    throw new CustomError(
      `Error al obtener el archivo: ${err?.message || 'Error desconocido'}`,
      500
    );
  }
};

/** Funcion para agregar un archivo a un bucket de S3
 *
 * @param {UploadFileParams} params - Parámetros necesarios para subir el archivo
 * @returns {Promise<PutObjectCommandOutput>} - Resultado de la operación en S3
 *
 * @example
 * const data = await uploadFile({
 *  BucketName: 'microservicio-documentos-bucket',
 *  Key: '/carpeta-1/example.txt',
 *  BufferData: '<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 02 f2 00 00 01 14 08 06 00 00 00 4 ...>',
 *  ContentType: 'application/pdf',
 * });
 */
const uploadFile = async ({
  BucketName,
  Key,
  BufferData,
  ContentType,
}: UploadFileParams): Promise<PutObjectCommandOutput> => {
  try {
    if (!BucketName || !Key || !BufferData) {
      throw new CustomError('BucketName, Key y BufferData son requeridos', 400);
    }

    // Verifica que BufferData sea un Buffer
    if (!(BufferData instanceof Buffer)) {
      throw new CustomError('BufferData debe ser un Buffer', 400);
    }

    // Verifica que ContentType sea válido
    const allowedContentTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ];
    if (!allowedContentTypes.includes(ContentType)) {
      throw new CustomError(
        'ContentType no permitido. Permitidos: image/jpeg, image/jpg, image/png, application/pdf',
        400
      );
    }

    console.log(
      'Cargando archivo en el bucket:',
      BucketName,
      ' con la key:',
      Key
    );

    // Enviar el archivo al bucket de S3
    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: BucketName,
        Key: Key, // Path de las carpetas
        Body: BufferData,
        ContentType,
      })
    );

    console.log('Archivo subido con éxito:', data);
    return data;
  } catch (err: any) {
    throw new CustomError(
      `Error al subir el archivo: ${err?.message || 'Error desconocido'}`,
      500
    );
  }
};

const deleteFile = async ({
  BucketName,
  Key,
}: S3FileParams): Promise<DeleteObjectCommandOutput> => {
  try {
    if (!BucketName || !Key) {
      throw new CustomError('BucketName y Key son requeridos', 400);
    }

    console.log(
      'Eliminando archivo en S3, en el bucket:',
      BucketName,
      ' con la key:',
      Key
    );

    // Enviar el comando para eliminar el archivo
    const data = await s3Client.send(
      new DeleteObjectCommand({ Bucket: BucketName, Key })
    );

    console.log('Archivo eliminado con éxito:', data);
    return data;
  } catch (err: any) {
    console.error('Error al eliminar el archivo:', err);
    throw new CustomError(
      `Error al eliminar el archivo: ${err?.message || 'Error desconocido'}`,
      500
    );
  }
};

/**
 * Función para obtener una URL firmada de un archivo en un bucket de S3
 *
 * @param {S3FileParams} params - Parámetros necesarios para obtener la URL firmada
 * @returns {Promise<string>} - URL firmada
 */
const getUrl = async ({ BucketName, Key }: S3FileParams): Promise<string> => {
  try {
    console.log(
      'Obteniendo URL firmada del bucket ',
      BucketName,
      ' del documento con key: ',
      Key
    );
    const command = new GetObjectCommand({ Bucket: BucketName, Key });
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    }); // 5 minutos
    console.log(`URL firmada: ${signedUrl}`);
    return signedUrl;
  } catch (err) {
    console.log('Error al obtener la URL firmada', err);
    throw err;
  }
};

/**
 * Función para generar una URL prefirmada para un archivo en un bucket de S3
 *
 * @param {S3FileParams} params - Parámetros necesarios para generar la URL prefirmada
 * @returns {Promise<string>} - URL prefirmada
 */
const generatePresignedUrl = async ({
  BucketName,
  Key,
}: S3FileParams): Promise<string> => {
  try {
    const command = new GetObjectCommand({
      Bucket: BucketName,
      Key: Key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 60 * 24, // 24 horas
    });

    console.log('URL prefirmada:', signedUrl);
    return signedUrl;
  } catch (error) {
    console.error('Error al generar la URL prefirmada:', error);
    throw error;
  }
};

export default {
  getFile,
  uploadFile,
  deleteFile,
  getUrl,
  generatePresignedUrl,
};

// Tipos para los parámetros de la función
interface S3FileParams {
  BucketName: string;
  Key: string;
}

interface UploadFileParams extends S3FileParams {
  BufferData: Buffer;
  ContentType: string;
}
