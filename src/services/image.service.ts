import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
    api_key: String(process.env.CLOUDINARY_API_KEY),
    api_secret: String(process.env.CLOUDINARY_API_SECRET),
});

export async function uploadImage(file: Buffer): Promise<string> {
    try {
        const response = await new Promise<string>((resolve, rejects) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'iplanted/plants',
                    format: 'webp',
                    transformation: {
                        width: 700,
                        quality: 'auto'
                    },
                    media_metadata: false
                },
                (error, result) => {
                    if(result) resolve(result.secure_url);
                    else rejects(error);
                }
            );

            uploadStream.end(file);
        });
        // 'https://res.cloudinary.com/dopcbgrcs/${resource_type}/${type}/v${version}/${public_id}.${format}'
        // 'https://res.cloudinary.com/dopcbgrcs/image/upload/v1727462122/iplanted/aeorfy3lrq3ess62ofas.png'
        return response;

        // const result = await cloudinary.uploader.upload(file, {
        //     folder: 'iplanted',
        // });
        // console.log('uploaded image', result);
        
        // return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Failed to upload image');
    }
}