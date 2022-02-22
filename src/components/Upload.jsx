
import React , {useState} from 'react';
import { uploadFile } from 'react-s3';


const ACCESS_KEY = 'AKIATALPWAOS6ZB76V7O';
const SECRET_ACCESS_KEY = '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';
const REGION = 'ap-northeast-2';
const S3_BUCKET = 'my-magazine-shine7329';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;